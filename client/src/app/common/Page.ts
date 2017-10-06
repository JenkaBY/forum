export interface Page<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
  size: number;
  sort: string;
}
