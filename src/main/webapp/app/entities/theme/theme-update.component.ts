import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITheme, Theme } from 'app/shared/model/theme.model';
import { ThemeService } from './theme.service';

@Component({
  selector: 'jhi-theme-update',
  templateUrl: './theme-update.component.html',
})
export class ThemeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    theme: [],
  });

  constructor(protected themeService: ThemeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ theme }) => {
      this.updateForm(theme);
    });
  }

  updateForm(theme: ITheme): void {
    this.editForm.patchValue({
      id: theme.id,
      theme: theme.theme,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const theme = this.createFromForm();
    if (theme.id !== undefined) {
      this.subscribeToSaveResponse(this.themeService.update(theme));
    } else {
      this.subscribeToSaveResponse(this.themeService.create(theme));
    }
  }

  private createFromForm(): ITheme {
    return {
      ...new Theme(),
      id: this.editForm.get(['id'])!.value,
      theme: this.editForm.get(['theme'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITheme>>): void {
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
