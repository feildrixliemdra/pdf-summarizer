import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import type { TextContent } from 'pdfjs-dist/types/src/display/api';
// Ensure the worker is properly set up
if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
  // Set worker mode on window
  (window as any).PDFJS = { disableWorker: true };
}

// Updated interface to include page-specific content
interface PdfContent {
  text: string; // Full document text
  numberOfPages: number;
  info: any;
  metadata: any;
  version: string;
  pages: PageContent[]; // Array of page-specific content
}

interface PageContent {
  pageNumber: number;
  text: string;
}

/**
 * Reads text content from a PDF file with additional metadata and page-specific content
 * @param file - PDF File object
 * @returns Promise<PdfContent> - The extracted text content, metadata, and page-specific content
 */
// export async function readPdfWithMetadata(file: File): Promise<PdfContent> {
//   try {
//     const arrayBuffer = await file.arrayBuffer();
//     const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;

//     const numberOfPages = pdf.numPages;
//     const pages: PageContent[] = [];

//     // Extract text from each page
//     for (let i = 1; i <= numberOfPages; i++) {
//       const page = await pdf.getPage(i);
//       const textContent = await page.getTextContent();
//       const text = textContent.items.map((item: any) => item.str).join(' ');

//       pages.push({
//         pageNumber: i,
//         text: text,
//       });
//     }

//     // Combine all page texts for full document text
//     const fullText = pages.map((page) => page.text).join('\n\n');

//     const metadata = await pdf.getMetadata();

//     return {
//       text: fullText,
//       numberOfPages: numberOfPages,
//       info: metadata.info || {},
//       metadata: metadata.metadata || {},
//       version: pdf.version || '',
//       pages: pages,
//     };
//   } catch (error) {
//     throw new Error(`Failed to read PDF file: ${error.message}`);
//   }
// }

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    });
    const pdf = await loadingTask.promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = (await page.getTextContent()) as TextContent;
      text +=
        content.items.map((item) => ('str' in item ? item.str : '')).join(' ') +
        '\n';
    }

    return text;
  } catch (error) {
    console.error('PDF extraction failed:', error);
    throw new Error('Failed to extract text from PDF');
  }
};
