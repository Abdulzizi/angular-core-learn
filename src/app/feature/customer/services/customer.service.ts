import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private landaService: LandaService) { }

  getCustomer(arrParameter) {
    return this.landaService.DataGet('/v1/customers/', arrParameter);
  }

  getCustomerById(userId) {
    return this.landaService.DataGet('/v1/customers/' + userId);
  }

  createCustomer(payload) {
    return this.landaService.DataPost('/v1/customers/', payload);
  }

  updateCustomer(payload) { 
    return this.landaService.DataPut('/v1/customers/', payload)
  }

  deleteCustomer(userId) {
    return this.landaService.DataDelete('/v1/customers/' + userId);
  }
}
