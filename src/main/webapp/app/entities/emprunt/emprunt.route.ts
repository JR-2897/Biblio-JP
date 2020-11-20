import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmprunt, Emprunt } from 'app/shared/model/emprunt.model';
import { EmpruntService } from './emprunt.service';
import { EmpruntComponent } from './emprunt.component';
import { EmpruntDetailComponent } from './emprunt-detail.component';
import { EmpruntUpdateComponent } from './emprunt-update.component';

@Injectable({ providedIn: 'root' })
export class EmpruntResolve implements Resolve<IEmprunt> {
  constructor(private service: EmpruntService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmprunt> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((emprunt: HttpResponse<Emprunt>) => {
          if (emprunt.body) {
            return of(emprunt.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Emprunt());
  }
}

export const empruntRoute: Routes = [
  {
    path: '',
    component: EmpruntComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.emprunt.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmpruntDetailComponent,
    resolve: {
      emprunt: EmpruntResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.emprunt.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmpruntUpdateComponent,
    resolve: {
      emprunt: EmpruntResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.emprunt.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmpruntUpdateComponent,
    resolve: {
      emprunt: EmpruntResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.emprunt.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
