import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './service/user.service';
import { AppRoutingModule } from './app-routing.module';
import { UserDetailsComponent } from './user/user-details.component';
import { UsersComponent } from './user/users.component';
import { TopicService } from './service/topic.service';
import { TopicsComponent } from './topics/topics.component';
import { TopicComponent } from './topic/topic.component';
import { MessageService } from './service/message.service';
import { MessageComponent } from './message/message.component';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './service/admin.service';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UserDetailsComponent,
        TopicsComponent,
        TopicComponent,
        MessageComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        CommonModule,
        AdminModule,
      ReactiveFormsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        })
    ],
    providers: [{provide: 'userService', useClass: UserService},
        {provide: 'topicService', useClass: TopicService},
        {provide: 'adminService', useClass: AdminService},
        {provide: 'messageService', useClass: MessageService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
