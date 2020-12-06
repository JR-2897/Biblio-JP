import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExemplaire, Exemplaire } from 'app/shared/model/exemplaire.model';
import { ExemplaireService } from './exemplaire.service';
import { ILivre } from 'app/shared/model/livre.model';
import { LivreService } from 'app/entities/livre/livre.service';

@Component({
  selector: 'jhi-exemplaire-update',
  templateUrl: './exemplaire-update.component.html',
})
export class ExemplaireUpdateComponent implements OnInit {
  isSaving = false;
  livres: ILivre[] = [];

  editForm = this.fb.group({
    id: [],
    disponibilite: [],
    livre: [],
  });

  constructor(
    protected exemplaireService: ExemplaireService,
    protected livreService: LivreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exemplaire }) => {
      this.updateForm(exemplaire);

      this.livreService.query().subscribe((res: HttpResponse<ILivre[]>) => (this.livres = res.body || []));
    });
  }

  updateForm(exemplaire: IExemplaire): void {
    this.editForm.patchValue({
      id: exemplaire.id,
      disponibilite: exemplaire.disponibilite,
      livre: exemplaire.livre,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exemplaire = this.createFromForm();
    if (exemplaire.id !== undefined) {
      this.subscribeToSaveResponse(this.exemplaireService.update(exemplaire));
    } else {
      this.subscribeToSaveResponse(this.exemplaireService.create(exemplaire));
    }
  }

  private createFromForm(): IExemplaire {
    return {
      ...new Exemplaire(),
      id: this.editForm.get(['id'])!.value,
      disponibilite: this.editForm.get(['disponibilite'])!.value,
      livre: this.editForm.get(['livre'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExemplaire>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ILivre): any {
    return item.id;
  }
}
