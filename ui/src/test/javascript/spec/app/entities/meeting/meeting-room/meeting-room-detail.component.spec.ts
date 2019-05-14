/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UiTestModule } from '../../../../test.module';
import { MeetingRoomDetailComponent } from 'app/entities/meeting/meeting-room/meeting-room-detail.component';
import { MeetingRoom } from 'app/shared/model/meeting/meeting-room.model';

describe('Component Tests', () => {
  describe('MeetingRoom Management Detail Component', () => {
    let comp: MeetingRoomDetailComponent;
    let fixture: ComponentFixture<MeetingRoomDetailComponent>;
    const route = ({ data: of({ meetingRoom: new MeetingRoom('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [MeetingRoomDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MeetingRoomDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MeetingRoomDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.meetingRoom).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
