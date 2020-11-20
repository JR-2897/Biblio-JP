import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BiblioJpTestModule } from '../../../test.module';
import { AuteurUpdateComponent } from 'app/entities/auteur/auteur-update.component';
import { AuteurService } from 'app/entities/auteur/auteur.service';
import { Auteur } from 'app/shared/model/auteur.model';

describe('Component Tests', () => {
  describe('Auteur Management Update Component', () => {
    let comp: AuteurUpdateComponent;
    let fixture: ComponentFixture<AuteurUpdateComponent>;
    let service: AuteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [AuteurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AuteurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AuteurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AuteurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Auteur(123);
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
        const entity = new Auteur();
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
