import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Topic } from "../../../shared/entity/topic";
import ITopicService from "../../interface/itopic.service";

@Component({
  selector: 'app-modal-topic-content',
  templateUrl: './modal-topic-content.component.html',
  styleUrls: ['./modal-topic-content.component.css']
})
export class ModalTopicContentComponent implements OnInit {
  @Input() topic: Topic;
  @ViewChild('topicForm') topicForm: FormGroup;
  originalTopic: Topic;
  saving = false;
  maxDescriptionLength = {value: 500};
  maxTitleLength = {value: 127};

  constructor(public activeModal: NgbActiveModal,
              @Inject('topicService') private topicService: ITopicService) {
  }

  ngOnInit(): void {
    this.originalTopic = JSON.parse(JSON.stringify(this.topic));
    this.initForm();
  }

  onSubmit() {
    this.saving = true;
    this.patchTopic();
    this.saveTopicIfChanged();
  }

  private initForm() {
    this.topicForm = new FormGroup({
      'title': new FormControl(this.topic.title,
        [
          Validators.required,
          Validators.maxLength(this.maxTitleLength.value)
        ]),
      'description': new FormControl(this.topic.description,
        [
          Validators.required,
          Validators.maxLength(this.maxDescriptionLength.value)
        ]),
    })
  }

  private patchTopic(): void {
    this.topic.description = this.topicForm.get('description').value;
    this.topic.title = this.topicForm.get('title').value;
  }

  private saveTopicIfChanged() {
    if (this.originalTopic.title !== this.topic.title || this.originalTopic.description !== this.topic.description) {
      this.topicService.update(this.topic)
        .subscribe(topic => {
            this.topic = topic;
            this.saving = false;
            this.activeModal.close('Save');
          },
          error => {
            this.handleError(error);
            this.saving = false;
          });
      console.log("save topic", this.topic);
    }
  }

  private handleError(error) {
    console.log(error);
  }

  get title(): AbstractControl {
    return this.topicForm.get('title');
  }

  get description(): AbstractControl {
    return this.topicForm.get('description');
  }
}
