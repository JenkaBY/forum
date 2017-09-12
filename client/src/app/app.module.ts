import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserService } from './service/user.service';
import { HttpModule, Http } from '@angular/http';
import { AppRoutingModule } from './common/app-routing.module';
import { UserDetailsComponent } from './user/user-details.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './user/users.component';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/locale', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UserDetailsComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        })
    ],
    providers: [{provide: 'userService', useClass: UserService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
