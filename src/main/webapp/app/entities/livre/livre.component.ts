import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILivre } from 'app/shared/model/livre.model';
import { LivreService } from './livre.service';
import { LivreDeleteDialogComponent } from './livre-delete-dialog.component';

@Component({
  selector: 'jhi-livre',
  templateUrl: './livre.component.html',
})
export class LivreComponent implements OnInit, OnDestroy {
  livres?: ILivre[];
  eventSubscriber?: Subscription;

  constructor(
    protected livreService: LivreService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.livreService.query().subscribe((res: HttpResponse<ILivre[]>) => (this.livres = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLivres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILivre): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInLivres(): void {
    this.eventSubscriber = this.eventManager.subscribe('livreListModification', () => this.loadAll());
  }

  delete(livre: ILivre): void {
    const modalRef = this.modalService.open(LivreDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.livre = livre;
  }
}
