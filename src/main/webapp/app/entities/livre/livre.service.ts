import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILivre } from 'app/shared/model/livre.model';

type EntityResponseType = HttpResponse<ILivre>;
type EntityArrayResponseType = HttpResponse<ILivre[]>;

@Injectable({ providedIn: 'root' })
export class LivreService {
  public resourceUrl = SERVER_API_URL + 'api/livres';

  constructor(protected http: HttpClient) {}

  create(livre: ILivre): Observable<EntityResponseType> {
    return this.http.post<ILivre>(this.resourceUrl, livre, { observe: 'response' });
  }

  update(livre: ILivre): Observable<EntityResponseType> {
    return this.http.put<ILivre>(this.resourceUrl, livre, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILivre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILivre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
