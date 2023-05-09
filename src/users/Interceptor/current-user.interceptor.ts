import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
} from '@nestjs/common'
import { UsersService } from '../users.service'



@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UsersService) {
        
    }
    async intercept(ctx: ExecutionContext, next: CallHandler) {
        const req = ctx.switchToHttp().getRequest();
        
        const {userId} = req.session || {};
        if(userId){
            console.log('current request run');
            
            const user = this.userService.findOne(userId);
            req.currentUser = user;
        }
        return next.handle()
    }
}
