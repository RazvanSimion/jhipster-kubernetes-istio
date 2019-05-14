import { Moment } from 'moment';

export const enum NotificationType {
  EMAIL = 'EMAIL',
  PUSH = 'PUSH'
}

export interface INotification {
  id?: string;
  date?: Moment;
  details?: string;
  sentDate?: Moment;
  format?: NotificationType;
  userId?: number;
  productId?: number;
}

export class Notification implements INotification {
  constructor(
    public id?: string,
    public date?: Moment,
    public details?: string,
    public sentDate?: Moment,
    public format?: NotificationType,
    public userId?: number,
    public productId?: number
  ) {}
}
