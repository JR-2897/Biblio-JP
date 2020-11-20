import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BiblioJpTestModule } from '../../../test.module';
import { LivreUpdateComponent } from 'app/entities/livre/livre-update.component';
import { LivreService } from 'app/entities/livre/livre.service';
import { Livre } from 'app/shared/model/livre.model';

describe('Component Tests', () => {
  describe('Livre Management Update Component', () => {
    let comp: LivreUpdateComponent;
    let fixture: ComponentFixture<LivreUpdateComponent>;
    let service: LivreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [LivreUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LivreUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LivreUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LivreService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Livre(123);
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
        const entity = new Livre();
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
