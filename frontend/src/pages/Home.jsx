import React from 'react';
import MainLayout from '../layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold">Welcome to the Marketplace App.</h1>
      <p className="mt-2 text-gray-700">Feel free to check the things that you want to buy.</p>
      <p className="mt-2 text-gray-700">Be a good negotiator when it comes to the price.</p>
    </MainLayout>
  );
}
