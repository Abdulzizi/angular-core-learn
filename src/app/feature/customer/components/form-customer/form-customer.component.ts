import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { LandaService } from 'src/app/core/services/landa.service';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.scss']
})
export class FormCustomerComponent {
  constructor(
    private customerService: CustomerService,
    private landaService: LandaService
  ) { }

  @Input() customerId: String;
  @Output() afterSave = new EventEmitter<boolean>();

  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';
  activeMode: string;
  formModel: {
    id: string,
    name: string,
    email: string,
    password: string
  } = {
      id: '',
      name: '',
      email: '',
      password: ''
    };

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

  resetForm() {
    this.formModel = {
      id: '',
      name: '',
      email: '',
      password: ''
    }

    if (this.customerId > '') {
      this.activeMode = this.MODE_UPDATE;
      this.getCustomer(this.customerId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
    return false;
  }

  getCustomer(customerId) {
    this.customerService.getCustomerById(customerId).subscribe((res: any) => {
      this.formModel = res.data;
    }, err => {
      console.log(err);
    });
  }

  save() {
    switch (this.activeMode) {
      case this.MODE_CREATE:
        this.insert();
        break;
      case this.MODE_UPDATE:
        this.update();
        break;
    }
  }

  insert() {
    this.customerService.createCustomer(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update() {
    this.customerService.updateCustomer(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    })
  }
}
