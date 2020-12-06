import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'theme',
        loadChildren: () => import('./theme/theme.module').then(m => m.BiblioJpThemeModule),
      },
      {
        path: 'emplacement',
        loadChildren: () => import('./emplacement/emplacement.module').then(m => m.BiblioJpEmplacementModule),
      },
      {
        path: 'auteur',
        loadChildren: () => import('./auteur/auteur.module').then(m => m.BiblioJpAuteurModule),
      },
      {
        path: 'livre',
        loadChildren: () => import('./livre/livre.module').then(m => m.BiblioJpLivreModule),
      },
      {
        path: 'exemplaire',
        loadChildren: () => import('./exemplaire/exemplaire.module').then(m => m.BiblioJpExemplaireModule),
      },
      {
        path: 'emprunt',
        loadChildren: () => import('./emprunt/emprunt.module').then(m => m.BiblioJpEmpruntModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class BiblioJpEntityModule {}
