import { IAuteur } from 'app/shared/model/auteur.model';
import { ITheme } from 'app/shared/model/theme.model';
import { IEmplacement } from 'app/shared/model/emplacement.model';

export interface ILivre {
  id?: number;
  titre?: string;
  description?: any;
  isbn?: string;
  code?: string;
  auteurs?: IAuteur[];
  themes?: ITheme[];
  emplacements?: IEmplacement[];
}

export class Livre implements ILivre {
  constructor(
    public id?: number,
    public titre?: string,
    public description?: any,
    public isbn?: string,
    public code?: string,
    public auteurs?: IAuteur[],
    public themes?: ITheme[],
    public emplacements?: IEmplacement[]
  ) {}
}
