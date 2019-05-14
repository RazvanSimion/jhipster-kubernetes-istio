/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UiTestModule } from '../../../../test.module';
import { LeaveRequestDetailComponent } from 'app/entities/leave/leave-request/leave-request-detail.component';
import { LeaveRequest } from 'app/shared/model/leave/leave-request.model';

describe('Component Tests', () => {
  describe('LeaveRequest Management Detail Component', () => {
    let comp: LeaveRequestDetailComponent;
    let fixture: ComponentFixture<LeaveRequestDetailComponent>;
    const route = ({ data: of({ leaveRequest: new LeaveRequest('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [LeaveRequestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LeaveRequestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LeaveRequestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.leaveRequest).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
