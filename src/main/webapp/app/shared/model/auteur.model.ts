import { ILivre } from 'app/shared/model/livre.model';

export interface IAuteur {
  id?: number;
  auteur?: string;
  livres?: ILivre[];
}

export class Auteur implements IAuteur {
  constructor(public id?: number, public auteur?: string, public livres?: ILivre[]) {}
}
