import { Component, OnInit, AfterViewInit } from '@angular/core';

import { LandaService } from '../../../../core/services/landa.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgProgress } from 'ngx-progressbar';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit, AfterViewInit {

    email: string;
    password: string;
    year: number = new Date().getFullYear();

    constructor(
        private authService: AuthService,
        private landaService: LandaService,
        private router: Router,
        private progressService: ProgressServiceService,
        private progress: NgProgress,

    ) {
        if (this.authService.getToken() !== '') {
            this.router.navigate(['/home']);
        }
    }

    ngOnInit() {
        this.authService.logout();
    }

    ngAfterViewInit() {
    }

    login() {
      this.progressService.progressRef = this.progress.ref('progressBar');
      this.progressService.startLoading();

        this.authService.login(this.email, this.password).subscribe((res: any) => {
            this.authService.saveToken(res.data.access_token);
            this.router.navigate(['/home']);
            this.progressService.finishLoading();

        }, (err: any) => {
            this.landaService.alertError('Mohon Maaf', err.error.errors);
            this.progressService.finishLoading();

        });
    }
}
