'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  });

  $stateProvider.state('book', {
    url: '/{bookId}',
    templateProvider: $stateParams => { return '<book bookid="' + $stateParams.bookId + '"></book>' }
  });
}
