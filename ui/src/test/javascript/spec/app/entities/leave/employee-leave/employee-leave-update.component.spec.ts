/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { UiTestModule } from '../../../../test.module';
import { EmployeeLeaveUpdateComponent } from 'app/entities/leave/employee-leave/employee-leave-update.component';
import { EmployeeLeaveService } from 'app/entities/leave/employee-leave/employee-leave.service';
import { EmployeeLeave } from 'app/shared/model/leave/employee-leave.model';

describe('Component Tests', () => {
  describe('EmployeeLeave Management Update Component', () => {
    let comp: EmployeeLeaveUpdateComponent;
    let fixture: ComponentFixture<EmployeeLeaveUpdateComponent>;
    let service: EmployeeLeaveService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [EmployeeLeaveUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EmployeeLeaveUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeLeaveUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeLeaveService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeLeave('123');
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
        const entity = new EmployeeLeave();
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
