import { IMeeting } from 'app/shared/model/meeting/meeting.model';

export interface IParticipant {
  id?: string;
  email?: string;
  meetings?: IMeeting[];
}

export class Participant implements IParticipant {
  constructor(public id?: string, public email?: string, public meetings?: IMeeting[]) {}
}
