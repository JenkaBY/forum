import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Pageable } from '../../shared/entity/pageable';
import { Topic } from '../../shared/entity/topic';
import ITopicService from '../../topic/interface/itopic.service';
import { Page } from '../../shared/entity/page';
import { UsersInTopicComponent } from './users-dicsuss-in-topics/users-in-topic.component';
import { ToastsManager } from 'ng2-toastr';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { TranslateService } from 'ng2-translate';
import { environment } from '../../../environments/environment';

/**
 * Describes All topics in manager dashboard.
 */
@Component({
  selector: 'app-manager-all-topics',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css']
})
export class AllTopicsComponent extends Pageable<Topic> implements OnInit {

  constructor(@Inject('topicService') private topicService: ITopicService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager,
              private modalService: NgbModal) {
    super();
    this.pageSize = 10;
  }

  /**
   * Implementation the OnInit interface
   * Fetches all topic per page
   */
  ngOnInit(): void {
    this.getAllTopics();
  }

  private getAllTopics() {
    this.topicService.getAllTopics(this.getHttpParams())
      .subscribe(
        (page: Page<Topic>) => {
          this.setPageData(page);
        },
        (error) => this.handleError(error)
      );
  }

  /**
   * Event listener on 'page number' button. Fetches the  page topics according to current page params.
   */
  onPageChange() {
    this.getAllTopics();
  }

  private handleError(error: any) {
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
   * Event Listener on "Show users" button. Opens the modal window with list users allowed in given topic
   * @param {Topic} topic for which needs to show users allowed in the topic.
   */
  onShowUsers(topic: Topic) {
    const modalRef = this.modalService.open(UsersInTopicComponent);
    modalRef.componentInstance.topic = topic;
  }
}
