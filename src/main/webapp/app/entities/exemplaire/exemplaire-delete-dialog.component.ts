import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExemplaire } from 'app/shared/model/exemplaire.model';
import { ExemplaireService } from './exemplaire.service';

@Component({
  templateUrl: './exemplaire-delete-dialog.component.html',
})
export class ExemplaireDeleteDialogComponent {
  exemplaire?: IExemplaire;

  constructor(
    protected exemplaireService: ExemplaireService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.exemplaireService.delete(id).subscribe(() => {
      this.eventManager.broadcast('exemplaireListModification');
      this.activeModal.close();
    });
  }
}
