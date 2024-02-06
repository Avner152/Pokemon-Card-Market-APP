import { observable, action, makeObservable } from "mobx";

class MyStore {
  sets = [];
  set = [];
  cardsInSet = [];
  searchedPokemon = [];

  constructor() {
    makeObservable(this, {
      sets: observable,
      set: observable,
      cardsInSet: observable,
      searchedPokemon: observable,
      updateSets: action,
      updateSet: action,
      updateCardsInSet: action,
      updateSearchedPokemon: action,
    });
  }
  updateSets(newVal) {
    this.sets = [...newVal];
  }
  updateSet(newVal) {
    this.set = newVal;
  }
  updateCardsInSet(newVal) {
    this.cardsInSet = newVal;
  }
  updateSearchedPokemon(newVal) {
    this.searchedPokemon = newVal;
  }
}

const myStore = new MyStore();
export default myStore;
