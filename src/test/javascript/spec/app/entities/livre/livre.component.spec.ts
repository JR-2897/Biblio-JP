import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BiblioJpTestModule } from '../../../test.module';
import { LivreComponent } from 'app/entities/livre/livre.component';
import { LivreService } from 'app/entities/livre/livre.service';
import { Livre } from 'app/shared/model/livre.model';

describe('Component Tests', () => {
  describe('Livre Management Component', () => {
    let comp: LivreComponent;
    let fixture: ComponentFixture<LivreComponent>;
    let service: LivreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [LivreComponent],
      })
        .overrideTemplate(LivreComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LivreComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LivreService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Livre(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.livres && comp.livres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
