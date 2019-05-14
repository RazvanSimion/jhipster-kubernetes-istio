export interface IMeetingRoom {
  id?: string;
  code?: string;
  location?: string;
  name?: string;
}

export class MeetingRoom implements IMeetingRoom {
  constructor(public id?: string, public code?: string, public location?: string, public name?: string) {}
}
