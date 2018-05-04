import { Product } from './product';
import { StateRequests } from '../core/services/state-management';

export class Action {
  type: StateRequests;
  payload: Product[];
}
