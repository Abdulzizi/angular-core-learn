import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from "angular-datatables";
import { FormUserComponent } from './components/form-user/form-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';

@NgModule({
  declarations: [FormUserComponent, ListUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ]
})
export class UserModule { }
