/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { UiTestModule } from '../../../../test.module';
import { MeetingRoomUpdateComponent } from 'app/entities/meeting/meeting-room/meeting-room-update.component';
import { MeetingRoomService } from 'app/entities/meeting/meeting-room/meeting-room.service';
import { MeetingRoom } from 'app/shared/model/meeting/meeting-room.model';

describe('Component Tests', () => {
  describe('MeetingRoom Management Update Component', () => {
    let comp: MeetingRoomUpdateComponent;
    let fixture: ComponentFixture<MeetingRoomUpdateComponent>;
    let service: MeetingRoomService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [MeetingRoomUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MeetingRoomUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MeetingRoomUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeetingRoomService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MeetingRoom('123');
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
        const entity = new MeetingRoom();
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
