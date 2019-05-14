import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMeetingRoom, MeetingRoom } from 'app/shared/model/meeting/meeting-room.model';
import { MeetingRoomService } from './meeting-room.service';

@Component({
  selector: 'jhi-meeting-room-update',
  templateUrl: './meeting-room-update.component.html'
})
export class MeetingRoomUpdateComponent implements OnInit {
  meetingRoom: IMeetingRoom;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    location: [null, [Validators.required]],
    name: [null, [Validators.required]]
  });

  constructor(protected meetingRoomService: MeetingRoomService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ meetingRoom }) => {
      this.updateForm(meetingRoom);
      this.meetingRoom = meetingRoom;
    });
  }

  updateForm(meetingRoom: IMeetingRoom) {
    this.editForm.patchValue({
      id: meetingRoom.id,
      code: meetingRoom.code,
      location: meetingRoom.location,
      name: meetingRoom.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const meetingRoom = this.createFromForm();
    if (meetingRoom.id !== undefined) {
      this.subscribeToSaveResponse(this.meetingRoomService.update(meetingRoom));
    } else {
      this.subscribeToSaveResponse(this.meetingRoomService.create(meetingRoom));
    }
  }

  private createFromForm(): IMeetingRoom {
    const entity = {
      ...new MeetingRoom(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      location: this.editForm.get(['location']).value,
      name: this.editForm.get(['name']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeetingRoom>>) {
    result.subscribe((res: HttpResponse<IMeetingRoom>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
