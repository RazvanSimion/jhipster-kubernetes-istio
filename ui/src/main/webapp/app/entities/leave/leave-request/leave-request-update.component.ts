import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ILeaveRequest, LeaveRequest } from 'app/shared/model/leave/leave-request.model';
import { LeaveRequestService } from './leave-request.service';

@Component({
  selector: 'jhi-leave-request-update',
  templateUrl: './leave-request-update.component.html'
})
export class LeaveRequestUpdateComponent implements OnInit {
  leaveRequest: ILeaveRequest;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    creationDate: [null, [Validators.required]],
    departmentCode: [null, [Validators.required]],
    employeeCode: [null, [Validators.required]],
    workingDays: [null, [Validators.required]],
    description: [],
    leaveType: [null, [Validators.required]],
    status: [null, [Validators.required]]
  });

  constructor(protected leaveRequestService: LeaveRequestService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ leaveRequest }) => {
      this.updateForm(leaveRequest);
      this.leaveRequest = leaveRequest;
    });
  }

  updateForm(leaveRequest: ILeaveRequest) {
    this.editForm.patchValue({
      id: leaveRequest.id,
      startDate: leaveRequest.startDate != null ? leaveRequest.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: leaveRequest.endDate != null ? leaveRequest.endDate.format(DATE_TIME_FORMAT) : null,
      creationDate: leaveRequest.creationDate != null ? leaveRequest.creationDate.format(DATE_TIME_FORMAT) : null,
      departmentCode: leaveRequest.departmentCode,
      employeeCode: leaveRequest.employeeCode,
      workingDays: leaveRequest.workingDays,
      description: leaveRequest.description,
      leaveType: leaveRequest.leaveType,
      status: leaveRequest.status
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const leaveRequest = this.createFromForm();
    if (leaveRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.leaveRequestService.update(leaveRequest));
    } else {
      this.subscribeToSaveResponse(this.leaveRequestService.create(leaveRequest));
    }
  }

  private createFromForm(): ILeaveRequest {
    const entity = {
      ...new LeaveRequest(),
      id: this.editForm.get(['id']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value != null ? moment(this.editForm.get(['endDate']).value, DATE_TIME_FORMAT) : undefined,
      creationDate:
        this.editForm.get(['creationDate']).value != null ? moment(this.editForm.get(['creationDate']).value, DATE_TIME_FORMAT) : undefined,
      departmentCode: this.editForm.get(['departmentCode']).value,
      employeeCode: this.editForm.get(['employeeCode']).value,
      workingDays: this.editForm.get(['workingDays']).value,
      description: this.editForm.get(['description']).value,
      leaveType: this.editForm.get(['leaveType']).value,
      status: this.editForm.get(['status']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeaveRequest>>) {
    result.subscribe((res: HttpResponse<ILeaveRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
