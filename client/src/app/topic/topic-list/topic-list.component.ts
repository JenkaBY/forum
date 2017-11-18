import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import ITopicService from '../interface/itopic.service';
import { Topic } from '../../shared/entity/topic';
import { Page } from '../../shared/entity/page';
import { Pageable } from '../../shared/entity/pageable';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ExtendedTranslationService } from '../../shared/translation-service/extended-translation.service';
import { environment } from '../../../environments/environment';

/**
 * Describes list of topics page(main page). Extends Pageable object. By default 10 topics per page.
 * See @Pageable to modify default behaviour
 */
@Component({
  selector: 'forum-topics',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent extends Pageable<Topic> implements OnInit {

  constructor(@Inject('topicService') private topicService: ITopicService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager) {
    super();
  }

  /**
   * Implementation the OnInit interface
   */
  ngOnInit() {
    this.getAll();
  }

  /**
   *  Retrieve topics per page
   */
  getAll(): void {
    this.topicService.getAllTopics(this.getHttpParams())
      .subscribe(
        (page: Page<Topic>) => {
          this.setPageData(page);
        },
        (error: HttpErrorResponse) => this.handleError(error)
      );
  }

  /**
   * Need to be invoked after changing page
   * Refresh list of topics according to page parameters
   */
  onPageChange() {
    this.getAll();
  }

  private handleError(error: HttpErrorResponse) {
    this.toastr.error(this.translateService.getTranslate('ERROR.COMMON_ERROR'));
    if (!environment.production) {
      console.log(error);
    }
  }
}
