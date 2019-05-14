import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILeaveRequest } from 'app/shared/model/leave/leave-request.model';

type EntityResponseType = HttpResponse<ILeaveRequest>;
type EntityArrayResponseType = HttpResponse<ILeaveRequest[]>;

@Injectable({ providedIn: 'root' })
export class LeaveRequestService {
  public resourceUrl = SERVER_API_URL + 'services/leave/api/leave-requests';

  constructor(protected http: HttpClient) {}

  create(leaveRequest: ILeaveRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaveRequest);
    return this.http
      .post<ILeaveRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(leaveRequest: ILeaveRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(leaveRequest);
    return this.http
      .put<ILeaveRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ILeaveRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILeaveRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(leaveRequest: ILeaveRequest): ILeaveRequest {
    const copy: ILeaveRequest = Object.assign({}, leaveRequest, {
      startDate: leaveRequest.startDate != null && leaveRequest.startDate.isValid() ? leaveRequest.startDate.toJSON() : null,
      endDate: leaveRequest.endDate != null && leaveRequest.endDate.isValid() ? leaveRequest.endDate.toJSON() : null,
      creationDate: leaveRequest.creationDate != null && leaveRequest.creationDate.isValid() ? leaveRequest.creationDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
      res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((leaveRequest: ILeaveRequest) => {
        leaveRequest.startDate = leaveRequest.startDate != null ? moment(leaveRequest.startDate) : null;
        leaveRequest.endDate = leaveRequest.endDate != null ? moment(leaveRequest.endDate) : null;
        leaveRequest.creationDate = leaveRequest.creationDate != null ? moment(leaveRequest.creationDate) : null;
      });
    }
    return res;
  }
}
