import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEmployee, Employee } from 'app/shared/model/organization/employee.model';
import { EmployeeService } from './employee.service';
import { IDepartment } from 'app/shared/model/organization/department.model';
import { DepartmentService } from 'app/entities/organization/department';

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html'
})
export class EmployeeUpdateComponent implements OnInit {
  employee: IEmployee;
  isSaving: boolean;

  departments: IDepartment[];

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern('^[^@s]+@[^@s]+.[^@s]+$')]],
    phone: [null, [Validators.required]],
    addressLine1: [null, [Validators.required]],
    addressLine2: [],
    city: [null, [Validators.required]],
    country: [null, [Validators.required]],
    department: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected employeeService: EmployeeService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.updateForm(employee);
      this.employee = employee;
    });
    this.departmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe((res: IDepartment[]) => (this.departments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(employee: IEmployee) {
    this.editForm.patchValue({
      id: employee.id,
      code: employee.code,
      firstName: employee.firstName,
      lastName: employee.lastName,
      gender: employee.gender,
      email: employee.email,
      phone: employee.phone,
      addressLine1: employee.addressLine1,
      addressLine2: employee.addressLine2,
      city: employee.city,
      country: employee.country,
      department: employee.department
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  private createFromForm(): IEmployee {
    const entity = {
      ...new Employee(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      gender: this.editForm.get(['gender']).value,
      email: this.editForm.get(['email']).value,
      phone: this.editForm.get(['phone']).value,
      addressLine1: this.editForm.get(['addressLine1']).value,
      addressLine2: this.editForm.get(['addressLine2']).value,
      city: this.editForm.get(['city']).value,
      country: this.editForm.get(['country']).value,
      department: this.editForm.get(['department']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>) {
    result.subscribe((res: HttpResponse<IEmployee>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDepartmentById(index: number, item: IDepartment) {
    return item.id;
  }
}
