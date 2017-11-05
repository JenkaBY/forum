import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UsersComponent } from './user/user-list/users.component';
import { AdminModule } from './admin/admin.module';
import { TopicModule } from './topic/topic.module';
import { AdminService } from './admin/admin.service';
import { RegistrationModule } from './registration/registration.module';
import { LoginComponent } from './authorization/login/login.component';
import { AuthenticationService } from './authorization/authentication.service';
import { AuthInterceptor } from './shared/AuthInterceptor';
import { TopicRequestService } from './topic/topic-request/create-topic-request.service';
import { RoleService } from './shared/role/role.service';
import { TopicDiscussRequestService } from './topic/topic-disscuss-request/topic-discuss-request.service';
import { TopicService } from './topic/topic.service';
import { UserCacheableService } from './user/user-cacheable.service';
import { UserModule } from './user/user.module';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailsComponent,
    HeaderComponent,
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
    TopicModule,
    UserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot(
      {
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
    {provide: 'cacheableUserService', useClass: UserCacheableService},
    {provide: 'adminService', useClass: AdminService},
    {provide: 'topicRequestService', useClass: TopicRequestService},
    {provide: 'topicService', useClass: TopicService},
    {provide: 'roleService', useClass: RoleService},
    {provide: 'topicDiscussRequestService', useClass: TopicDiscussRequestService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
