import app from './';

after(function(done) {
  app.angularBooksApp.on('close', () => done());
  app.angularBooksApp.close();
});
