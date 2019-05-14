/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { UiTestModule } from '../../../../test.module';
import { LeaveRequestDeleteDialogComponent } from 'app/entities/leave/leave-request/leave-request-delete-dialog.component';
import { LeaveRequestService } from 'app/entities/leave/leave-request/leave-request.service';

describe('Component Tests', () => {
  describe('LeaveRequest Management Delete Component', () => {
    let comp: LeaveRequestDeleteDialogComponent;
    let fixture: ComponentFixture<LeaveRequestDeleteDialogComponent>;
    let service: LeaveRequestService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [LeaveRequestDeleteDialogComponent]
      })
        .overrideTemplate(LeaveRequestDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LeaveRequestDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LeaveRequestService);
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
