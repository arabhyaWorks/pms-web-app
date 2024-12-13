import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ColumnVisibilityToggleProps {
  columns: { key: string; label: string }[];
  visibleColumns: string[];
  onToggleColumn: (columnKey: string) => void;
}

export function ColumnVisibilityToggle({
  columns,
  visibleColumns,
  onToggleColumn,
}: ColumnVisibilityToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        <Settings className="w-4 h-4" />
        दृश्य कॉलम
      </button> */}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 z-50 w-72 mt-2 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">कॉलम प्रबंधित करें</h3>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {columns.map((column) => (
                    <label
                      key={column.key}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="peer hidden"
                          checked={visibleColumns.includes(column.key)}
                          onChange={() => onToggleColumn(column.key)}
                        />
                        <div className="w-5 h-5 border-2 rounded transition-colors peer-checked:border-orange-500 peer-checked:bg-orange-500 flex items-center justify-center">
                          {visibleColumns.includes(column.key) && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </motion.svg>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {column.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}