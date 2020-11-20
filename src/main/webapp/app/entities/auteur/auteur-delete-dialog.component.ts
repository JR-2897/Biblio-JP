import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAuteur } from 'app/shared/model/auteur.model';
import { AuteurService } from './auteur.service';

@Component({
  templateUrl: './auteur-delete-dialog.component.html',
})
export class AuteurDeleteDialogComponent {
  auteur?: IAuteur;

  constructor(protected auteurService: AuteurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.auteurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('auteurListModification');
      this.activeModal.close();
    });
  }
}
