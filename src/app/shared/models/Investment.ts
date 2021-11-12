import { Action } from './Action';

export interface Investment {
  nome: string;
  objetivo: string;
  saldoTotal: number;
  indicadorCarencia: string;
  acoes: Action[];
}
