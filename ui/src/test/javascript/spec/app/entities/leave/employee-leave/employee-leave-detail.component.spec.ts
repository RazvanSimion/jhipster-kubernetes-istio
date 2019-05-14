/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UiTestModule } from '../../../../test.module';
import { EmployeeLeaveDetailComponent } from 'app/entities/leave/employee-leave/employee-leave-detail.component';
import { EmployeeLeave } from 'app/shared/model/leave/employee-leave.model';

describe('Component Tests', () => {
  describe('EmployeeLeave Management Detail Component', () => {
    let comp: EmployeeLeaveDetailComponent;
    let fixture: ComponentFixture<EmployeeLeaveDetailComponent>;
    const route = ({ data: of({ employeeLeave: new EmployeeLeave('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [EmployeeLeaveDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmployeeLeaveDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeLeaveDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employeeLeave).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
