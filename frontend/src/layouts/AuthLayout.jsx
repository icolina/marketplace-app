import React from 'react';

export default function AuthLayout({ children, title }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md">
        {title && <h2 className="mb-4 text-center text-2xl font-bold">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
