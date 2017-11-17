import { HttpParams } from '@angular/common/http';

import { Constants } from '../constants/constants';
import { Page } from './page';

/**
 * Abstract class for implementation in concrete class. It describes behaviour of component classes that show
 * data per page.
 */
export abstract class Pageable<T> {
  entities: T[];
  currentPage: number;
  totalElements: number;
  pageSize: number;
  maxSize: number;
  sortColumn: string;

  constructor() {
    this.currentPage = 1;
    this.pageSize = 10;
    this.sortColumn = Constants.id;
  }

  /**
   * Sets page params(pageNumber, pageSize, totalElements and content).
   * Ex.
   * fetchData(httpParams: HttpParams)(){
   *  this.dataService(httpParams)
   *  .subscribe((page: Page<T>) => this.setPageData(page))
   * }
   * @param {Page<T>} page described in @see Page class.
   */
  protected setPageData(page: Page<T>) {
    this.entities = page.content;
    this.currentPage = page.number + 1;
    this.totalElements = page.totalElements;
    this.pageSize = page.size;
  }

  /**
   * sets and returns http parameters GET request
   * @param {HttpParams} httpParams not necessary parameters
   * @returns {HttpParams} of page parameters
   */
  protected getHttpParams(httpParams?: HttpParams): HttpParams {
    if (!httpParams) {
      httpParams = new HttpParams();
    }
    httpParams = httpParams.set(Constants.getSortParam, this.sortColumn)
      .set(Constants.getSizeParam, String(this.pageSize))
      .set(Constants.getPageParam, String(this.currentPage - 1));
    return httpParams;
  }

  /**
   * To be implemented in concrete class. Method is invoked by clicking of page navigation buttons.
   * Standard implementation looks as
   * ex.
   * onPageChange(){
   *    this.fetchData(this.getHttpParams());
   * }
   * It fetches new page with data.
   */
  protected abstract onPageChange();
}
