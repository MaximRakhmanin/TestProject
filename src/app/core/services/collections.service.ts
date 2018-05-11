import { Injectable } from '@angular/core';

import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishBehavior';

import { StateManagement, StateRequests } from '../../shared/utils/state-management';

@Injectable()
export class CollectionsService {

  stateManagement: StateManagement<any> = new StateManagement<any>();

  constructor() { }

  isData() {
    const isData$ = this.stateManagement.responseData$
    .scan((isData: boolean, {type}) => {
      if (type === StateRequests.GetList || type === StateRequests.Add || type === StateRequests.Remove) {
        return true;
      }
    }, false)
    .publishBehavior(false);
   isData$.connect();
   return isData$;
  }
}
