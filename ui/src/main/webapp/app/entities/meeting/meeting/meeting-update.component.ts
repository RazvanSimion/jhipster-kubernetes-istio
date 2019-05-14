import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IMeeting, Meeting } from 'app/shared/model/meeting/meeting.model';
import { MeetingService } from './meeting.service';
import { IMeetingRoom } from 'app/shared/model/meeting/meeting-room.model';
import { MeetingRoomService } from 'app/entities/meeting/meeting-room';
import { IParticipant } from 'app/shared/model/meeting/participant.model';
import { ParticipantService } from 'app/entities/meeting/participant';

@Component({
  selector: 'jhi-meeting-update',
  templateUrl: './meeting-update.component.html'
})
export class MeetingUpdateComponent implements OnInit {
  meeting: IMeeting;
  isSaving: boolean;

  meetingrooms: IMeetingRoom[];

  participants: IParticipant[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    meetingRoom: [null, Validators.required],
    participants: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected meetingService: MeetingService,
    protected meetingRoomService: MeetingRoomService,
    protected participantService: ParticipantService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ meeting }) => {
      this.updateForm(meeting);
      this.meeting = meeting;
    });
    this.meetingRoomService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMeetingRoom[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMeetingRoom[]>) => response.body)
      )
      .subscribe((res: IMeetingRoom[]) => (this.meetingrooms = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.participantService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IParticipant[]>) => mayBeOk.ok),
        map((response: HttpResponse<IParticipant[]>) => response.body)
      )
      .subscribe((res: IParticipant[]) => (this.participants = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(meeting: IMeeting) {
    this.editForm.patchValue({
      id: meeting.id,
      title: meeting.title,
      description: meeting.description,
      startDate: meeting.startDate != null ? meeting.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: meeting.endDate != null ? meeting.endDate.format(DATE_TIME_FORMAT) : null,
      meetingRoom: meeting.meetingRoom,
      participants: meeting.participants
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const meeting = this.createFromForm();
    if (meeting.id !== undefined) {
      this.subscribeToSaveResponse(this.meetingService.update(meeting));
    } else {
      this.subscribeToSaveResponse(this.meetingService.create(meeting));
    }
  }

  private createFromForm(): IMeeting {
    const entity = {
      ...new Meeting(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      startDate:
        this.editForm.get(['startDate']).value != null ? moment(this.editForm.get(['startDate']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value != null ? moment(this.editForm.get(['endDate']).value, DATE_TIME_FORMAT) : undefined,
      meetingRoom: this.editForm.get(['meetingRoom']).value,
      participants: this.editForm.get(['participants']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeeting>>) {
    result.subscribe((res: HttpResponse<IMeeting>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackMeetingRoomById(index: number, item: IMeetingRoom) {
    return item.id;
  }

  trackParticipantById(index: number, item: IParticipant) {
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
