import { Constants } from './constants';

export class Pageable<T> {
    currentPage: number;
    totalElements: number;
    pageSize: number;

  onPageChange(): void {
        let params = new URLSearchParams();
    params.append(Constants.getPageParam, String(this.currentPage - 1));
    params.append(Constants.getSizeParam, String(Constants.getPageSize));
    }
}
