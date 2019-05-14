import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Participant } from 'app/shared/model/meeting/participant.model';
import { ParticipantService } from './participant.service';
import { ParticipantComponent } from './participant.component';
import { ParticipantDetailComponent } from './participant-detail.component';
import { ParticipantUpdateComponent } from './participant-update.component';
import { ParticipantDeletePopupComponent } from './participant-delete-dialog.component';
import { IParticipant } from 'app/shared/model/meeting/participant.model';

@Injectable({ providedIn: 'root' })
export class ParticipantResolve implements Resolve<IParticipant> {
  constructor(private service: ParticipantService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParticipant> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Participant>) => response.ok),
        map((participant: HttpResponse<Participant>) => participant.body)
      );
    }
    return of(new Participant());
  }
}

export const participantRoute: Routes = [
  {
    path: '',
    component: ParticipantComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'uiApp.meetingParticipant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParticipantDetailComponent,
    resolve: {
      participant: ParticipantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingParticipant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParticipantUpdateComponent,
    resolve: {
      participant: ParticipantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingParticipant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParticipantUpdateComponent,
    resolve: {
      participant: ParticipantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingParticipant.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const participantPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ParticipantDeletePopupComponent,
    resolve: {
      participant: ParticipantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'uiApp.meetingParticipant.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
