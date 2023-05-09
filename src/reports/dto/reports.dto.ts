import {Expose, Transform} from 'class-transformer';
import { UserEntity } from '../../users/users.entity';

export class ReportDto {
    
    @Expose()
    id: number;

    @Expose()
    price: number;
    
    @Expose()
    made: string;
    
    @Expose()
    lng: number;

    @Expose()
    model: string;
    
    @Expose()
    lat: number;
    
    @Expose()
    year: number;
    
    @Expose()
    mileage: string;

    @Expose()
    approval: boolean;

    @Transform(({obj}) =>{
        if(obj.user){
            return obj.user.id
        }
    } )
    @Expose()
    userId: UserEntity;
}
