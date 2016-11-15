import angular from 'angular';

export class BookThumbnailComponent {}

export default angular.module('directives.bookthumbnail', [])
  .component('bookthumbnail', {
    bindings: {
      book: '<'
    },
    template: require('./book-thumbnail.html'),
    controller: BookThumbnailComponent
  })
  .name;
