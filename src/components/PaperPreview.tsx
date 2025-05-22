import React from 'react';
import { PaperData } from '../types/paper';

interface PaperPreviewProps {
  paperData: PaperData;
}

const PaperPreview: React.FC<PaperPreviewProps> = ({ paperData }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 overflow-auto">
      <div className="ieee-page">
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
          {paperData.sections.map((section, index) => (
            <div key={section.id} className="mb-4">
              <div className="ieee-section-title">
                {String.fromCharCode(65 + index)}. {section.title}
              </div>
              <div 
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}

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

        {/* Figures */}
        {paperData.figures.map((figure) => (
          <div key={figure.id} className="ieee-figure">
            <img 
              src={figure.src} 
              alt={figure.caption}
              style={{ 
                maxWidth: figure.width ? `${figure.width}px` : '100%',
                maxHeight: figure.height ? `${figure.height}px` : 'auto'
              }}
            />
            <div className="ieee-caption">
              Fig. {figure.id}: {figure.caption}
            </div>
          </div>
        ))}

        {/* Tables */}
        {paperData.tables.map((table) => (
          <div key={table.id} className="ieee-figure">
            <table className="ieee-table">
              <thead>
                <tr>
                  {table.headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ieee-caption">
              Table {table.id}: {table.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaperPreview; 