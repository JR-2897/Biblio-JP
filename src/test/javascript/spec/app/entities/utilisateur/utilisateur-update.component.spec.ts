import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BiblioJpTestModule } from '../../../test.module';
import { UtilisateurUpdateComponent } from 'app/entities/utilisateur/utilisateur-update.component';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';
import { Utilisateur } from 'app/shared/model/utilisateur.model';

describe('Component Tests', () => {
  describe('Utilisateur Management Update Component', () => {
    let comp: UtilisateurUpdateComponent;
    let fixture: ComponentFixture<UtilisateurUpdateComponent>;
    let service: UtilisateurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [UtilisateurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UtilisateurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UtilisateurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UtilisateurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Utilisateur(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Utilisateur();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
