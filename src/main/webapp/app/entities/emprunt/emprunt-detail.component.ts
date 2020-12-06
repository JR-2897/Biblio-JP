import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmprunt } from 'app/shared/model/emprunt.model';

@Component({
  selector: 'jhi-emprunt-detail',
  templateUrl: './emprunt-detail.component.html',
})
export class EmpruntDetailComponent implements OnInit {
  emprunt: IEmprunt | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ emprunt }) => (this.emprunt = emprunt));
  }

  previousState(): void {
    window.history.back();
  }
}
