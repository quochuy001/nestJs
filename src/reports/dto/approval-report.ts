import { IsBoolean } from 'class-validator'

export class ApprovalReport {
    @IsBoolean()
    approval: boolean;
}