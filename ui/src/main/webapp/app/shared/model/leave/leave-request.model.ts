import { Moment } from 'moment';

export const enum LeaveRequestType {
  VACATION = 'VACATION',
  MEDICAL = 'MEDICAL'
}

export const enum LeaveRequestStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface ILeaveRequest {
  id?: string;
  startDate?: Moment;
  endDate?: Moment;
  creationDate?: Moment;
  departmentCode?: string;
  employeeCode?: string;
  workingDays?: number;
  description?: string;
  leaveType?: LeaveRequestType;
  status?: LeaveRequestStatus;
}

export class LeaveRequest implements ILeaveRequest {
  constructor(
    public id?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public creationDate?: Moment,
    public departmentCode?: string,
    public employeeCode?: string,
    public workingDays?: number,
    public description?: string,
    public leaveType?: LeaveRequestType,
    public status?: LeaveRequestStatus
  ) {}
}
