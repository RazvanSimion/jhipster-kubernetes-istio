import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IParticipant, Participant } from 'app/shared/model/meeting/participant.model';
import { ParticipantService } from './participant.service';
import { IMeeting } from 'app/shared/model/meeting/meeting.model';
import { MeetingService } from 'app/entities/meeting/meeting';

@Component({
  selector: 'jhi-participant-update',
  templateUrl: './participant-update.component.html'
})
export class ParticipantUpdateComponent implements OnInit {
  participant: IParticipant;
  isSaving: boolean;

  meetings: IMeeting[];

  editForm = this.fb.group({
    id: [],
    email: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected participantService: ParticipantService,
    protected meetingService: MeetingService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ participant }) => {
      this.updateForm(participant);
      this.participant = participant;
    });
    this.meetingService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMeeting[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMeeting[]>) => response.body)
      )
      .subscribe((res: IMeeting[]) => (this.meetings = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(participant: IParticipant) {
    this.editForm.patchValue({
      id: participant.id,
      email: participant.email
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const participant = this.createFromForm();
    if (participant.id !== undefined) {
      this.subscribeToSaveResponse(this.participantService.update(participant));
    } else {
      this.subscribeToSaveResponse(this.participantService.create(participant));
    }
  }

  private createFromForm(): IParticipant {
    const entity = {
      ...new Participant(),
      id: this.editForm.get(['id']).value,
      email: this.editForm.get(['email']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParticipant>>) {
    result.subscribe((res: HttpResponse<IParticipant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMeetingById(index: number, item: IMeeting) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
