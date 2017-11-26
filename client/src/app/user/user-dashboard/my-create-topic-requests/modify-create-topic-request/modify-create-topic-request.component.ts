import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TopicRequest } from '../../../../shared/entity/topic-request';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-modify-create-topic-request',
  templateUrl: './modify-create-topic-request.component.html',
  styleUrls: ['./modify-create-topic-request.component.css']
})
export class ModifyCreateTopicRequestComponent implements OnInit {
  @Input() request: TopicRequest;
  @ViewChild('requestForm') requestForm: FormGroup;
  maxDescriptionLength = {value: 500};
  maxTitleLength = {value: 255};

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.patchTopicRequest();
    this.activeModal.close(this.request);
  }

  private initForm() {
    this.requestForm = new FormGroup({
      'title': new FormControl(this.request.requestedTopicTitle,
        [
          Validators.required,
          Validators.maxLength(this.maxTitleLength.value)
        ]),
      'description': new FormControl(this.request.requestedTopicDescription,
        [
          Validators.required,
          Validators.maxLength(this.maxDescriptionLength.value)
        ])
    });
  }

  private patchTopicRequest(): void {
    this.request.requestedTopicTitle = this.titleAC.value;
    this.request.requestedTopicDescription = this.descriptionAC.value;
  }

  private handleError(error) {
    if (!environment.production) {
      console.log(error);
    }
  }

  get titleAC(): AbstractControl {
    return this.requestForm.get('title');
  }

  get descriptionAC(): AbstractControl {
    return this.requestForm.get('description');
  }
}
