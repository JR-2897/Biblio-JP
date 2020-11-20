import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BiblioJpTestModule } from '../../../test.module';
import { AuteurDetailComponent } from 'app/entities/auteur/auteur-detail.component';
import { Auteur } from 'app/shared/model/auteur.model';

describe('Component Tests', () => {
  describe('Auteur Management Detail Component', () => {
    let comp: AuteurDetailComponent;
    let fixture: ComponentFixture<AuteurDetailComponent>;
    const route = ({ data: of({ auteur: new Auteur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BiblioJpTestModule],
        declarations: [AuteurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AuteurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AuteurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load auteur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.auteur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
