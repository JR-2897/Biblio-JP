import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Component({
  templateUrl: './utilisateur-delete-dialog.component.html',
})
export class UtilisateurDeleteDialogComponent {
  utilisateur?: IUtilisateur;

  constructor(
    protected utilisateurService: UtilisateurService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.utilisateurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('utilisateurListModification');
      this.activeModal.close();
    });
  }
}
