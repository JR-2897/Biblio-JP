import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILivre } from 'app/shared/model/livre.model';
import { LivreService } from './livre.service';

@Component({
  templateUrl: './livre-delete-dialog.component.html',
})
export class LivreDeleteDialogComponent {
  livre?: ILivre;

  constructor(protected livreService: LivreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.livreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('livreListModification');
      this.activeModal.close();
    });
  }
}
