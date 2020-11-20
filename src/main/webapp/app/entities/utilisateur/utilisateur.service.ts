import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

type EntityResponseType = HttpResponse<IUtilisateur>;
type EntityArrayResponseType = HttpResponse<IUtilisateur[]>;

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  public resourceUrl = SERVER_API_URL + 'api/utilisateurs';

  constructor(protected http: HttpClient) {}

  create(utilisateur: IUtilisateur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(utilisateur);
    return this.http
      .post<IUtilisateur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(utilisateur: IUtilisateur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(utilisateur);
    return this.http
      .put<IUtilisateur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUtilisateur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUtilisateur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(utilisateur: IUtilisateur): IUtilisateur {
    const copy: IUtilisateur = Object.assign({}, utilisateur, {
      dateNaissance: utilisateur.dateNaissance && utilisateur.dateNaissance.isValid() ? utilisateur.dateNaissance.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance ? moment(res.body.dateNaissance) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((utilisateur: IUtilisateur) => {
        utilisateur.dateNaissance = utilisateur.dateNaissance ? moment(utilisateur.dateNaissance) : undefined;
      });
    }
    return res;
  }
}
