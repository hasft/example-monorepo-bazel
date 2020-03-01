import {MdsServices} from './types';

export default class MdsApi {
  status: string | null
  services: MdsServices | null
  
  setStatus(status: string) {
    this.status = status;
  }

  setServices(services: string) {
    this.services = services
  }
}
