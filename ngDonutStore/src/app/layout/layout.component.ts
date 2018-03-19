import { ScriptLoaderService } from '../core/services/script-loader.service';
import { Helpers } from './../helpers';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
    constructor(private _script: ScriptLoaderService, private _router: Router) {

    }
    ngOnInit() {
        // this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
        //     .then(result => {
        //         Helpers.setLoading(false);
        //         // optional js to be loaded once
        //         this._script.load('head', 'assets/vendors/custom/fullcalendar/fullcalendar.bundle.js');
        //     });
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                (<any>mLayout).closeMobileAsideMenuOffcanvas();
                (<any>mLayout).closeMobileHorMenuOffcanvas();
                (<any>mApp).scrollTop();
                Helpers.setLoading(true);
                // hide visible popover
                (<any>$('[data-toggle="m-popover"]')).popover('hide');
            }
            if (route instanceof NavigationEnd) {
                // init required js
                (<any>mApp).init();
                (<any>mUtil).init();
                Helpers.setLoading(false);
                // content m-wrapper animation
                let animation = 'm-animate-fade-in-up';
                $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
                    $('.m-wrapper').removeClass(animation);
                }).removeClass(animation).addClass(animation);
            }
        });
    }
}