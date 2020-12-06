import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExemplaire } from 'app/shared/model/exemplaire.model';

@Component({
  selector: 'jhi-exemplaire-detail',
  templateUrl: './exemplaire-detail.component.html',
})
export class ExemplaireDetailComponent implements OnInit {
  exemplaire: IExemplaire | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exemplaire }) => (this.exemplaire = exemplaire));
  }

  previousState(): void {
    window.history.back();
  }
}
