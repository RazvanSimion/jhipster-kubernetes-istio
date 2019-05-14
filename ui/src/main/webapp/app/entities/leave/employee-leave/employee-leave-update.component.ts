import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEmployeeLeave, EmployeeLeave } from 'app/shared/model/leave/employee-leave.model';
import { EmployeeLeaveService } from './employee-leave.service';

@Component({
  selector: 'jhi-employee-leave-update',
  templateUrl: './employee-leave-update.component.html'
})
export class EmployeeLeaveUpdateComponent implements OnInit {
  employeeLeave: IEmployeeLeave;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    employeeCode: [null, [Validators.required]],
    total: [null, [Validators.required]],
    available: [null, [Validators.required]]
  });

  constructor(protected employeeLeaveService: EmployeeLeaveService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ employeeLeave }) => {
      this.updateForm(employeeLeave);
      this.employeeLeave = employeeLeave;
    });
  }

  updateForm(employeeLeave: IEmployeeLeave) {
    this.editForm.patchValue({
      id: employeeLeave.id,
      employeeCode: employeeLeave.employeeCode,
      total: employeeLeave.total,
      available: employeeLeave.available
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const employeeLeave = this.createFromForm();
    if (employeeLeave.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeLeaveService.update(employeeLeave));
    } else {
      this.subscribeToSaveResponse(this.employeeLeaveService.create(employeeLeave));
    }
  }

  private createFromForm(): IEmployeeLeave {
    const entity = {
      ...new EmployeeLeave(),
      id: this.editForm.get(['id']).value,
      employeeCode: this.editForm.get(['employeeCode']).value,
      total: this.editForm.get(['total']).value,
      available: this.editForm.get(['available']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeLeave>>) {
    result.subscribe((res: HttpResponse<IEmployeeLeave>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
