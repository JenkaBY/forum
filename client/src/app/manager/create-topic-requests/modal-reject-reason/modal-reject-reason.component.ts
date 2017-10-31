import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TopicRequest } from '../../../shared/entity/topic-request';

@Component({
  selector: 'app-modal-reject-reason',
  templateUrl: './modal-reject-reason.component.html',
  styleUrls: ['./modal-reject-reason.component.css']
})
export class ModalRejectReasonComponent implements OnInit {
  @Input() request: TopicRequest;
  @ViewChild('reasonForm') reasonForm: FormGroup;
  saving = false;
  maxReasonLength = {value: 500};

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.saving = true;
    this.patchTopic();
    this.activeModal.close(this.request);
  }

  private initForm() {
    this.reasonForm = new FormGroup({
      'reason': new FormControl(this.request.reason,
        [
          Validators.required,
          Validators.maxLength(this.maxReasonLength.value)
        ])
    });
  }

  private patchTopic(): void {
    this.request.reason = this.reasonAC.value;
  }

  private handleError(error) {
    console.log(error);
  }

  get reasonAC(): AbstractControl {
    return this.reasonForm.get('reason');
  }
}
