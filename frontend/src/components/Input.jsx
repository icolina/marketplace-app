import React from 'react';

export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 text-sm text-gray-700">{label}</label>}
      <input
        {...props}
        className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
      />
    </div>
  );
}
