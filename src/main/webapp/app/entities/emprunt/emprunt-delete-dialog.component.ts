import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmprunt } from 'app/shared/model/emprunt.model';
import { EmpruntService } from './emprunt.service';

@Component({
  templateUrl: './emprunt-delete-dialog.component.html',
})
export class EmpruntDeleteDialogComponent {
  emprunt?: IEmprunt;

  constructor(protected empruntService: EmpruntService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.empruntService.delete(id).subscribe(() => {
      this.eventManager.broadcast('empruntListModification');
      this.activeModal.close();
    });
  }
}
