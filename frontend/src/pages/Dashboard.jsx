import React from 'react';
import MainLayout from '../layouts/MainLayout';

export default function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-700">You are logged in.</p>
    </MainLayout>
  );
}
