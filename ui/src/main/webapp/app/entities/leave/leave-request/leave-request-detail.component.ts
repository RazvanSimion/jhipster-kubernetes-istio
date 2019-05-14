import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILeaveRequest } from 'app/shared/model/leave/leave-request.model';

@Component({
  selector: 'jhi-leave-request-detail',
  templateUrl: './leave-request-detail.component.html'
})
export class LeaveRequestDetailComponent implements OnInit {
  leaveRequest: ILeaveRequest;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ leaveRequest }) => {
      this.leaveRequest = leaveRequest;
    });
  }

  previousState() {
    window.history.back();
  }
}
