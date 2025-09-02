import React from 'react';

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      {children}
    </button>
  );
}
