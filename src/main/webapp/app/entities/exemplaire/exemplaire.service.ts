import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExemplaire } from 'app/shared/model/exemplaire.model';

type EntityResponseType = HttpResponse<IExemplaire>;
type EntityArrayResponseType = HttpResponse<IExemplaire[]>;

@Injectable({ providedIn: 'root' })
export class ExemplaireService {
  public resourceUrl = SERVER_API_URL + 'api/exemplaires';

  constructor(protected http: HttpClient) {}

  create(exemplaire: IExemplaire): Observable<EntityResponseType> {
    return this.http.post<IExemplaire>(this.resourceUrl, exemplaire, { observe: 'response' });
  }

  update(exemplaire: IExemplaire): Observable<EntityResponseType> {
    return this.http.put<IExemplaire>(this.resourceUrl, exemplaire, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExemplaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExemplaire[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
