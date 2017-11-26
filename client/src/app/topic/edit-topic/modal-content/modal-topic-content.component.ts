import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Topic } from '../../../shared/entity/topic';
import ITopicService from '../../interface/itopic.service';
import { environment } from '../../../../environments/environment';
import { ExtendedTranslationService } from '../../../shared/translation-service/extended-translation.service';

/**
 * Describes the modal window with topic data. Allows to modify the topic data.
 */
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
              @Inject('topicService') private topicService: ITopicService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager) {
  }

  /**
   * Implementation the OnInit interface
   */
  ngOnInit(): void {
    this.originalTopic = JSON.parse(JSON.stringify(this.topic));
    this.initForm();
  }

  /**
   * Eventlistner on 'Submit' button. Patches TopicForm and Save topic data if it was changed.
   */
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
        ])
    });
  }

  private patchTopic(): void {
    this.topic.description = this.description.value;
    this.topic.title = this.title.value;
  }

  private saveTopicIfChanged() {
    if (this.originalTopic.title !== this.topic.title || this.originalTopic.description !== this.topic.description) {
      this.topicService.update(this.topic)
        .subscribe(topic => {
            this.topic = topic;
            this.saving = false;
            this.notifySuccessTopicUpdated();
            this.activeModal.close('Save');
          },
          error => {
            this.handleError(error);
            this.saving = false;
          });
    }
  }

  private handleError(error) {
    if (!environment.production) {
      console.log(error);
    }
    if (error.error && error.error.message) {
      this.toastr.error(error.error.message);
      return;
    }
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
  }

  /**
   * Gets 'title' Abstract control for topicForm
   * @returns {AbstractControl} 'title' control of topicForm
   */
  get title(): AbstractControl {
    return this.topicForm.get('title');
  }

  /**
   * Gets 'description' Abstract control for topicForm
   * @returns {AbstractControl} 'description' control of topicForm
   */
  get description(): AbstractControl {
    return this.topicForm.get('description');
  }

  private notifySuccessTopicUpdated() {
    this.translateService.get('MESSAGES.TOPIC_UPDATED')
      .subscribe(
        (translation: string) => this.toastr.success(translation));
  }
}
