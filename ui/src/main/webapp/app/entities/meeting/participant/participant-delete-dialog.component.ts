import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParticipant } from 'app/shared/model/meeting/participant.model';
import { ParticipantService } from './participant.service';

@Component({
  selector: 'jhi-participant-delete-dialog',
  templateUrl: './participant-delete-dialog.component.html'
})
export class ParticipantDeleteDialogComponent {
  participant: IParticipant;

  constructor(
    protected participantService: ParticipantService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.participantService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'participantListModification',
        content: 'Deleted an participant'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-participant-delete-popup',
  template: ''
})
export class ParticipantDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ participant }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ParticipantDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.participant = participant;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/participant', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/participant', { outlets: { popup: null } }]);
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
