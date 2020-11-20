import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUtilisateur, Utilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurComponent } from './utilisateur.component';
import { UtilisateurDetailComponent } from './utilisateur-detail.component';
import { UtilisateurUpdateComponent } from './utilisateur-update.component';

@Injectable({ providedIn: 'root' })
export class UtilisateurResolve implements Resolve<IUtilisateur> {
  constructor(private service: UtilisateurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUtilisateur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((utilisateur: HttpResponse<Utilisateur>) => {
          if (utilisateur.body) {
            return of(utilisateur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Utilisateur());
  }
}

export const utilisateurRoute: Routes = [
  {
    path: '',
    component: UtilisateurComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.utilisateur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UtilisateurDetailComponent,
    resolve: {
      utilisateur: UtilisateurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.utilisateur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UtilisateurUpdateComponent,
    resolve: {
      utilisateur: UtilisateurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.utilisateur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UtilisateurUpdateComponent,
    resolve: {
      utilisateur: UtilisateurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.utilisateur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
