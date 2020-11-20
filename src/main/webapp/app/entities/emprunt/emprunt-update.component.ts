import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEmprunt, Emprunt } from 'app/shared/model/emprunt.model';
import { EmpruntService } from './emprunt.service';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';
import { IExemplaire } from 'app/shared/model/exemplaire.model';
import { ExemplaireService } from 'app/entities/exemplaire/exemplaire.service';

type SelectableEntity = IUtilisateur | IExemplaire;

@Component({
  selector: 'jhi-emprunt-update',
  templateUrl: './emprunt-update.component.html',
})
export class EmpruntUpdateComponent implements OnInit {
  isSaving = false;
  utilisateurs: IUtilisateur[] = [];
  exemplaires: IExemplaire[] = [];

  editForm = this.fb.group({
    id: [],
    dateEmprunt: [],
    nbNotifRetard: [],
    derniereDateNotif: [],
    utilisateur: [],
    exemplaire: [],
  });

  constructor(
    protected empruntService: EmpruntService,
    protected utilisateurService: UtilisateurService,
    protected exemplaireService: ExemplaireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ emprunt }) => {
      if (!emprunt.id) {
        const today = moment().startOf('day');
        emprunt.dateEmprunt = today;
        emprunt.derniereDateNotif = today;
      }

      this.updateForm(emprunt);

      this.utilisateurService.query().subscribe((res: HttpResponse<IUtilisateur[]>) => (this.utilisateurs = res.body || []));

      this.exemplaireService.query().subscribe((res: HttpResponse<IExemplaire[]>) => (this.exemplaires = res.body || []));
    });
  }

  updateForm(emprunt: IEmprunt): void {
    this.editForm.patchValue({
      id: emprunt.id,
      dateEmprunt: emprunt.dateEmprunt ? emprunt.dateEmprunt.format(DATE_TIME_FORMAT) : null,
      nbNotifRetard: emprunt.nbNotifRetard,
      derniereDateNotif: emprunt.derniereDateNotif ? emprunt.derniereDateNotif.format(DATE_TIME_FORMAT) : null,
      utilisateur: emprunt.utilisateur,
      exemplaire: emprunt.exemplaire,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const emprunt = this.createFromForm();
    if (emprunt.id !== undefined) {
      this.subscribeToSaveResponse(this.empruntService.update(emprunt));
    } else {
      this.subscribeToSaveResponse(this.empruntService.create(emprunt));
    }
  }

  private createFromForm(): IEmprunt {
    return {
      ...new Emprunt(),
      id: this.editForm.get(['id'])!.value,
      dateEmprunt: this.editForm.get(['dateEmprunt'])!.value
        ? moment(this.editForm.get(['dateEmprunt'])!.value, DATE_TIME_FORMAT)
        : undefined,
      nbNotifRetard: this.editForm.get(['nbNotifRetard'])!.value,
      derniereDateNotif: this.editForm.get(['derniereDateNotif'])!.value
        ? moment(this.editForm.get(['derniereDateNotif'])!.value, DATE_TIME_FORMAT)
        : undefined,
      utilisateur: this.editForm.get(['utilisateur'])!.value,
      exemplaire: this.editForm.get(['exemplaire'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmprunt>>): void {
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
}
