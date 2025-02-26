import React from 'react';

/**
 * Displays an error message for the QA component
 * @param {string} message - The error message to display
 * @returns {JSX.Element} Error message component
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className="mt-2 text-red-500 text-sm quicksand font-normal">
      {message || "Please enter a valid question"}
    </div>
  );
};

export default ErrorMessage;
