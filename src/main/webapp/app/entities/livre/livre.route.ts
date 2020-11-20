import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILivre, Livre } from 'app/shared/model/livre.model';
import { LivreService } from './livre.service';
import { LivreComponent } from './livre.component';
import { LivreDetailComponent } from './livre-detail.component';
import { LivreUpdateComponent } from './livre-update.component';

@Injectable({ providedIn: 'root' })
export class LivreResolve implements Resolve<ILivre> {
  constructor(private service: LivreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILivre> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((livre: HttpResponse<Livre>) => {
          if (livre.body) {
            return of(livre.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Livre());
  }
}

export const livreRoute: Routes = [
  {
    path: '',
    component: LivreComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'biblioJpApp.livre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LivreDetailComponent,
    resolve: {
      livre: LivreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.livre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LivreUpdateComponent,
    resolve: {
      livre: LivreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.livre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LivreUpdateComponent,
    resolve: {
      livre: LivreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.livre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
