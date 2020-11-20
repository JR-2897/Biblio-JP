import { ILivre } from 'app/shared/model/livre.model';

export interface IEmplacement {
  id?: number;
  nomEmplacement?: string;
  livres?: ILivre[];
}

export class Emplacement implements IEmplacement {
  constructor(public id?: number, public nomEmplacement?: string, public livres?: ILivre[]) {}
}
