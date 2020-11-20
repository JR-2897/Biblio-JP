import { Moment } from 'moment';

export interface IUtilisateur {
  id?: number;
  nom?: string;
  prenom?: string;
  dateNaissance?: Moment;
  role?: string;
  pseudo?: string;
  motDePasse?: string;
  peutEmprunter?: boolean;
}

export class Utilisateur implements IUtilisateur {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public dateNaissance?: Moment,
    public role?: string,
    public pseudo?: string,
    public motDePasse?: string,
    public peutEmprunter?: boolean
  ) {
    this.peutEmprunter = this.peutEmprunter || false;
  }
}
