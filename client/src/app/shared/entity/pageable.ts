import { HttpParams } from '@angular/common/http';

import { Constants } from '../constants/constants';
import { Page } from './page';

export class Pageable<T> {
  entities: T[];
  currentPage: number;
  totalElements: number;
  pageSize: number;
  maxSize: number;

  protected setPageData(page: Page<T>) {
    this.entities = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
  }

  protected getHttpParams(): HttpParams {
    return new HttpParams().set(Constants.getPageParam, String(this.currentPage - 1));
  }

  protected setHttpParams(httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    httpParams = httpParams.set(Constants.getSortParam, Constants.id)
      .set(Constants.getSizeParam, String(this.pageSize));
    return httpParams;
  }
}
