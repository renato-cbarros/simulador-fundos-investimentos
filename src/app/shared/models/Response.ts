import { Investment } from './Investment';

export interface Response {
  response: {
    status: string;
    data: {
      listaInvestimentos: Investment[];
    };
  };
}
