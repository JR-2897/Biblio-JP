import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BiblioJpTestModule } from '../../../test.module';
import { ExemplaireComponent } from 'app/entities/exemplaire/exemplaire.component';
import { ExemplaireService } from 'app/entities/exemplaire/exemplaire.service';
import { Exemplaire } from 'app/shared/model/exemplaire.model';

describe('Component Tests', () => {
  describe('Exemplaire Management Component', () => {
    let comp: ExemplaireComponent;
    let fixture: ComponentFixture<ExemplaireComponent>;
    let service: ExemplaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [ExemplaireComponent],
      })
        .overrideTemplate(ExemplaireComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExemplaireComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExemplaireService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Exemplaire(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.exemplaires && comp.exemplaires[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
