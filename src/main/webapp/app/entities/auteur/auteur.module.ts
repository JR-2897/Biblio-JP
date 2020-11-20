import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BiblioJpSharedModule } from 'app/shared/shared.module';
import { AuteurComponent } from './auteur.component';
import { AuteurDetailComponent } from './auteur-detail.component';
import { AuteurUpdateComponent } from './auteur-update.component';
import { AuteurDeleteDialogComponent } from './auteur-delete-dialog.component';
import { auteurRoute } from './auteur.route';

@NgModule({
  imports: [BiblioJpSharedModule, RouterModule.forChild(auteurRoute)],
  declarations: [AuteurComponent, AuteurDetailComponent, AuteurUpdateComponent, AuteurDeleteDialogComponent],
  entryComponents: [AuteurDeleteDialogComponent],
})
export class BiblioJpAuteurModule {}
