import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ScriptLoaderService } from './core/services/script-loader.service';
import { IdentityService } from './core/services/identity.service';
import { NavigationService } from './core/services/navigation.service';
import { BaseService } from './core/services/base.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { Helpers } from './helpers';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'app';
    globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';

    constructor(private _router: Router,
        private _script: ScriptLoaderService,
        private identityService: IdentityService,
        private navigationService: NavigationService,
        private baseService: BaseService,
        private localStorageService: LocalStorageService
    ) {
        /**
        * @WhatItDoes detects any change in localStorage made by other instances or app
        * then reset values in IdentityService to the current localStorage
        * @Author LDThien
        * @Date 2018/03/06
        */
        window.addEventListener('storage', function() {
            const currentRole = identityService.getTopRole();
            identityService.initializeToken();
            identityService.initializeCurrentUser();
            const newRole = identityService.getTopRole();
            if (currentRole !== newRole) {
                navigationService.navHomepage();
            }
        });
    }

    ngOnInit() {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                Helpers.setLoading(true);
                Helpers.bodyClass(this.globalBodyClass);
            }
            if (route instanceof NavigationEnd) {
                Helpers.setLoading(false);
            }
        });
        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
            });

            /**
            * @WhatItDoes subcribes to localStorage actions 
            * and reset IdentityService accordingly
            * @Author LDThien
            * @Date 2018/03/06
            */
        this.localStorageService.storageSubject.subscribe(next => {
            this.identityService.initializeCurrentUser();
            this.identityService.initializeToken();
        })
        
    }

    ngAfterViewInit() {
    }
}
