import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white/80 backdrop-filter backdrop-blur-md py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} KidsPlay. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}