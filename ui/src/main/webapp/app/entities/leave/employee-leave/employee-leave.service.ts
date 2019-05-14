import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployeeLeave } from 'app/shared/model/leave/employee-leave.model';

type EntityResponseType = HttpResponse<IEmployeeLeave>;
type EntityArrayResponseType = HttpResponse<IEmployeeLeave[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeLeaveService {
  public resourceUrl = SERVER_API_URL + 'services/leave/api/employee-leaves';

  constructor(protected http: HttpClient) {}

  create(employeeLeave: IEmployeeLeave): Observable<EntityResponseType> {
    return this.http.post<IEmployeeLeave>(this.resourceUrl, employeeLeave, { observe: 'response' });
  }

  update(employeeLeave: IEmployeeLeave): Observable<EntityResponseType> {
    return this.http.put<IEmployeeLeave>(this.resourceUrl, employeeLeave, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEmployeeLeave>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployeeLeave[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
