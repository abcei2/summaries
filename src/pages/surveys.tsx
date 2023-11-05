// surveys.tsx
import React from 'react';

const Surveys: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-gray-700 text-3xl mb-6">
        Subject: Request for Your Valuable Feedback to Enhance MegaSummary User Experience
      </h1>
      <p className="mb-4">Dear User,</p>
      <p className="mb-4">
        Your insights are essential for improving the user experience on MegaSummary. Please take a moment to complete two brief surveys. In appreciation, you'll gain early access to new features.
      </p>
      <div className="bg-white p-6 rounded-md shadow-md mt-6">
        <h2 className="text-2xl mb-4">Surveys:</h2>
        <div className="mb-4">
          <p className="mb-2">Summary Quality Survey:</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSco9eg7nA8I8mmnHlWkJ7ml5pTk6p3y8oesu7_Xl6fDWe7wAA/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Link to Survey
          </a>
        </div>
        <div className="mb-4">
          <p className="mb-2">Website Experience Survey:</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf71lCYXCfkHR-JBVSRDYEv9XPMdGWPve8tEn45VDRcuO7AwQ/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Link to Survey
          </a>
        </div>
      </div>
      <p className="mt-6">Thank you for your contribution.</p>
      <p className="mt-2">Best,</p>
      <p className="mt-2">The MegaSummary Team</p>
    </div>
  );
};

export default Surveys;
