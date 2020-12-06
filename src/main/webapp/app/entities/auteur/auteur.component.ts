import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAuteur } from 'app/shared/model/auteur.model';
import { AuteurService } from './auteur.service';
import { AuteurDeleteDialogComponent } from './auteur-delete-dialog.component';

@Component({
  selector: 'jhi-auteur',
  templateUrl: './auteur.component.html',
})
export class AuteurComponent implements OnInit, OnDestroy {
  auteurs?: IAuteur[];
  eventSubscriber?: Subscription;

  constructor(protected auteurService: AuteurService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.auteurService.query().subscribe((res: HttpResponse<IAuteur[]>) => (this.auteurs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAuteurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAuteur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAuteurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('auteurListModification', () => this.loadAll());
  }

  delete(auteur: IAuteur): void {
    const modalRef = this.modalService.open(AuteurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.auteur = auteur;
  }
}
