import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

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
export class TopicListComponent extends Pageable<Topic> implements OnInit, OnDestroy {
  private searchTopics = new Subject<string>();

  private searchTitle;
  private initialRun = true;

  constructor(@Inject('topicService') private topicService: ITopicService,
              @Inject(TranslateService) private translateService: ExtendedTranslationService,
              private toastr: ToastsManager) {
    super();
  }

  /**
   * Implementation of the OnInit interface
   */
  ngOnInit() {
    this.onChangeSearchingTopics();
  }

  /**
   * Implementation the OnDestroy interface. Unsubscribe on searchTopic Subject
   */
  ngOnDestroy(): void {
    this.searchTopics.unsubscribe();
  }

  /**
   *  Retrieve topics per page
   */
  getAll(title?: string): void {
    this.topicService.getAllTopics(this.getHttpParams(), title)
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
    this.getAll(this.searchTitle);
  }

  /**
   * Search topics
   * @param {string} searchText
   */
  search(searchText: string): void {
    this.searchTopics.next(searchText);
  }

  private onChangeSearchingTopics(): void {
    this.searchTopics
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(title => Observable.of(title))
      .subscribe(title => {
        this.searchTitle = title;
        this.getAll(title);
      });
    if (this.initialRun) {
      this.getAll();
      this.initialRun = false;
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
}
