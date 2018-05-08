import { Product } from './product';
import { StateRequests } from '../shared/utils/state-management';

export class Action {
  type: StateRequests;
  payload: Product[];
}
