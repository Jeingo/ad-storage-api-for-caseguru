export type QueryAd = {
  sortBy: string;
  sortDirection: Direction;
  pageNumber: string;
  pageSize: string;
};

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}
