import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EmpruntService } from 'app/entities/emprunt/emprunt.service';
import { IEmprunt, Emprunt } from 'app/shared/model/emprunt.model';

describe('Service Tests', () => {
  describe('Emprunt Service', () => {
    let injector: TestBed;
    let service: EmpruntService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmprunt;
    let expectedResult: IEmprunt | IEmprunt[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EmpruntService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Emprunt(0, currentDate, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateEmprunt: currentDate.format(DATE_TIME_FORMAT),
            derniereDateNotif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Emprunt', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateEmprunt: currentDate.format(DATE_TIME_FORMAT),
            derniereDateNotif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEmprunt: currentDate,
            derniereDateNotif: currentDate,
          },
          returnedFromService
        );

        service.create(new Emprunt()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Emprunt', () => {
        const returnedFromService = Object.assign(
          {
            dateEmprunt: currentDate.format(DATE_TIME_FORMAT),
            nbNotifRetard: 1,
            derniereDateNotif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEmprunt: currentDate,
            derniereDateNotif: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Emprunt', () => {
        const returnedFromService = Object.assign(
          {
            dateEmprunt: currentDate.format(DATE_TIME_FORMAT),
            nbNotifRetard: 1,
            derniereDateNotif: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEmprunt: currentDate,
            derniereDateNotif: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Emprunt', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
