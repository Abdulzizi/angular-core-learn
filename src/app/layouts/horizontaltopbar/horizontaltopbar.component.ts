import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { AuthService } from 'src/app/feature/auth/services/auth.service';
import { EventService } from '../../core/services/event.service';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-horizontaltopbar',
    templateUrl: './horizontaltopbar.component.html',
})

/**
 * Horizontal Topbar and navbar specified
 */
export class HorizontaltopbarComponent implements OnInit {

    element;
    configData;
    userLogin;
    url;
    constructor(
        @Inject(DOCUMENT) private document: any,
        private router: Router,
        private eventService: EventService,
        private authService: AuthService,
        private progressService: ProgressServiceService,
        private progress: NgProgress,

    ) {
        router.events.subscribe(event => {
          if(event instanceof NavigationEnd ){
            this.url = event.urlAfterRedirects.split('/')[1]
          }
        });
    }

    ngOnInit(): void {
        this.element = document.documentElement;

        this.configData = {
            suppressScrollX: true,
            wheelSpeed: 0.3
        };

        this.authService.getProfile().subscribe((user: any) => {
            this.userLogin = user;
        });
        this.progressService.progressRef = this.progress.ref('progressBar');

    }

    logout() {
        this.authService.logout();
        this.router.navigate(['auth/login']);
    }

    /**
     * On menu click
     */
    onMenuClick(event: any) {
        const nextEl = event.target.nextSibling;
        if (nextEl && !nextEl.classList.contains('show')) {
            const parentEl = event.target.parentNode;
            if (parentEl) { parentEl.classList.remove('show'); }

            nextEl.classList.add('show');
        } else if (nextEl) { nextEl.classList.remove('show'); }
        return false;
    }

    /**
     * remove active and mm-active class
     */
    _removeAllClass(className) {
        const els = document.getElementsByClassName(className);
        while (els[0]) {
            els[0].classList.remove(className);
        }
    }

    /**
     * Togglemenu bar
     */
    toggleMenubar() {
        const element = document.getElementById('topnav-menu-content');
        element.classList.toggle('show');
    }



    /**
     * on settings button clicked from topbar
     */
    onSettingsButtonClicked() {
        document.body.classList.toggle('right-bar-enabled');
    }

    /**
     * Fullscreen method
     */
    fullscreen() {
        document.body.classList.toggle('fullscreen-enable');
        if (!document.fullscreenElement && !this.element.mozFullScreenElement && !this.element.webkitFullscreenElement) {
            if (this.element.requestFullscreen) {
                this.element.requestFullscreen();
            } else if (this.element.mozRequestFullScreen) {
                /* Firefox */
                this.element.mozRequestFullScreen();
            } else if (this.element.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                this.element.webkitRequestFullscreen();
            } else if (this.element.msRequestFullscreen) {
                /* IE/Edge */
                this.element.msRequestFullscreen();
            }
        } else {
            if (this.document.exitFullscreen) {
                this.document.exitFullscreen();
            } else if (this.document.mozCancelFullScreen) {
                /* Firefox */
                this.document.mozCancelFullScreen();
            } else if (this.document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                this.document.webkitExitFullscreen();
            } else if (this.document.msExitFullscreen) {
                /* IE/Edge */
                this.document.msExitFullscreen();
            }
        }
    }

    /**
     * Change the layout onclick
     * @param layout Change the layout
     */
    changeLayout(layout: string) {
        this.eventService.broadcast('changeLayout', layout);
        window.location.reload();
    }
}
