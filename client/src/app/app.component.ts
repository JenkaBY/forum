import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = {title: 'UserFaces!'};


    constructor(private router: Router, private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('ru');
    }

    goBack(): void {
        this.router.navigateByUrl('');
    }
}
