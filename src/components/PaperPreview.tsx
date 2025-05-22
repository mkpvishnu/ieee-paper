import React from 'react';
// import katex from 'katex'; // Remove KaTeX import
import { PaperData, Figure, Table as TableType } from '../types/paper';

interface PaperPreviewProps {
  paperData: PaperData;
}

// Helper function to render a Figure to an HTML string
const renderFigureToHtml = (figure: Figure, figureNumber: number): string => {
  const figNum = figure.id; // Using ID for now, can refine numbering later
  return `
    <div class="ieee-figure" style="text-align: center; margin-bottom: 1em;">
      <img 
        src="${figure.src}" 
        alt="${figure.caption}"
        style="max-width: ${figure.width ? `${figure.width}px` : '80%'}; max-height: ${figure.height ? `${figure.height}px` : '400px'}; display: inline-block;"
      />
      <div class="ieee-caption" style="text-align: center; font-size: 0.9em; margin-top: 0.5em;">
        Fig. ${figureNumber}. ${figure.caption}
      </div>
    </div>
  `;
};

// Helper function to render a Table to an HTML string
const renderTableToHtml = (table: TableType, tableNumberRoman: string): string => {
  const tableNum = table.id; // Using ID for now, can refine numbering later
  let headersHtml = '<tr>';
  table.headers.forEach(header => {
    headersHtml += `<th style="border: 1px solid #ccc; padding: 4px; text-align: left;">${header}</th>`;
  });
  headersHtml += '</tr>';

  let rowsHtml = '';
  table.rows.forEach(row => {
    rowsHtml += '<tr>';
    row.forEach(cell => {
      rowsHtml += `<td style="border: 1px solid #ccc; padding: 4px;">${cell}</td>`;
    });
    rowsHtml += '</tr>';
  });

  return `
    <div class="ieee-figure" style="margin-bottom: 1em;">
      <div class="ieee-caption" style="text-align: center; font-size: 0.9em; margin-bottom: 0.5em;">
        TABLE ${tableNumberRoman}<br/>${table.caption}
      </div>
      <table class="ieee-table" style="width: auto; margin-left: auto; margin-right: auto; border-collapse: collapse; font-size: 0.9em;">
        <thead style="background-color: #f0f0f0;">
          ${headersHtml}
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
};

const romanize = (num: number): string => {
  if (isNaN(num)) return NaN.toString();
  const digits = String(+num).split("");
  const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
               "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
               "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  let roman = "", i = 3;
  while (i--) roman = (key[+digits.pop()! + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};

const PaperPreview: React.FC<PaperPreviewProps> = ({ paperData }) => {
  let figureCounter = 0;
  let tableCounter = 0;

  const processContent = (content: string): string => {
    // Step 1: Process Figures and Tables
    let processed = content.replace(/\[\[(FIGURE|TABLE):([^\]]+?)\]\]/g, (match, type, id) => {
      if (type === 'FIGURE') {
        const figure = paperData.figures.find(f => f.id === id);
        if (figure) {
          figureCounter++;
          return renderFigureToHtml(figure, figureCounter);
        }
        return `<span style="color: red;">[FIGURE NOT FOUND: ${id}]</span>`;
      }
      if (type === 'TABLE') {
        const table = paperData.tables.find(t => t.id === id);
        if (table) {
          tableCounter++;
          return renderTableToHtml(table, romanize(tableCounter));
        }
        return `<span style="color: red;">[TABLE NOT FOUND: ${id}]</span>`;
      }
      return match;
    });

    // Step 2: LaTeX processing removed
    // processed = processed.replace(/\$\$([^$]+?)\$\$/g, (match, latexCode) => { ... });

    return processed;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 overflow-auto">
      <div id="ieee-page-container" className="ieee-page">
        {/* Title */}
        <div className="ieee-title">
          {paperData.title}
        </div>

        {/* Authors */}
        <div className="ieee-authors">
          {paperData.authors.map((author, index) => (
            <div key={index} className="mb-2">
              <div className="font-semibold">{author.name}</div>
              <div className="text-xs">{author.affiliation}</div>
              <div className="text-xs italic">{author.email}</div>
            </div>
          ))}
        </div>

        {/* Abstract */}
        <div className="ieee-abstract">
          <div className="font-bold text-center mb-2">ABSTRACT</div>
          <div className="text-justify">{paperData.abstract}</div>
          {paperData.keywords.length > 0 && (
            <div className="mt-2">
              <span className="font-bold">Keywords: </span>
              {paperData.keywords.join(', ')}
            </div>
          )}
        </div>

        {/* Main Content - Two Columns */}
        <div className="ieee-columns">
          {paperData.sections.map((section, index) => {
            // Reset counters here if numbering is strictly per-section and content isn't processed globally first.
            // For now, figureCounter and tableCounter are component-scoped, leading to continuous numbering.
            const processedContent = processContent(section.content);
            return (
              <div key={section.id} className="mb-4 break-inside-avoid-column">
                <div className="ieee-section-title">
                  {/* TODO: Adjust section numbering if sections are reordered or for specific IEEE format */}
                  {String.fromCharCode(65 + index)}. {section.title} 
                </div>
                <div 
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </div>
            );
          })}

          {/* References */}
          {paperData.references.length > 0 && (
            <div className="mt-6">
              <div className="ieee-section-title">REFERENCES</div>
              {paperData.references.map((ref, index) => (
                <div key={ref.id} className="ieee-reference">
                  [{index + 1}] {ref.authors}, "{ref.title}," <em>{ref.journal || ref.conference}</em>
                  {ref.volume && `, vol. ${ref.volume}`}
                  {ref.number && `, no. ${ref.number}`}
                  {ref.pages && `, pp. ${ref.pages}`}
                  , {ref.year}.
                  {ref.doi && ` DOI: ${ref.doi}.`}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Figures and Tables sections are now removed as they are rendered inline */}
        {/* NO LONGER NEEDED:
        {paperData.figures.map((figure) => (...))}
        {paperData.tables.map((table) => (...))}
        */}
      </div>
    </div>
  );
};

export default PaperPreview; 