import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurDeleteDialogComponent } from './utilisateur-delete-dialog.component';

@Component({
  selector: 'jhi-utilisateur',
  templateUrl: './utilisateur.component.html',
})
export class UtilisateurComponent implements OnInit, OnDestroy {
  utilisateurs: IUtilisateur[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected utilisateurService: UtilisateurService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.utilisateurs = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.utilisateurService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IUtilisateur[]>) => this.paginateUtilisateurs(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.utilisateurs = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUtilisateurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUtilisateur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUtilisateurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('utilisateurListModification', () => this.reset());
  }

  delete(utilisateur: IUtilisateur): void {
    const modalRef = this.modalService.open(UtilisateurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.utilisateur = utilisateur;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateUtilisateurs(data: IUtilisateur[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.utilisateurs.push(data[i]);
      }
    }
  }
}
