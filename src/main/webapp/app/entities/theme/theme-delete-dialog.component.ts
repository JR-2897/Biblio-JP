import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITheme } from 'app/shared/model/theme.model';
import { ThemeService } from './theme.service';

@Component({
  templateUrl: './theme-delete-dialog.component.html',
})
export class ThemeDeleteDialogComponent {
  theme?: ITheme;

  constructor(protected themeService: ThemeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.themeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('themeListModification');
      this.activeModal.close();
    });
  }
}
