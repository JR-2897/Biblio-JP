import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAuteur } from 'app/shared/model/auteur.model';

@Component({
  selector: 'jhi-auteur-detail',
  templateUrl: './auteur-detail.component.html',
})
export class AuteurDetailComponent implements OnInit {
  auteur: IAuteur | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ auteur }) => (this.auteur = auteur));
  }

  previousState(): void {
    window.history.back();
  }
}
