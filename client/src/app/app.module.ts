import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
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
import { RegistrationModule } from "./registration/registration.module";
import { TestComponent } from './test/test.component';
import { LoginComponent } from './authorization/login/login.component';
import { AuthenticationService } from "./authorization/authentication.service";
import { AuthInterceptor } from "./shared/AuthInterceptor";

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
    HeaderComponent,
    TestComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AdminModule,
    RegistrationModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthenticationService,
    {provide: 'userService', useClass: UserService},
    {provide: 'topicService', useClass: TopicService},
    {provide: 'adminService', useClass: AdminService},
    {provide: 'messageService', useClass: MessageService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
