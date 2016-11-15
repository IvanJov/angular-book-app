import angular from 'angular';

export class BookComponent {
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/books/' + this.bookid)
      .then(response => {
        this.book = response.data.book;
        this.similar = response.data.similar;
      });
  }
}

export default angular.module('directives.book', [])
  .component('book', {
    bindings: {
      bookid: '@'
    },
    template: require('./book.html'),
    controller: ['$http', BookComponent]
  })
  .name;
