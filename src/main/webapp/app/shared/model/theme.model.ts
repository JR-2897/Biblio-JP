import { ILivre } from 'app/shared/model/livre.model';

export interface ITheme {
  id?: number;
  theme?: string;
  livres?: ILivre[];
}

export class Theme implements ITheme {
  constructor(public id?: number, public theme?: string, public livres?: ILivre[]) {}
}
