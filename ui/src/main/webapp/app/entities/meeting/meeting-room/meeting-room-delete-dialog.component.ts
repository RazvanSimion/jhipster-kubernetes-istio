import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeetingRoom } from 'app/shared/model/meeting/meeting-room.model';
import { MeetingRoomService } from './meeting-room.service';

@Component({
  selector: 'jhi-meeting-room-delete-dialog',
  templateUrl: './meeting-room-delete-dialog.component.html'
})
export class MeetingRoomDeleteDialogComponent {
  meetingRoom: IMeetingRoom;

  constructor(
    protected meetingRoomService: MeetingRoomService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.meetingRoomService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'meetingRoomListModification',
        content: 'Deleted an meetingRoom'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-meeting-room-delete-popup',
  template: ''
})
export class MeetingRoomDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ meetingRoom }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MeetingRoomDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.meetingRoom = meetingRoom;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/meeting-room', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/meeting-room', { outlets: { popup: null } }]);
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
