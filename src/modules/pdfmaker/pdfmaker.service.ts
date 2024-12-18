import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as PdfPrinter from 'pdfmake';
import * as fs from 'fs';
import { Response } from "express";
import * as getStream from 'get-stream';
import { createInvoiceDocument, fonts } from 'src/common/constants/template.constant';
import { ICreateInvoice } from 'src/common/interfaces/create-invoice.interface';

@Injectable()
export class PdfmakerService {
    private readonly printer = new PdfPrinter(fonts);

    async generateAndSavePdf(filename: string = 'invoice.pdf') {
        const invoiceData: ICreateInvoice = {
            invoiceNo: 100,
            invoiceData: 4500,
            price: 15000,
            hash: 123456789,
            item: 15,
            buyerInfo: 'Tejas Mahajan',
            buyerAddress: 'Indore, Madhya Pradesh, India'
        };
        
        const invoiceDocument = createInvoiceDocument(invoiceData);

        const pdfDoc = this.printer.createPdfKitDocument(invoiceDocument);
        const writeStream = fs.createWriteStream(filename);
        pdfDoc.pipe(writeStream);
        pdfDoc.end();

        // Wait for the file to be fully written
        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve); // Resolved when stream finishes
            writeStream.on('error', reject);  // Rejected if any error occurs
        });

        return { message: "PDF successfully created!" };
    }

    async generateAndDownloadPdf(res: Response, filename: string = 'invoice.pdf') {
        const invoiceData: ICreateInvoice = {
            invoiceNo: 100,
            invoiceData: 4500,
            price: 15000,
            hash: 123456789,
            item: 15,
            buyerInfo: 'Tejas Mahajan',
            buyerAddress: 'Indore, Madhya Pradesh, India'
        };

        const invoiceDocument = createInvoiceDocument(invoiceData);

        const pdfDoc = this.printer.createPdfKitDocument(invoiceDocument);
        pdfDoc.end();

        const pdfBuffer = await getStream.buffer(pdfDoc); // Waits until the stream ends and returns the entire buffer

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename=${filename}`,  // Use 'attachment' to force download
            'Content-Length': pdfBuffer.length,
        });

        res.send(pdfBuffer);
    }

    async generateAndDownloadPdfAdvanced(res: Response, filename: string = 'invoice.pdf') {
        const invoiceData: ICreateInvoice = {
            invoiceNo: 100,
            invoiceData: 4500,
            price: 15000,
            hash: 123456789,
            item: 15,
            buyerInfo: 'Tejas Mahajan',
            buyerAddress: 'Indore, Madhya Pradesh, India'
        };

        const invoiceDocument = createInvoiceDocument(invoiceData);
        const pdfDoc = this.printer.createPdfKitDocument(invoiceDocument);
        pdfDoc.end();

        try {
            // Use get-stream for small PDFs
            const pdfBuffer = await getStream.buffer(pdfDoc); // Waits until the stream ends and returns the entire buffer

            if (pdfBuffer.length > 10 * 1024 * 1024) { // Larger than 10MB
                throw new InternalServerErrorException('Large file detected');
            }

            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename=${filename}`,  // Use 'attachment' to force download
                'Content-Length': pdfBuffer.length,
            });

            res.send(pdfBuffer);
        } catch (error) {
            // Fallback to manual event-driven approach for large files
            const chunks: Buffer[] = [];
            pdfDoc.on('data', (chunk: Buffer<ArrayBufferLike>) => chunks.push(chunk));
            pdfDoc.on('end', () => {
                const pdfBuffer = Buffer.concat(chunks);

                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `inline; filename=${filename}`,  // Use 'attachment' to force download
                    'Content-Length': pdfBuffer.length,
                });

                res.send(pdfBuffer);
            });

            pdfDoc.on('error', (err: { message: any; }) => {
                res.status(500).send(`Error generating PDF: ${err.message}`);
            });
        }

    }
}


