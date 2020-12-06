import { Moment } from 'moment';
import { IExemplaire } from 'app/shared/model/exemplaire.model';

export interface IEmprunt {
  id?: number;
  dateEmprunt?: Moment;
  nbNotifRetard?: number;
  derniereDateNotif?: Moment;
  exemplaire?: IExemplaire;
}

export class Emprunt implements IEmprunt {
  constructor(
    public id?: number,
    public dateEmprunt?: Moment,
    public nbNotifRetard?: number,
    public derniereDateNotif?: Moment,
    public exemplaire?: IExemplaire
  ) {}
}
