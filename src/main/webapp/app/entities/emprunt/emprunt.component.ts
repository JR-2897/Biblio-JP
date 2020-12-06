import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmprunt } from 'app/shared/model/emprunt.model';
import { EmpruntService } from './emprunt.service';
import { EmpruntDeleteDialogComponent } from './emprunt-delete-dialog.component';

@Component({
  selector: 'jhi-emprunt',
  templateUrl: './emprunt.component.html',
})
export class EmpruntComponent implements OnInit, OnDestroy {
  emprunts?: IEmprunt[];
  eventSubscriber?: Subscription;

  constructor(protected empruntService: EmpruntService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.empruntService.query().subscribe((res: HttpResponse<IEmprunt[]>) => (this.emprunts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEmprunts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEmprunt): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEmprunts(): void {
    this.eventSubscriber = this.eventManager.subscribe('empruntListModification', () => this.loadAll());
  }

  delete(emprunt: IEmprunt): void {
    const modalRef = this.modalService.open(EmpruntDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.emprunt = emprunt;
  }
}
