import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStaticLoader } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { AdminModule } from './admin/admin.module';
import { TopicModule } from './topic/topic.module';
import { AdminService } from './admin/admin.service';
import { RegistrationModule } from './registration/registration.module';
import { LoginComponent } from './authorization/login/login.component';
import { AuthenticationService } from './authorization/authentication.service';
import { TopicRequestService } from './topic/topic-request/create-topic-request.service';
import { RoleService } from './shared/role/role.service';
import { TopicDiscussRequestService } from './topic/topic-disscuss-request/topic-discuss-request.service';
import { TopicService } from './topic/topic.service';
import { UserCacheableService } from './user/user-cacheable.service';
import { UserModule } from './user/user.module';
import { TruncatePipe } from './shared/pipes/truncate';
import { ModalPrompt } from './layout/modal-promt/modal-prompt.component';
import { GuardService } from './authorization/guard.service';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { AuthInterceptor } from './shared/auth-interceptor';
import { UploadFileService } from './shared/upload-file.service';
import { ManagerModule } from './manager/manager.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtendedTranslationService } from './shared/translation-service/extended-translation.service';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    TruncatePipe,
    ModalPrompt,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AdminModule,
    RegistrationModule,
    TopicModule,
    UserModule,
    ManagerModule,
    AppRoutingModule,
    ToastModule.forRoot(),
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
    {provide: 'guardService', useClass: GuardService},
    {provide: 'cacheableUserService', useClass: UserCacheableService},
    {provide: 'adminService', useClass: AdminService},
    {provide: 'topicRequestService', useClass: TopicRequestService},
    {provide: 'topicService', useClass: TopicService},
    {provide: 'roleService', useClass: RoleService},
    {provide: 'topicDiscussRequestService', useClass: TopicDiscussRequestService},
    {provide: 'uploadFileService', useClass: UploadFileService},
    {provide: TranslateService, useClass: ExtendedTranslationService}
  ],
  entryComponents: [ModalPrompt],
  bootstrap: [AppComponent]
})
export class AppModule {
}
