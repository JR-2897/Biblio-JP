import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmplacement } from 'app/shared/model/emplacement.model';
import { EmplacementService } from './emplacement.service';
import { EmplacementDeleteDialogComponent } from './emplacement-delete-dialog.component';

@Component({
  selector: 'jhi-emplacement',
  templateUrl: './emplacement.component.html',
})
export class EmplacementComponent implements OnInit, OnDestroy {
  emplacements?: IEmplacement[];
  eventSubscriber?: Subscription;

  constructor(
    protected emplacementService: EmplacementService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.emplacementService.query().subscribe((res: HttpResponse<IEmplacement[]>) => (this.emplacements = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEmplacements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEmplacement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEmplacements(): void {
    this.eventSubscriber = this.eventManager.subscribe('emplacementListModification', () => this.loadAll());
  }

  delete(emplacement: IEmplacement): void {
    const modalRef = this.modalService.open(EmplacementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.emplacement = emplacement;
  }
}
