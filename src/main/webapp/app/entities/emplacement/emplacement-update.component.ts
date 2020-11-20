import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmplacement, Emplacement } from 'app/shared/model/emplacement.model';
import { EmplacementService } from './emplacement.service';

@Component({
  selector: 'jhi-emplacement-update',
  templateUrl: './emplacement-update.component.html',
})
export class EmplacementUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nomEmplacement: [],
  });

  constructor(protected emplacementService: EmplacementService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ emplacement }) => {
      this.updateForm(emplacement);
    });
  }

  updateForm(emplacement: IEmplacement): void {
    this.editForm.patchValue({
      id: emplacement.id,
      nomEmplacement: emplacement.nomEmplacement,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const emplacement = this.createFromForm();
    if (emplacement.id !== undefined) {
      this.subscribeToSaveResponse(this.emplacementService.update(emplacement));
    } else {
      this.subscribeToSaveResponse(this.emplacementService.create(emplacement));
    }
  }

  private createFromForm(): IEmplacement {
    return {
      ...new Emplacement(),
      id: this.editForm.get(['id'])!.value,
      nomEmplacement: this.editForm.get(['nomEmplacement'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmplacement>>): void {
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
}
