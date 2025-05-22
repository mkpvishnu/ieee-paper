import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Trash2, Rows, Columns, Table as TableIconLucide } from 'lucide-react';
import { Table } from '../types/paper';

interface TableBuilderProps {
  tables: Table[];
  onAddTable: (table: Table) => void;
  onRemoveTable: (tableId: string) => void;
  onUpdateTable: (tableId: string, updates: Partial<Table>) => void;
}

const TableBuilder: React.FC<TableBuilderProps> = ({
  tables,
  onAddTable,
  onRemoveTable,
  onUpdateTable
}) => {
  const [newTableRows, setNewTableRows] = useState(2);
  const [newTableCols, setNewTableCols] = useState(2);

  const createTable = () => {
    const headers = Array(newTableCols).fill('').map((_, i) => `Header ${i + 1}`);
    const rowsData = Array(newTableRows).fill(null).map(() => 
      Array(newTableCols).fill('')
    );
    const newTable: Table = {
      id: `tbl-${Date.now().toString(36).substr(2, 5)}`,
      caption: 'Enter table caption here',
      headers,
      rows: rowsData
    };
    onAddTable(newTable);
    setNewTableRows(2);
    setNewTableCols(2);
  };

  const updateHeader = (tableId: string, colIndex: number, value: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table) {
      const newHeaders = [...table.headers];
      newHeaders[colIndex] = value;
      onUpdateTable(tableId, { headers: newHeaders });
    }
  };

  const updateCell = (tableId: string, rowIndex: number, colIndex: number, value: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table) {
      const newRows = table.rows.map((row, rIdx) => 
        rIdx === rowIndex 
          ? row.map((cell, cIdx) => cIdx === colIndex ? value : cell)
          : row
      );
      onUpdateTable(tableId, { rows: newRows });
    }
  };

  const addRow = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table) {
      const newRow = Array(table.headers.length).fill('');
      onUpdateTable(tableId, { rows: [...table.rows, newRow] });
    }
  };

  const removeRow = (tableId: string, rowIndex: number) => {
    const table = tables.find(t => t.id === tableId);
    if (table && table.rows.length > 1) {
      const newRows = table.rows.filter((_, idx) => idx !== rowIndex);
      onUpdateTable(tableId, { rows: newRows });
    }
  };

  const addColumn = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table) {
      const newHeaders = [...table.headers, `Header ${table.headers.length + 1}`];
      const newRows = table.rows.map(row => [...row, '']);
      onUpdateTable(tableId, { headers: newHeaders, rows: newRows });
    }
  };

  const removeColumn = (tableId: string, colIndex: number) => {
    const table = tables.find(t => t.id === tableId);
    if (table && table.headers.length > 1) {
      const newHeaders = table.headers.filter((_, idx) => idx !== colIndex);
      const newRows = table.rows.map(row => row.filter((_, idx) => idx !== colIndex));
      onUpdateTable(tableId, { headers: newHeaders, rows: newRows });
    }
  };

  const inputBaseClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const smallInputClass = "w-full p-1.5 text-xs border-slate-300 rounded-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white focus:bg-white transition-colors";

  return (
    <div className="p-8 bg-white shadow-sm rounded-lg max-w-5xl mx-auto my-8">
      <h2 className="text-xl font-semibold text-slate-700 mb-6 pb-4 border-b border-slate-200">Manage Tables</h2>
      
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Create New Table</h3>
        <div className="flex flex-wrap items-end gap-4 mb-2">
          <div>
            <label htmlFor="new-table-rows" className="block text-sm font-medium text-slate-600 mb-1">Rows</label>
            <input
              id="new-table-rows"
              type="number" min="1" max="20" value={newTableRows}
              onChange={(e) => setNewTableRows(Math.max(1, parseInt(e.target.value) || 1))}
              className={`${inputBaseClass} w-24 pr-1`}
            />
          </div>
          <div>
            <label htmlFor="new-table-cols" className="block text-sm font-medium text-slate-600 mb-1">Columns</label>
            <input
              id="new-table-cols"
              type="number" min="1" max="10" value={newTableCols}
              onChange={(e) => setNewTableCols(Math.max(1, parseInt(e.target.value) || 1))}
              className={`${inputBaseClass} w-24 pr-1`}
            />
          </div>
          <button
            onClick={createTable}
            type="button"
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <TableIconLucide size={18} className="mr-2" />
            Create Table
          </button>
        </div>
      </div>

      {tables.length === 0 && (
         <div className="mt-10 text-center py-10 border-2 border-dashed border-slate-200 rounded-lg">
            <TableIconLucide size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-500">No tables created yet</h3>
            <p className="text-sm text-slate-400">Use the form above to add your first table.</p>
        </div>
      )}

      <div className="space-y-8">
        {tables.map((table) => (
          <div key={table.id} className="bg-slate-50 rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <TableIconLucide size={18} className="text-blue-500 flex-shrink-0" />
                <span className="text-xs font-mono text-slate-600 select-all" title="Table ID">{table.id}</span>
              </div>
              <div className="flex-grow min-w-[200px]">
                <label htmlFor={`caption-${table.id}`} className="sr-only">Caption for {table.id}</label>
                <input
                  id={`caption-${table.id}`}
                  type="text" value={table.caption}
                  onChange={(e) => onUpdateTable(table.id, { caption: e.target.value })}
                  className={`${inputBaseClass} text-sm`} 
                  placeholder="Table caption"
                />
              </div>
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <button onClick={() => addRow(table.id)} type="button" className="p-1.5 text-green-600 rounded-md hover:bg-green-100 focus:outline-none focus:ring-1 focus:ring-green-500" title="Add Row"><Rows size={16} /></button>
                <button onClick={() => addColumn(table.id)} type="button" className="p-1.5 text-blue-600 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500" title="Add Column"><Columns size={16} /></button>
                <button onClick={() => onRemoveTable(table.id)} type="button" className="p-1.5 text-red-500 rounded-md hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-500" title="Delete Table"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="p-2 sm:p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
              <table className="min-w-full text-xs border-collapse">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-2 border border-slate-300 font-semibold text-slate-600 w-10 text-center sticky left-0 bg-slate-100 z-10">#</th>
                    {table.headers.map((header, colIndex) => (
                      <th key={colIndex} className="p-0 border border-slate-300 font-semibold text-slate-600 min-w-[120px]">
                        <div className="flex items-center justify-between h-full">
                          <input
                            type="text" value={header}
                            onChange={(e) => updateHeader(table.id, colIndex, e.target.value)}
                            className={`${smallInputClass} rounded-none border-0 focus:ring-0 focus:border-blue-500 h-full`}
                            placeholder={`Header ${colIndex + 1}`}
                          />
                          {table.headers.length > 1 && (
                            <button onClick={() => removeColumn(table.id, colIndex)} type="button" className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 flex-shrink-0" title="Remove Column"><MinusCircle size={14} /></button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="p-0 border border-slate-300 text-center text-slate-500 sticky left-0 bg-slate-50 z-10">
                         <div className="flex items-center justify-center h-full relative group">
                           <span className="px-2">{rowIndex + 1}</span>
                          {table.rows.length > 1 && (
                            <button onClick={() => removeRow(table.id, rowIndex)} type="button" className="absolute right-0 p-0.5 text-red-500 hover:text-red-700 hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity" title="Remove Row"><MinusCircle size={14} /></button>
                          )}
                        </div>
                      </td>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="p-0 border border-slate-300 min-w-[120px]">
                          <input
                            type="text" value={cell}
                            onChange={(e) => updateCell(table.id, rowIndex, colIndex, e.target.value)}
                            className={`${smallInputClass} rounded-none border-0 h-full focus:ring-0 focus:border-blue-500`}
                            placeholder="Data"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableBuilder; 