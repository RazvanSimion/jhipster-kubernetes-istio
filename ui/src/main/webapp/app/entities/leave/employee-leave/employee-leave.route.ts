import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeLeave } from 'app/shared/model/leave/employee-leave.model';
import { EmployeeLeaveService } from './employee-leave.service';
import { EmployeeLeaveComponent } from './employee-leave.component';
import { EmployeeLeaveDetailComponent } from './employee-leave-detail.component';
import { EmployeeLeaveUpdateComponent } from './employee-leave-update.component';
import { EmployeeLeaveDeletePopupComponent } from './employee-leave-delete-dialog.component';
import { IEmployeeLeave } from 'app/shared/model/leave/employee-leave.model';

@Injectable({ providedIn: 'root' })
export class EmployeeLeaveResolve implements Resolve<IEmployeeLeave> {
  constructor(private service: EmployeeLeaveService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployeeLeave> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EmployeeLeave>) => response.ok),
        map((employeeLeave: HttpResponse<EmployeeLeave>) => employeeLeave.body)
      );
    }
    return of(new EmployeeLeave());
  }
}

export const employeeLeaveRoute: Routes = [
  {
    path: '',
    component: EmployeeLeaveComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'uiApp.leaveEmployeeLeave.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeeLeaveDetailComponent,
    resolve: {
      employeeLeave: EmployeeLeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.leaveEmployeeLeave.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeeLeaveUpdateComponent,
    resolve: {
      employeeLeave: EmployeeLeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.leaveEmployeeLeave.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeeLeaveUpdateComponent,
    resolve: {
      employeeLeave: EmployeeLeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.leaveEmployeeLeave.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const employeeLeavePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EmployeeLeaveDeletePopupComponent,
    resolve: {
      employeeLeave: EmployeeLeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.leaveEmployeeLeave.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
