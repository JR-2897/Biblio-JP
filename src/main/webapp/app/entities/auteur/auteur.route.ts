import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAuteur, Auteur } from 'app/shared/model/auteur.model';
import { AuteurService } from './auteur.service';
import { AuteurComponent } from './auteur.component';
import { AuteurDetailComponent } from './auteur-detail.component';
import { AuteurUpdateComponent } from './auteur-update.component';

@Injectable({ providedIn: 'root' })
export class AuteurResolve implements Resolve<IAuteur> {
  constructor(private service: AuteurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAuteur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((auteur: HttpResponse<Auteur>) => {
          if (auteur.body) {
            return of(auteur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Auteur());
  }
}

export const auteurRoute: Routes = [
  {
    path: '',
    component: AuteurComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.auteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AuteurDetailComponent,
    resolve: {
      auteur: AuteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.auteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AuteurUpdateComponent,
    resolve: {
      auteur: AuteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.auteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AuteurUpdateComponent,
    resolve: {
      auteur: AuteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.auteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
