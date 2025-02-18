'use client';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useState } from 'react';

const PDFPage = () => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    setError('');
    console.log(files);
  };

  const handleAnalyze = useCallback(async () => {
    setIsLoading(true);

    if (files.length === 0) {
      console.log('no files ');
      setError('Please select a file to summarize.');
      setIsLoading(false);

      return;
    }

    setError('');
    setSummary('');
    const r = await setTimeout(() => {
      console.log('Hello, World!');
      setIsLoading(false);
    }, 2000);

    return;

    try {
      // const text = await extractTextFromPDF(files[0])

      const response = await fetch('/api/summarizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        // body: JSON.stringify({ text: text.substring(0, 10000) }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setSummary(data.summary || 'No summary was generated.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze PDF.');
    } finally {
      setIsLoading(false);
    }
  }, [files]);
  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <section className="container mx-auto z-10">
        <div className="w-1/2 mx-auto bg-[#1A1A23] my-10 rounded-md  border-white border-[1px] p-8 flex flex-col justify-between gap-5 items-center">
          <h1 className="text-2xl font-semibold">Upload your PDF</h1>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400">
              {error}
            </div>
          )}
          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full py-6 text-lg  bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white font-semibold"
          >
            {isLoading ? (
              <Loader2 size={25} className="animate-spin" />
            ) : (
              'Summarize Document'
            )}
          </Button>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
};

export default PDFPage;
