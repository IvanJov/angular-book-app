import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import _ from 'lodash';

export class MainController {

  books = [];
  savedBooks = [];
  pager = {};
  items = [];
  genres = [];
  categories = [];
  filterCategory = 'all';
  filterGenre = 'all';
  filterText = '';

  /* @ngInject */
  constructor($http, pagerService) {
    this.$http = $http;
    this.pagerService = pagerService;
  }

  $onInit() {
    this.$http.get('/api/books')
      .then(response => {
        this.savedBooks = response.data; // we don't wanna lose books data
        this.books = response.data;

        this.categories = _.chain(this.books)
          .groupBy('genre.category')
          .keys()
          .value();

        this.setPage(1);
      });
  }

  onCategoryChange() {
    this.updateGenres();
    this.updateFilter();
  }

  updateGenres() {
    this.filterGenre = 'all';
    this.genres = _.chain(this.savedBooks)
      .filter(book => this.filterCategory === 'all' || book.genre.category === this.filterCategory)
      .groupBy('genre.name')
      .keys()
      .value();
  }

  updateFilter() {
    this.books = _.filter(this.savedBooks, book => {
      let sameCategory = this.filterCategory === 'all' || book.genre.category === this.filterCategory;
      let sameGenre = this.filterGenre === 'all' || book.genre.name === this.filterGenre;
      let sameText = this.filterText === '' || book.author.name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 || book.name.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1;
      return sameCategory && sameGenre && sameText;
    });

    this.setPage(1);
  }

  setPage(page) {
    if (page < 1) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.books.length, page, 9);

    // get current page of items
    this.items = this.books.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}

export class pagerService {

  // service implementation
  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  static pagerServiceFactory(){
    return new pagerService();
  }
}

export default angular.module('angularBooksAppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: ['$http', 'pagerService', MainController]
  })
  .factory('pagerService', pagerService.pagerServiceFactory)
  .name;
