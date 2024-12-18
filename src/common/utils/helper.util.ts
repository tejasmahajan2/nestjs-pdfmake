import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique PDF file name.
 * 
 * @param {string} prefix - Optional prefix for the file name (e.g., "invoice", "report").
 * @param {string} suffix - Optional suffix for the file name (e.g., user ID, custom tag).
 * @returns {string} - The generated PDF file name.
 */
export function generatePdfName(prefix: string = 'document', suffix: string = ''): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Replaces : and . to avoid issues with file names
    const uniqueId = uuidv4();
    const suffixPart = suffix ? `-${suffix}` : '';
    return `${prefix}-${timestamp}-${uniqueId}${suffixPart}.pdf`;
}