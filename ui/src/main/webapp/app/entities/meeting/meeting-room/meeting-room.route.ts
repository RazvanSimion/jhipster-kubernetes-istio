import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MeetingRoom } from 'app/shared/model/meeting/meeting-room.model';
import { MeetingRoomService } from './meeting-room.service';
import { MeetingRoomComponent } from './meeting-room.component';
import { MeetingRoomDetailComponent } from './meeting-room-detail.component';
import { MeetingRoomUpdateComponent } from './meeting-room-update.component';
import { MeetingRoomDeletePopupComponent } from './meeting-room-delete-dialog.component';
import { IMeetingRoom } from 'app/shared/model/meeting/meeting-room.model';

@Injectable({ providedIn: 'root' })
export class MeetingRoomResolve implements Resolve<IMeetingRoom> {
  constructor(private service: MeetingRoomService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMeetingRoom> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MeetingRoom>) => response.ok),
        map((meetingRoom: HttpResponse<MeetingRoom>) => meetingRoom.body)
      );
    }
    return of(new MeetingRoom());
  }
}

export const meetingRoomRoute: Routes = [
  {
    path: '',
    component: MeetingRoomComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'uiApp.meetingMeetingRoom.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MeetingRoomDetailComponent,
    resolve: {
      meetingRoom: MeetingRoomResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingMeetingRoom.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MeetingRoomUpdateComponent,
    resolve: {
      meetingRoom: MeetingRoomResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingMeetingRoom.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MeetingRoomUpdateComponent,
    resolve: {
      meetingRoom: MeetingRoomResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingMeetingRoom.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const meetingRoomPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MeetingRoomDeletePopupComponent,
    resolve: {
      meetingRoom: MeetingRoomResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingMeetingRoom.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
