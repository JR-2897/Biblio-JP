import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExemplaire, Exemplaire } from 'app/shared/model/exemplaire.model';
import { ExemplaireService } from './exemplaire.service';
import { ExemplaireComponent } from './exemplaire.component';
import { ExemplaireDetailComponent } from './exemplaire-detail.component';
import { ExemplaireUpdateComponent } from './exemplaire-update.component';

@Injectable({ providedIn: 'root' })
export class ExemplaireResolve implements Resolve<IExemplaire> {
  constructor(private service: ExemplaireService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExemplaire> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((exemplaire: HttpResponse<Exemplaire>) => {
          if (exemplaire.body) {
            return of(exemplaire.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Exemplaire());
  }
}

export const exemplaireRoute: Routes = [
  {
    path: '',
    component: ExemplaireComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.exemplaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExemplaireDetailComponent,
    resolve: {
      exemplaire: ExemplaireResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.exemplaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExemplaireUpdateComponent,
    resolve: {
      exemplaire: ExemplaireResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.exemplaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExemplaireUpdateComponent,
    resolve: {
      exemplaire: ExemplaireResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.exemplaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
