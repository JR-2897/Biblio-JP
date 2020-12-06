import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITheme, Theme } from 'app/shared/model/theme.model';
import { ThemeService } from './theme.service';
import { ThemeComponent } from './theme.component';
import { ThemeDetailComponent } from './theme-detail.component';
import { ThemeUpdateComponent } from './theme-update.component';

@Injectable({ providedIn: 'root' })
export class ThemeResolve implements Resolve<ITheme> {
  constructor(private service: ThemeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITheme> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((theme: HttpResponse<Theme>) => {
          if (theme.body) {
            return of(theme.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Theme());
  }
}

export const themeRoute: Routes = [
  {
    path: '',
    component: ThemeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.theme.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ThemeDetailComponent,
    resolve: {
      theme: ThemeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.theme.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ThemeUpdateComponent,
    resolve: {
      theme: ThemeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.theme.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ThemeUpdateComponent,
    resolve: {
      theme: ThemeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'biblioJpApp.theme.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
