import { ILivre } from 'app/shared/model/livre.model';

export interface IExemplaire {
  id?: number;
  disponibilite?: boolean;
  livre?: ILivre;
}

export class Exemplaire implements IExemplaire {
  constructor(public id?: number, public disponibilite?: boolean, public livre?: ILivre) {
    this.disponibilite = this.disponibilite || false;
  }
}
