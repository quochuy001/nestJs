import {
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {plainToInstance} from 'class-transformer';
// import { UserDto } from 'src/users/dto/user.dto';

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any) {

    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Running before send the request to handler
        // Running before send the response out to the client (in 'return' )
        return next.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                })
            })
        )
        
    }
}