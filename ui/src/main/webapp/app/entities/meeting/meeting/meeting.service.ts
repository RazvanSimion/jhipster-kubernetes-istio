import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeeting } from 'app/shared/model/meeting/meeting.model';

type EntityResponseType = HttpResponse<IMeeting>;
type EntityArrayResponseType = HttpResponse<IMeeting[]>;

@Injectable({ providedIn: 'root' })
export class MeetingService {
  public resourceUrl = SERVER_API_URL + 'services/meeting/api/meetings';

  constructor(protected http: HttpClient) {}

  create(meeting: IMeeting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(meeting);
    return this.http
      .post<IMeeting>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(meeting: IMeeting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(meeting);
    return this.http
      .put<IMeeting>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IMeeting>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMeeting[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(meeting: IMeeting): IMeeting {
    const copy: IMeeting = Object.assign({}, meeting, {
      startDate: meeting.startDate != null && meeting.startDate.isValid() ? meeting.startDate.toJSON() : null,
      endDate: meeting.endDate != null && meeting.endDate.isValid() ? meeting.endDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((meeting: IMeeting) => {
        meeting.startDate = meeting.startDate != null ? moment(meeting.startDate) : null;
        meeting.endDate = meeting.endDate != null ? moment(meeting.endDate) : null;
      });
    }
    return res;
  }
}
