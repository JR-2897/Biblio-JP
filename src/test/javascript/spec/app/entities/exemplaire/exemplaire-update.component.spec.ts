import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BiblioJpTestModule } from '../../../test.module';
import { ExemplaireUpdateComponent } from 'app/entities/exemplaire/exemplaire-update.component';
import { ExemplaireService } from 'app/entities/exemplaire/exemplaire.service';
import { Exemplaire } from 'app/shared/model/exemplaire.model';

describe('Component Tests', () => {
  describe('Exemplaire Management Update Component', () => {
    let comp: ExemplaireUpdateComponent;
    let fixture: ComponentFixture<ExemplaireUpdateComponent>;
    let service: ExemplaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [ExemplaireUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ExemplaireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExemplaireUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExemplaireService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Exemplaire(123);
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
        const entity = new Exemplaire();
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
