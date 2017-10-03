import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = {title: 'Forum'};

    constructor(private router: Router, private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    switchLanguage(lang: string): void {
        if (this.translate.currentLang === lang) return;
        this.translate.use(lang);
    }

    goBack(): void {
        this.router.navigateByUrl('');
    }
}
