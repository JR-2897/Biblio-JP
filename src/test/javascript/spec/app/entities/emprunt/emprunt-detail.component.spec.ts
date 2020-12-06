import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BiblioJpTestModule } from '../../../test.module';
import { EmpruntDetailComponent } from 'app/entities/emprunt/emprunt-detail.component';
import { Emprunt } from 'app/shared/model/emprunt.model';

describe('Component Tests', () => {
  describe('Emprunt Management Detail Component', () => {
    let comp: EmpruntDetailComponent;
    let fixture: ComponentFixture<EmpruntDetailComponent>;
    const route = ({ data: of({ emprunt: new Emprunt(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [EmpruntDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EmpruntDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmpruntDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load emprunt on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.emprunt).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
