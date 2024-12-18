import * as PDFDocument from 'pdfkit'

async generateInvoicePDF(template : string): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise(resolve => {
        const doc = new PDFDocument({
            size: 'LETTER',
            bufferPages: true,
        })

        // customize your PDF document
        doc.text(template, 100, 50)
        doc.end()

        const buffer = []
        doc.on('data', buffer.push.bind(buffer))
        doc.on('end', () => {
            const data = Buffer.concat(buffer)
            resolve(data)
        })
    })

    return pdfBuffer
}
