import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeLeave } from 'app/shared/model/leave/employee-leave.model';

@Component({
  selector: 'jhi-employee-leave-detail',
  templateUrl: './employee-leave-detail.component.html'
})
export class EmployeeLeaveDetailComponent implements OnInit {
  employeeLeave: IEmployeeLeave;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ employeeLeave }) => {
      this.employeeLeave = employeeLeave;
    });
  }

  previousState() {
    window.history.back();
  }
}
