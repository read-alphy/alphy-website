// File: components/QuestionAnswering/utils/textFormatters.js
import React from 'react';

/**
 * Formats the answer text with citation references
 * @param {string} answer - The raw answer text
 * @param {object} answerData - Contains sources information
 * @param {function} handleShowSingleSource - Function to show a specific source
 * @returns {Array} Array of React elements and strings
 */
export const formatAnswer = (answer, answerData, handleShowSingleSource) => {
  // Clean any line breaks from the text
  const cleanedText = answer.replace(/\r?\n|\r/g, ' ');

  // Pattern to match citation endings
  const regexPattern = /\]\./g;
  
  // Helper function to add line breaks after every second citation
  const replaceEverySecondOccurrence = (text, pattern, replacement) => {
    let count = 0;
    return text.replace(new RegExp(pattern, 'g'), match => {
      count++;
      return count % 2 === 0 ? match.replace(pattern, replacement) : match;
    });
  };
  
  // Format the answer with line breaks
  const formattedRawAnswer = replaceEverySecondOccurrence(
    cleanedText,
    regexPattern,
    '].\n\n'
  );
  
  // Split the text by citation markers
  const parts = formattedRawAnswer.split(/\[(\d+)\]/g);

  // Map each part to either plain text or a citation link
  return parts.map((part, index) => {
    // Check if this is a citation number and it exists in our sources
    if (answerData.sources && answerData.sources.hasOwnProperty(part - 1)) {
      return (
        <div key={index} className="relative inline-flex group">
          <span
            className="underline text-xs text-blue-500 quicksand font-semibold ml-1 cursor-pointer"
            onClick={() => handleShowSingleSource(part)}
          >
            [{part}]
          </span>
        </div>
      );
    }
    return part;
  });
};

/**
 * Formats text for better readability by grouping sentences
 * @param {string} text - The text to format
 * @returns {string} Formatted HTML-ready string
 */
export const handleLength = (text) => {
  // Split text into sentences using regex
  const sentenceRegex = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/;
  const sentences = text.split(sentenceRegex);
  
  // Group sentences for better readability (2 sentences per group)
  const groups = sentences.reduce((acc, sentence, index) => {
    const groupIndex = Math.floor(index / 2);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(sentence);
    return acc;
  }, []);
  
  // Join sentences within groups
  const groupedSentences = groups.map(group => group.join(' '));
  
  // Join groups with HTML line breaks
  let groupedText = groupedSentences.join('<br/> <br/>');
  
  // Add ellipsis for incomplete sentences if needed
  const startsWithUppercase = groupedText[0] === groupedText[0].toUpperCase();
  const endsWithPunctuation = /[.,?!:]$/.test(groupedText) || groupedText.endsWith('...');
  
  groupedText = `${startsWithUppercase ? '' : '...'}${groupedText}${endsWithPunctuation ? '' : '...'}`;

  return groupedText;
};