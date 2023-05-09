import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ReportEntity } from './reports.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  providers: [ReportsService],
  controllers: [ReportsController]
})
export class ReportsModule {}
