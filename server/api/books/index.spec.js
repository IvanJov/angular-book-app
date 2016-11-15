'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var booksCtrlStub = {
  index: 'booksCtrl.index',
  show: 'booksCtrl.show'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var thingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './books.controller': booksCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    thingIndex.should.equal(routerStub);
  });

  describe('GET /api/books', function() {
    it('should route to books.controller.index', function() {
      routerStub.get
        .withArgs('/', 'booksCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/books/:id', function() {
    it('should route to books.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'booksCtrl.show')
        .should.have.been.calledOnce;
    });
  });
});
