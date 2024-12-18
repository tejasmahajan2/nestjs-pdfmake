import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfmakerModule } from './modules/pdfmaker/pdfmaker.module';

@Module({
  imports: [PdfmakerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
