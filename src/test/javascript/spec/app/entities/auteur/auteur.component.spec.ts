import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BiblioJpTestModule } from '../../../test.module';
import { AuteurComponent } from 'app/entities/auteur/auteur.component';
import { AuteurService } from 'app/entities/auteur/auteur.service';
import { Auteur } from 'app/shared/model/auteur.model';

describe('Component Tests', () => {
  describe('Auteur Management Component', () => {
    let comp: AuteurComponent;
    let fixture: ComponentFixture<AuteurComponent>;
    let service: AuteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [AuteurComponent],
      })
        .overrideTemplate(AuteurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AuteurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AuteurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Auteur(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.auteurs && comp.auteurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
