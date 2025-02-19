import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t-[1px] border-gray-600 py-4 bg-gradient-to-t from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800">
      <div className="flex gap-4 items-center justify-center">
        <h1>Created by Feildrix Liemdra</h1>-
        <Link
          href="https://github.com/feildrixliemdra/pdf-summarizer"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Source Code
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
