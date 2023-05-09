import {
    IsString,
    IsNumber,
    Max,
    Min,
    IsLatitude,
    isLongitude,
    IsLongitude

} from 'class-validator';

export class CreateReportDto{

    @IsString()
    made: string;

    @IsString()
    model: string;

    @IsNumber()
    @Max(10000000000)
    @Min(0)
    price: number;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    lat: number;

    @IsNumber()
    @Max(10000000)
    @Min(0)
    mileage: number;
}   