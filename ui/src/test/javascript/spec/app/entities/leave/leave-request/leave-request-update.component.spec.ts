/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { UiTestModule } from '../../../../test.module';
import { LeaveRequestUpdateComponent } from 'app/entities/leave/leave-request/leave-request-update.component';
import { LeaveRequestService } from 'app/entities/leave/leave-request/leave-request.service';
import { LeaveRequest } from 'app/shared/model/leave/leave-request.model';

describe('Component Tests', () => {
  describe('LeaveRequest Management Update Component', () => {
    let comp: LeaveRequestUpdateComponent;
    let fixture: ComponentFixture<LeaveRequestUpdateComponent>;
    let service: LeaveRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [LeaveRequestUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LeaveRequestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LeaveRequestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LeaveRequestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LeaveRequest('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new LeaveRequest();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
