import React from 'react';

export const Overlay = () => {
  return (
    <div
      className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>
  );
};
