import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmprunt } from 'app/shared/model/emprunt.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EmpruntService } from './emprunt.service';
import { EmpruntDeleteDialogComponent } from './emprunt-delete-dialog.component';

@Component({
  selector: 'jhi-emprunt',
  templateUrl: './emprunt.component.html',
})
export class EmpruntComponent implements OnInit, OnDestroy {
  emprunts: IEmprunt[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected empruntService: EmpruntService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.emprunts = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.empruntService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IEmprunt[]>) => this.paginateEmprunts(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.emprunts = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('empruntListModification', () => this.reset());
  }

  delete(emprunt: IEmprunt): void {
    const modalRef = this.modalService.open(EmpruntDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.emprunt = emprunt;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateEmprunts(data: IEmprunt[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.emprunts.push(data[i]);
      }
    }
  }
}
