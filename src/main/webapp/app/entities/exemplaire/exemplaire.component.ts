import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExemplaire } from 'app/shared/model/exemplaire.model';
import { ExemplaireService } from './exemplaire.service';
import { ExemplaireDeleteDialogComponent } from './exemplaire-delete-dialog.component';

@Component({
  selector: 'jhi-exemplaire',
  templateUrl: './exemplaire.component.html',
})
export class ExemplaireComponent implements OnInit, OnDestroy {
  exemplaires?: IExemplaire[];
  eventSubscriber?: Subscription;

  constructor(protected exemplaireService: ExemplaireService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.exemplaireService.query().subscribe((res: HttpResponse<IExemplaire[]>) => (this.exemplaires = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExemplaires();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExemplaire): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExemplaires(): void {
    this.eventSubscriber = this.eventManager.subscribe('exemplaireListModification', () => this.loadAll());
  }

  delete(exemplaire: IExemplaire): void {
    const modalRef = this.modalService.open(ExemplaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exemplaire = exemplaire;
  }
}
