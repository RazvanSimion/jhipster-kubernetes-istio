import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeLeave } from 'app/shared/model/leave/employee-leave.model';
import { EmployeeLeaveService } from './employee-leave.service';

@Component({
  selector: 'jhi-employee-leave-delete-dialog',
  templateUrl: './employee-leave-delete-dialog.component.html'
})
export class EmployeeLeaveDeleteDialogComponent {
  employeeLeave: IEmployeeLeave;

  constructor(
    protected employeeLeaveService: EmployeeLeaveService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.employeeLeaveService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'employeeLeaveListModification',
        content: 'Deleted an employeeLeave'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-employee-leave-delete-popup',
  template: ''
})
export class EmployeeLeaveDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ employeeLeave }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EmployeeLeaveDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.employeeLeave = employeeLeave;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/employee-leave', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/employee-leave', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
