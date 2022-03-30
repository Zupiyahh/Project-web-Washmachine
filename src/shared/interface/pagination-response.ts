export interface PaginationResponseInterface<T = any> {
    items: T;
    total: number;
    limit: number;
    page: number;
}
