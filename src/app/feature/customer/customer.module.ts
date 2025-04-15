import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { FormCustomerComponent } from './components/form-customer/form-customer.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ListCustomerComponent, FormCustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ]
})
export class CustomerModule { }
