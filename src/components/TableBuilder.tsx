import React, { useState } from 'react';
import { Plus, Minus, Table as TableIcon, Trash2 } from 'lucide-react';
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
  const [newTableRows, setNewTableRows] = useState(3);
  const [newTableCols, setNewTableCols] = useState(3);

  const createTable = () => {
    const headers = Array(newTableCols).fill('').map((_, i) => `Column ${i + 1}`);
    const rows = Array(newTableRows).fill(null).map(() => 
      Array(newTableCols).fill('')
    );

    const newTable: Table = {
      id: Date.now().toString(),
      caption: 'Enter table caption here',
      headers,
      rows
    };

    onAddTable(newTable);
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
      const newHeaders = [...table.headers, `Column ${table.headers.length + 1}`];
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tables</h2>
      
      {/* Create New Table */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-semibold mb-4">Create New Table</h3>
        <div className="flex items-center space-x-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rows
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={newTableRows}
              onChange={(e) => setNewTableRows(parseInt(e.target.value) || 1)}
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Columns
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={newTableCols}
              onChange={(e) => setNewTableCols(parseInt(e.target.value) || 1)}
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={createTable}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <TableIcon size={16} className="mr-2" />
            Create Table
          </button>
        </div>
      </div>

      {/* Existing Tables */}
      <div className="space-y-8">
        {tables.map((table) => (
          <div key={table.id} className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold">Table {table.id}</h3>
                  <input
                    type="text"
                    value={table.caption}
                    onChange={(e) => onUpdateTable(table.id, { caption: e.target.value })}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Table caption"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addRow(table.id)}
                    className="p-1 text-green-600 hover:text-green-800"
                    title="Add Row"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => addColumn(table.id)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="Add Column"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => onRemoveTable(table.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Delete Table"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-8 px-2 py-2 text-xs font-medium text-gray-500">#</th>
                    {table.headers.map((header, colIndex) => (
                      <th key={colIndex} className="px-4 py-2 text-left">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={header}
                            onChange={(e) => updateHeader(table.id, colIndex, e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            placeholder={`Column ${colIndex + 1}`}
                          />
                          {table.headers.length > 1 && (
                            <button
                              onClick={() => removeColumn(table.id, colIndex)}
                              className="ml-2 p-1 text-red-500 hover:text-red-700"
                            >
                              <Minus size={12} />
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-gray-200">
                      <td className="px-2 py-2 text-xs text-gray-500 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span>{rowIndex + 1}</span>
                          {table.rows.length > 1 && (
                            <button
                              onClick={() => removeRow(table.id, rowIndex)}
                              className="p-1 text-red-500 hover:text-red-700"
                            >
                              <Minus size={10} />
                            </button>
                          )}
                        </div>
                      </td>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="px-4 py-2">
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) => updateCell(table.id, rowIndex, colIndex, e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            placeholder="Enter data"
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

      {tables.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tables created yet. Use the form above to create your first table.
        </div>
      )}
    </div>
  );
};

export default TableBuilder; 