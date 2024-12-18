import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PdfmakerService } from './modules/pdfmaker/pdfmaker.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pdfmakerService: PdfmakerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('save-pdf')
  async generateAndSavePdf() {
    return await this.pdfmakerService.generateAndSavePdf();
  }

  @Get('download-pdf')
  async generateAndDownloadPdf(@Res() res : Response) {
    return await this.pdfmakerService.generateAndDownloadPdf(res);
  }

  @Get('download-pdf/v1')
  async generateAndDownloadPdfAdvanced(@Res() res : Response) {
    return await this.pdfmakerService.generateAndDownloadPdfAdvanced(res);
  }
}
