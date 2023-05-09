import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { ReportEntity } from './reports.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UserEntity } from 'src/users/users.entity';
import { ApprovalReport } from './dto/approval-report';
import { EstimateReportDto } from './dto/estimate-report.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(ReportEntity) private repo: Repository<ReportEntity>) {
        
    }

    CustomeRepository = this.repo.extend({
        findByName(first: string) {
            console.log(`custome repository + ${first}`);
            return {'custome': first}
        }}
    )
    

    createReport(reportDto: CreateReportDto, user: UserEntity){
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);
    }

    async find(){
        // const listreport = await this.repo.find();
        // console.log(listreport);
        
        // return listreport;

        return this.CustomeRepository.findByName('huy')
    }

    async updateApproval(id: string, body: ApprovalReport){
        const report = await this.repo.findOne(
            { where: {
                id: parseInt(id),
            }}
        )

        report.approval = body.approval;
        return this.repo.save(report);
    }

    async getEstimateReport({made, model, lat, lng, year, mileage}: EstimateReportDto){
        const reports = await this.repo.createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('made = :made', {made})
        .andWhere('model = :model', {model})
        .andWhere('lng- :lng BETWEEN -5 AND 5', {lng})
        .andWhere('lat- :lat BETWEEN -5 AND 5', {lat})
        .andWhere('year- :year BETWEEN -3 AND 3', {year})
        .orderBy('ABS(mileage - :mileage)', 'ASC')
        .setParameters({mileage})
        .limit(3)
        .getRawOne()
        return reports;
    }

}
