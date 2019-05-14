import { Moment } from 'moment';
import { IMeetingRoom } from 'app/shared/model/meeting/meeting-room.model';
import { IParticipant } from 'app/shared/model/meeting/participant.model';

export interface IMeeting {
  id?: string;
  title?: string;
  description?: string;
  startDate?: Moment;
  endDate?: Moment;
  meetingRoom?: IMeetingRoom;
  participants?: IParticipant[];
}

export class Meeting implements IMeeting {
  constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public meetingRoom?: IMeetingRoom,
    public participants?: IParticipant[]
  ) {}
}
