import {
    IsString,
    IsNumber,
    Max,
    Min,
    IsLatitude,
    IsLongitude

} from 'class-validator';

import { Transform } from 'class-transformer';

export class EstimateReportDto{

    @IsString()
    made: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    @Transform(({value}) => parseInt(value))
    year: number;

    @IsLongitude()
    @Transform(({value}) => parseInt(value))
    lng: number;

    
    @IsLatitude()
    @Transform(({value}) => parseInt(value))
    lat: number;

    @IsNumber()
    @Max(10000000)
    @Min(0)
    @Transform(({value}) => parseInt(value))
    mileage: number;
}