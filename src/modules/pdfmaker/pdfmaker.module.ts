import { Module } from '@nestjs/common';
import { PdfmakerService } from './pdfmaker.service';

@Module({
  providers: [PdfmakerService],
  exports: [PdfmakerService],
})
export class PdfmakerModule {}
