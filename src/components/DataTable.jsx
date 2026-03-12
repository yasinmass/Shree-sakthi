import React from 'react';

const DataTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border bg-secondary/50 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                >
                  {header.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-transparent">
            {data.map((row, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-white/5 transition-colors"
              >
                {headers.map((header) => (
                  <td
                    key={`${idx}-${header}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
