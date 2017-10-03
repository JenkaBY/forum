import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserService } from './service/user.service';
import { Http, HttpModule } from '@angular/http';
import { AppRoutingModule } from './common/app-routing.module';
import { UserDetailsComponent } from './user/user-details.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './user/users.component';
import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate';
import { TopicService } from './service/topic.service';
import { TopicsComponent } from './topics/topics.component';
import { TopicComponent } from './topic/topic.component';
import { MessageService } from './service/message.service';
import { MessageComponent } from './message/message.component';
import { MaterialDesignModule } from './material/material-design.module';
import { HeaderComponent } from './header/header.component';
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
        AppRoutingModule,
        FormsModule,
        CommonModule,
        MaterialDesignModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        })
    ],
    providers: [{provide: 'userService', useClass: UserService},
        {provide: 'topicService', useClass: TopicService},
        {provide: 'messageService', useClass: MessageService},
        {provide: 'adminService', useClass: AdminService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
