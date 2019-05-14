import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeetingRoom } from 'app/shared/model/meeting/meeting-room.model';

@Component({
  selector: 'jhi-meeting-room-detail',
  templateUrl: './meeting-room-detail.component.html'
})
export class MeetingRoomDetailComponent implements OnInit {
  meetingRoom: IMeetingRoom;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ meetingRoom }) => {
      this.meetingRoom = meetingRoom;
    });
  }

  previousState() {
    window.history.back();
  }
}
