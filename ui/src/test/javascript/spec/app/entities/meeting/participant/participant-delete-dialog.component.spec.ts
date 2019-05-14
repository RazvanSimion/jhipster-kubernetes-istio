/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UiTestModule } from '../../../../test.module';
import { ParticipantDeleteDialogComponent } from 'app/entities/meeting/participant/participant-delete-dialog.component';
import { ParticipantService } from 'app/entities/meeting/participant/participant.service';

describe('Component Tests', () => {
  describe('Participant Management Delete Component', () => {
    let comp: ParticipantDeleteDialogComponent;
    let fixture: ComponentFixture<ParticipantDeleteDialogComponent>;
    let service: ParticipantService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [ParticipantDeleteDialogComponent]
      })
        .overrideTemplate(ParticipantDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParticipantDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParticipantService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
