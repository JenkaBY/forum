const dateTimeFormat = 'yyyy/MM/dd HH:mm';
const dateFormat = 'yyyy/MM/dd';
const pageSize = 5;
const maxSize = 5;
const pageParam = 'page';
const sortParam = 'sort';
const sizeParam = 'size';

export class Constants {
    public static getDateTimeFormat(): string {
        return dateTimeFormat;
    }

    public static getDateFormat(): string {
        return dateFormat;
    }

    public static getPageSize(): number {
        return pageSize;
    }

    public static getPageParam(): string {
        return pageParam;
    }

    public static getSortParam(): string {
        return sortParam;
    }

    public static getSizeParam(): string {
        return sizeParam;
    }

    public static getMaxSize(): number {
        return maxSize;
    }
}