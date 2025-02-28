import React from 'react';

const formatBoldText = (text: string) => {
  // First clean up any malformed bold markers
  const cleanedText = text.replace(/\*\*:\n/g, ':\n'); // Handle the specific case
  const parts = cleanedText.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const formatSummary = (summary: string) => {
  return summary.split('\n').map((line, index) => {
    if (line.startsWith('####')) {
      return (
        <h4
          key={index}
          className="text-lg font-semibold mt-6 mb-2 text-gray-200"
        >
          {formatBoldText(line.replace('#### ', ''))}
        </h4>
      );
    }

    if (line.startsWith('###')) {
      return (
        <h3 key={index} className="text-xl font-bold mt-8 mb-4 text-white">
          {formatBoldText(line.replace('### ', ''))}
        </h3>
      );
    }

    if (line.startsWith('-') || line.startsWith('*')) {
      const text = line.replace(/^[-*]\s/, '');
      return (
        <li key={index} className="text-gray-300 ml-4 my-1">
          {formatBoldText(text)}
        </li>
      );
    }

    if (line.startsWith('  -') || line.startsWith('  *')) {
      const text = line.replace(/^[\s-*]+/, '');
      return (
        <li key={index} className="text-gray-300 ml-8 my-1">
          {formatBoldText(text)}
        </li>
      );
    }

    return line.trim() ? (
      <p key={index} className="text-gray-300 my-2">
        {formatBoldText(line)}
      </p>
    ) : (
      <div key={index} className="my-2" />
    );
  });
};
