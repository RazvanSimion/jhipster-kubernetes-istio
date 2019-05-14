import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Meeting } from 'app/shared/model/meeting/meeting.model';
import { MeetingService } from './meeting.service';
import { MeetingComponent } from './meeting.component';
import { MeetingDetailComponent } from './meeting-detail.component';
import { MeetingUpdateComponent } from './meeting-update.component';
import { MeetingDeletePopupComponent } from './meeting-delete-dialog.component';
import { IMeeting } from 'app/shared/model/meeting/meeting.model';

@Injectable({ providedIn: 'root' })
export class MeetingResolve implements Resolve<IMeeting> {
  constructor(private service: MeetingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMeeting> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Meeting>) => response.ok),
        map((meeting: HttpResponse<Meeting>) => meeting.body)
      );
    }
    return of(new Meeting());
  }
}

export const meetingRoute: Routes = [
  {
    path: '',
    component: MeetingComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'uiApp.meetingMeeting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MeetingDetailComponent,
    resolve: {
      meeting: MeetingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingMeeting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MeetingUpdateComponent,
    resolve: {
      meeting: MeetingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingMeeting.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MeetingUpdateComponent,
    resolve: {
      meeting: MeetingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingMeeting.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const meetingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MeetingDeletePopupComponent,
    resolve: {
      meeting: MeetingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingMeeting.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
