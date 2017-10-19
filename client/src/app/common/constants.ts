const dateTimeFormat = 'yyyy/MM/dd HH:mm';
const dateFormat = 'yyyy/MM/dd';
const pageSize = 5;
const maxSize = 5;
const pageParam = 'page';
const sortParam = 'sort';
const sizeParam = 'size';
const minNameLength = {value: 4};
const maxNameLength = {value: 20};
const minPasswordLength = {value: 6};
const maxPasswordLength = {value: 16};

export class Constants {
  public static get getMinNameLength(): { value: number } {
    return minNameLength;
  }

  public static get getMaxNameLength(): { value: number } {
    return maxNameLength;
  }

  public static get getMinPasswordLength(): { value: number } {
    return minPasswordLength;
  }

  public static get getMaxPasswordLength(): { value: number } {
    return maxPasswordLength;
  }


  public static get getDateTimeFormat(): string {
        return dateTimeFormat;
    }

  public static get getDateFormat(): string {
        return dateFormat;
    }

  public static get getPageSize(): number {
        return pageSize;
    }

  public static get getPageParam(): string {
        return pageParam;
    }

  public static get getSortParam(): string {
        return sortParam;
    }

  public static get getSizeParam(): string {
        return sizeParam;
    }

  public static get getMaxSize(): number {
        return maxSize;
    }
}
