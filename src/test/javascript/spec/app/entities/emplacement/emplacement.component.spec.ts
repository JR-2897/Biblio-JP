import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BiblioJpTestModule } from '../../../test.module';
import { EmplacementComponent } from 'app/entities/emplacement/emplacement.component';
import { EmplacementService } from 'app/entities/emplacement/emplacement.service';
import { Emplacement } from 'app/shared/model/emplacement.model';

describe('Component Tests', () => {
  describe('Emplacement Management Component', () => {
    let comp: EmplacementComponent;
    let fixture: ComponentFixture<EmplacementComponent>;
    let service: EmplacementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [EmplacementComponent],
      })
        .overrideTemplate(EmplacementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmplacementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmplacementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Emplacement(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.emplacements && comp.emplacements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
