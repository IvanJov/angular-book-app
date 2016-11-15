/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/books              ->  index
 * GET     /api/books/:id          ->  show
 */

'use strict';

import books from '~/book.json';
import _ from 'lodash';
import moment from 'moment';

// Add human readable format and shorter name if it's longer than 20, and we are saving default name for searching
books.map(book => {
  book.humanFrom = moment(book.published).from(moment());
  if (book.name.length > 30)
    book.shorterName = book.name.substring(0, 30) + '...';
  else
    book.shorterName = book.name;

  return book;
});

// Gets a list of Books
export function index(req, res) {
  return res.json(books);
}

// Gets a single Book
export function show(req, res) {
  let book = _.find(books, {id: req.params.id});

  let similar = _.chain(books)
    .filter(currentBook => book.id != currentBook.id)
    .filter(currentBook => book.genre.name === currentBook.genre.name && book.genre.category === currentBook.genre.category)
    .shuffle()
    .slice(0, 3)
    .value();

  return res.json({
    book: book,
    similar: similar
  });
}
