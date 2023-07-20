import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const helperFunctions = {};

helperFunctions.md = (markdownText) => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownText}</ReactMarkdown>;
};

export default helperFunctions;
