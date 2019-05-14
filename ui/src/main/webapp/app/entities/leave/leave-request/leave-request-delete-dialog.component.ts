import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILeaveRequest } from 'app/shared/model/leave/leave-request.model';
import { LeaveRequestService } from './leave-request.service';

@Component({
  selector: 'jhi-leave-request-delete-dialog',
  templateUrl: './leave-request-delete-dialog.component.html'
})
export class LeaveRequestDeleteDialogComponent {
  leaveRequest: ILeaveRequest;

  constructor(
    protected leaveRequestService: LeaveRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.leaveRequestService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'leaveRequestListModification',
        content: 'Deleted an leaveRequest'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-leave-request-delete-popup',
  template: ''
})
export class LeaveRequestDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ leaveRequest }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LeaveRequestDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.leaveRequest = leaveRequest;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/leave-request', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/leave-request', { outlets: { popup: null } }]);
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
