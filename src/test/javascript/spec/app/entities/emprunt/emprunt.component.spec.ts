import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BiblioJpTestModule } from '../../../test.module';
import { EmpruntComponent } from 'app/entities/emprunt/emprunt.component';
import { EmpruntService } from 'app/entities/emprunt/emprunt.service';
import { Emprunt } from 'app/shared/model/emprunt.model';

describe('Component Tests', () => {
  describe('Emprunt Management Component', () => {
    let comp: EmpruntComponent;
    let fixture: ComponentFixture<EmpruntComponent>;
    let service: EmpruntService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [EmpruntComponent],
      })
        .overrideTemplate(EmpruntComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmpruntComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmpruntService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Emprunt(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.emprunts && comp.emprunts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
