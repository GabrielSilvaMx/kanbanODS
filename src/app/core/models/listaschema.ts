import { TareaSchema } from './index';

export interface ListaSchema {
    id: string;
    name: string;
    tasks: TareaSchema[];
}