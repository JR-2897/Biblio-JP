import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITheme } from 'app/shared/model/theme.model';
import { ThemeService } from './theme.service';
import { ThemeDeleteDialogComponent } from './theme-delete-dialog.component';

@Component({
  selector: 'jhi-theme',
  templateUrl: './theme.component.html',
})
export class ThemeComponent implements OnInit, OnDestroy {
  themes?: ITheme[];
  eventSubscriber?: Subscription;

  constructor(protected themeService: ThemeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.themeService.query().subscribe((res: HttpResponse<ITheme[]>) => (this.themes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInThemes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITheme): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInThemes(): void {
    this.eventSubscriber = this.eventManager.subscribe('themeListModification', () => this.loadAll());
  }

  delete(theme: ITheme): void {
    const modalRef = this.modalService.open(ThemeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.theme = theme;
  }
}
