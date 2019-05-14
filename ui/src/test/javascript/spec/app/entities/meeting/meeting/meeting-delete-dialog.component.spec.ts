/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UiTestModule } from '../../../../test.module';
import { MeetingDeleteDialogComponent } from 'app/entities/meeting/meeting/meeting-delete-dialog.component';
import { MeetingService } from 'app/entities/meeting/meeting/meeting.service';

describe('Component Tests', () => {
  describe('Meeting Management Delete Component', () => {
    let comp: MeetingDeleteDialogComponent;
    let fixture: ComponentFixture<MeetingDeleteDialogComponent>;
    let service: MeetingService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [MeetingDeleteDialogComponent]
      })
        .overrideTemplate(MeetingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MeetingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeetingService);
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
