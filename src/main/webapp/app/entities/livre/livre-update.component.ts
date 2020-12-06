import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ILivre, Livre } from 'app/shared/model/livre.model';
import { LivreService } from './livre.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IAuteur } from 'app/shared/model/auteur.model';
import { AuteurService } from 'app/entities/auteur/auteur.service';
import { ITheme } from 'app/shared/model/theme.model';
import { ThemeService } from 'app/entities/theme/theme.service';
import { IEmplacement } from 'app/shared/model/emplacement.model';
import { EmplacementService } from 'app/entities/emplacement/emplacement.service';

type SelectableEntity = IAuteur | ITheme | IEmplacement;

@Component({
  selector: 'jhi-livre-update',
  templateUrl: './livre-update.component.html',
})
export class LivreUpdateComponent implements OnInit {
  isSaving = false;
  auteurs: IAuteur[] = [];
  themes: ITheme[] = [];
  emplacements: IEmplacement[] = [];

  editForm = this.fb.group({
    id: [],
    titre: [],
    description: [],
    isbn: [],
    code: [],
    auteurs: [],
    themes: [],
    emplacements: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected livreService: LivreService,
    protected auteurService: AuteurService,
    protected themeService: ThemeService,
    protected emplacementService: EmplacementService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ livre }) => {
      this.updateForm(livre);

      this.auteurService.query().subscribe((res: HttpResponse<IAuteur[]>) => (this.auteurs = res.body || []));

      this.themeService.query().subscribe((res: HttpResponse<ITheme[]>) => (this.themes = res.body || []));

      this.emplacementService.query().subscribe((res: HttpResponse<IEmplacement[]>) => (this.emplacements = res.body || []));
    });
  }

  updateForm(livre: ILivre): void {
    this.editForm.patchValue({
      id: livre.id,
      titre: livre.titre,
      description: livre.description,
      isbn: livre.isbn,
      code: livre.code,
      auteurs: livre.auteurs,
      themes: livre.themes,
      emplacements: livre.emplacements,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('biblioJpApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const livre = this.createFromForm();
    if (livre.id !== undefined) {
      this.subscribeToSaveResponse(this.livreService.update(livre));
    } else {
      this.subscribeToSaveResponse(this.livreService.create(livre));
    }
  }

  private createFromForm(): ILivre {
    return {
      ...new Livre(),
      id: this.editForm.get(['id'])!.value,
      titre: this.editForm.get(['titre'])!.value,
      description: this.editForm.get(['description'])!.value,
      isbn: this.editForm.get(['isbn'])!.value,
      code: this.editForm.get(['code'])!.value,
      auteurs: this.editForm.get(['auteurs'])!.value,
      themes: this.editForm.get(['themes'])!.value,
      emplacements: this.editForm.get(['emplacements'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILivre>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: SelectableEntity[], option: SelectableEntity): SelectableEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
