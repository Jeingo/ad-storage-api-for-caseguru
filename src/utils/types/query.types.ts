export type QueryAllAds = {
  sortBy: string;
  sortDirection: Direction;
  pageNumber: string;
  pageSize: string;
};

export type QueryAd = {
  fields: boolean;
};

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}
