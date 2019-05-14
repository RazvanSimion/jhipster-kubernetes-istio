import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeeting } from 'app/shared/model/meeting/meeting.model';

@Component({
  selector: 'jhi-meeting-detail',
  templateUrl: './meeting-detail.component.html'
})
export class MeetingDetailComponent implements OnInit {
  meeting: IMeeting;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ meeting }) => {
      this.meeting = meeting;
    });
  }

  previousState() {
    window.history.back();
  }
}
