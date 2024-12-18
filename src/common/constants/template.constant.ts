import { ICreateInvoice } from "../interfaces/create-invoice.interface";

export const fonts = {
    Roboto: {
        normal: './src/common/fonts/Roboto-Regular.ttf',
        bold: './src/common/fonts/Roboto-Bold.ttf',
        black: './src/common/fonts/Roboto-Black.ttf',
        italics: './src/common/fonts/Roboto-Italic.ttf',
        bolditalics: './src/common/fonts/Roboto-BoldItalic.ttf'
    },
};

export const createInvoiceDocument = (doc: ICreateInvoice) => ({
    content: [
        {
            fontSize: 11,
            table: {
                widths: ['50%', '50%'],
                body: [
                    [{ text: 'Status: unpaid', border: [false, false, false, true], margin: [-5, 0, 0, 10] }, { text: 'Invoice# ' + doc.invoiceNo, alignment: 'right', border: [false, false, false, true], margin: [0, 0, 0, 10] }]
                ]
            }
        },
        {
            layout: 'noBorders',
            fontSize: 11,
            table: {
                widths: ['50%', '50%'],
                body: [
                    [{ text: 'Website.com', margin: [0, 10, 0, 0] }, { text: 'Invoice date: ' + doc.invoiceData, alignment: 'right', margin: [0, 10, 0, 0] }],
                    ['...', ''],
                    ['...', ''],
                    ['...', '']
                ]
            }
        },
        {
            fontSize: 11,
            table: {
                widths: ['50%', '50%'],
                body: [
                    [{ text: ' ', border: [false, false, false, true], margin: [0, 0, 0, 10] }, { text: 'Payment amount: $' + doc.price, alignment: 'right', border: [false, false, false, true], margin: [0, 0, 0, 10] }]
                ]
            }
        },
        {
            layout: 'noBorders',
            fontSize: 11,
            table: {
                widths: ['100%'],
                body: [
                    [{ text: 'User account for payment:', margin: [0, 10, 0, 0] }],
                    [doc.buyerInfo],
                    [doc.buyerAddress],
                    ['Payment link:'],
                    [{ text: 'https://website.com/shopcart/invoices_view.php?hash=' + doc.hash, margin: [0, 0, 0, 10], fontSize: 10 }]
                ]
            }
        },
        {
            fontSize: 11,
            table: {
                widths: ['5%', '56%', '13%', '13%', '13%'],
                body: [
                    [{ text: 'Pos', border: [false, true, false, true] }, { text: 'Item', border: [false, true, false, true] }, { text: 'Price', border: [false, true, false, true] }, { text: 'Quantity', alignment: 'center', border: [false, true, false, true] }, { text: 'Total', border: [false, true, false, true] }],
                    [{ text: '1', border: [false, true, false, true] }, { text: doc.item, border: [false, true, false, true] }, { text: "$" + doc.price, border: [false, true, false, true] }, { text: '1', alignment: 'center', border: [false, true, false, true] }, { text: "$" + doc.price, border: [false, true, false, true] }]
                ]
            }
        },
        {
            layout: 'noBorders',
            fontSize: 11,
            margin: [0, 0, 5, 0],
            table: {
                widths: ['88%', '12%'],
                body: [
                    [{ text: 'Subtotal:', alignment: 'right', margin: [0, 5, 0, 0] }, { text: '$' + doc.price, margin: [0, 5, 0, 0] }],
                    [{ text: 'Tax %:', alignment: 'right' }, '$0.00'],

                ]
            }
        },
        {
            fontSize: 11,
            table: {
                widths: ['88%', '12%'],
                body: [
                    [{ text: 'Total:', alignment: 'right', border: [false, false, false, true], margin: [0, 0, 0, 10] }, { text: '$' + doc.price, border: [false, false, false, true], margin: [0, 0, 0, 10] }]
                ]
            }
        },
        {
            layout: 'noBorders',
            fontSize: 11,
            alignment: 'center',
            table: {
                widths: ['100%'],
                body: [
                    [{ text: 'Wire transfer info:', margin: [0, 10, 0, 0] }],
                    ['SWIFT: ...'],
                    ['Account number: ...'],
                    ['Company name: ...'],
                    [' '],
                    ['Company address:'],
                    ['...']
                ]
            }
        }
    ]

});