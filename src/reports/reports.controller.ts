import { Controller, Post, Get, Patch, Query, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorator/current-user.decorator';
import { UserEntity } from '../users/users.entity';
import { Serialize } from '../users/users.controller';
import { ReportDto } from './dto/reports.dto';
import { ApprovalReport } from './dto/approval-report';
import { EstimateReportDto } from './dto/estimate-report.dto';

@Controller('reports')
// @Serialize(ReportDto)
export class ReportsController {
    constructor(private reportService: ReportsService) {};

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity){
        return this.reportService.createReport(body, user);
    }

    // @Get()
    // getEstimateReport(@Query() query: EstimateReportDto){ 
    //     return this.reportService.getEstimateReport(query);
    // }
    
    @Get()
    getReports(){
        return this.reportService.find();
    }
    
    
    @Patch('/:id')
    updateApproval(@Param('id') id: string, @Body() body: ApprovalReport){
        return this. reportService.updateApproval(id, body);
    }
}
