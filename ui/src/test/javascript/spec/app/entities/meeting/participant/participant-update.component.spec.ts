/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { UiTestModule } from '../../../../test.module';
import { ParticipantUpdateComponent } from 'app/entities/meeting/participant/participant-update.component';
import { ParticipantService } from 'app/entities/meeting/participant/participant.service';
import { Participant } from 'app/shared/model/meeting/participant.model';

describe('Component Tests', () => {
  describe('Participant Management Update Component', () => {
    let comp: ParticipantUpdateComponent;
    let fixture: ComponentFixture<ParticipantUpdateComponent>;
    let service: ParticipantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UiTestModule],
        declarations: [ParticipantUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ParticipantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParticipantUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParticipantService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Participant('123');
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
        const entity = new Participant();
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
