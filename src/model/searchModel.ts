import { makeAutoObservable } from "mobx";

class SearchModel {
  keyword: string;

  // constructor
  constructor() {
    this.keyword = "";

    makeAutoObservable(this);
  }
}

export const searchModel = new SearchModel();
