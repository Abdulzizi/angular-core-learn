import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgbAlertModule,
        AuthRoutingModule,
        NgProgressModule

    ]
})
export class AuthModule { }
