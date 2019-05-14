/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { UiTestModule } from '../../../../test.module';
import { MeetingUpdateComponent } from 'app/entities/meeting/meeting/meeting-update.component';
import { MeetingService } from 'app/entities/meeting/meeting/meeting.service';
import { Meeting } from 'app/shared/model/meeting/meeting.model';

describe('Component Tests', () => {
  describe('Meeting Management Update Component', () => {
    let comp: MeetingUpdateComponent;
    let fixture: ComponentFixture<MeetingUpdateComponent>;
    let service: MeetingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [MeetingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MeetingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MeetingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeetingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Meeting('123');
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
        const entity = new Meeting();
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
