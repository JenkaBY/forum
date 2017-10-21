import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NewMessageFormComponent } from "./new-message-form/new-message-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule
  ],
  declarations: [
    NewMessageFormComponent
  ]
})
export class MessageModule {
}
