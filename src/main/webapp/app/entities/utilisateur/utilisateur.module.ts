import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BiblioJpSharedModule } from 'app/shared/shared.module';
import { UtilisateurComponent } from './utilisateur.component';
import { UtilisateurDetailComponent } from './utilisateur-detail.component';
import { UtilisateurUpdateComponent } from './utilisateur-update.component';
import { UtilisateurDeleteDialogComponent } from './utilisateur-delete-dialog.component';
import { utilisateurRoute } from './utilisateur.route';

@NgModule({
  imports: [BiblioJpSharedModule, RouterModule.forChild(utilisateurRoute)],
  declarations: [UtilisateurComponent, UtilisateurDetailComponent, UtilisateurUpdateComponent, UtilisateurDeleteDialogComponent],
  entryComponents: [UtilisateurDeleteDialogComponent],
})
export class BiblioJpUtilisateurModule {}
