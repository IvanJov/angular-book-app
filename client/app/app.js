'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';


import {
  routeConfig
} from './app.config';

import book from '../components/book/book.component';
import bookThumbnail from '../components/book-thumbnail/book-thumbnail.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';

import './app.scss';

angular.module('angularBooksAppApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap,
  bookThumbnail, book, main, constants, util
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['angularBooksAppApp'], {
      strictDi: true
    });
  });
