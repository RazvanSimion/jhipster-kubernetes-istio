/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UiTestModule } from '../../../../test.module';
import { MeetingRoomDeleteDialogComponent } from 'app/entities/meeting/meeting-room/meeting-room-delete-dialog.component';
import { MeetingRoomService } from 'app/entities/meeting/meeting-room/meeting-room.service';

describe('Component Tests', () => {
  describe('MeetingRoom Management Delete Component', () => {
    let comp: MeetingRoomDeleteDialogComponent;
    let fixture: ComponentFixture<MeetingRoomDeleteDialogComponent>;
    let service: MeetingRoomService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [MeetingRoomDeleteDialogComponent]
      })
        .overrideTemplate(MeetingRoomDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MeetingRoomDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeetingRoomService);
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
