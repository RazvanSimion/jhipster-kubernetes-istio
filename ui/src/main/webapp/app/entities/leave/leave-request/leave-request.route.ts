import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LeaveRequest } from 'app/shared/model/leave/leave-request.model';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequestComponent } from './leave-request.component';
import { LeaveRequestDetailComponent } from './leave-request-detail.component';
import { LeaveRequestUpdateComponent } from './leave-request-update.component';
import { LeaveRequestDeletePopupComponent } from './leave-request-delete-dialog.component';
import { ILeaveRequest } from 'app/shared/model/leave/leave-request.model';

@Injectable({ providedIn: 'root' })
export class LeaveRequestResolve implements Resolve<ILeaveRequest> {
  constructor(private service: LeaveRequestService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILeaveRequest> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LeaveRequest>) => response.ok),
        map((leaveRequest: HttpResponse<LeaveRequest>) => leaveRequest.body)
      );
    }
    return of(new LeaveRequest());
  }
}

export const leaveRequestRoute: Routes = [
  {
    path: '',
    component: LeaveRequestComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'uiApp.leaveLeaveRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LeaveRequestDetailComponent,
    resolve: {
      leaveRequest: LeaveRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.leaveLeaveRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LeaveRequestUpdateComponent,
    resolve: {
      leaveRequest: LeaveRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.leaveLeaveRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LeaveRequestUpdateComponent,
    resolve: {
      leaveRequest: LeaveRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.leaveLeaveRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const leaveRequestPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LeaveRequestDeletePopupComponent,
    resolve: {
      leaveRequest: LeaveRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.leaveLeaveRequest.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
