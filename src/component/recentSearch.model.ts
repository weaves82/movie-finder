export enum searchType {
  Search = "updateMoviesSearch",
  Filter = "updateMoviesFilter",
  Random = "updateRandomMovie",
}

export interface recentSearch {
  recentSearch: {
    searchPayload: {};
    searchType: searchType;
  };
}
