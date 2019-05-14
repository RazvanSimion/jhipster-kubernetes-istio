import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeeting } from 'app/shared/model/meeting/meeting.model';
import { MeetingService } from './meeting.service';

@Component({
  selector: 'jhi-meeting-delete-dialog',
  templateUrl: './meeting-delete-dialog.component.html'
})
export class MeetingDeleteDialogComponent {
  meeting: IMeeting;

  constructor(protected meetingService: MeetingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.meetingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'meetingListModification',
        content: 'Deleted an meeting'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-meeting-delete-popup',
  template: ''
})
export class MeetingDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ meeting }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MeetingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.meeting = meeting;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/meeting', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/meeting', { outlets: { popup: null } }]);
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
