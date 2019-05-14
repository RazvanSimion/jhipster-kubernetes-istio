import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMeetingRoom } from 'app/shared/model/meeting/meeting-room.model';

type EntityResponseType = HttpResponse<IMeetingRoom>;
type EntityArrayResponseType = HttpResponse<IMeetingRoom[]>;

@Injectable({ providedIn: 'root' })
export class MeetingRoomService {
  public resourceUrl = SERVER_API_URL + 'services/meeting/api/meeting-rooms';

  constructor(protected http: HttpClient) {}

  create(meetingRoom: IMeetingRoom): Observable<EntityResponseType> {
    return this.http.post<IMeetingRoom>(this.resourceUrl, meetingRoom, { observe: 'response' });
  }

  update(meetingRoom: IMeetingRoom): Observable<EntityResponseType> {
    return this.http.put<IMeetingRoom>(this.resourceUrl, meetingRoom, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IMeetingRoom>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMeetingRoom[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
