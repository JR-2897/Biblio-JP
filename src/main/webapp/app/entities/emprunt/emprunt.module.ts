import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BiblioJpSharedModule } from 'app/shared/shared.module';
import { EmpruntComponent } from './emprunt.component';
import { EmpruntDetailComponent } from './emprunt-detail.component';
import { EmpruntUpdateComponent } from './emprunt-update.component';
import { EmpruntDeleteDialogComponent } from './emprunt-delete-dialog.component';
import { empruntRoute } from './emprunt.route';

@NgModule({
  imports: [BiblioJpSharedModule, RouterModule.forChild(empruntRoute)],
  declarations: [EmpruntComponent, EmpruntDetailComponent, EmpruntUpdateComponent, EmpruntDeleteDialogComponent],
  entryComponents: [EmpruntDeleteDialogComponent],
})
export class BiblioJpEmpruntModule {}
