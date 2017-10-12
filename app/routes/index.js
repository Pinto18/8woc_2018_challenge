// routes/index.js

const bibleRoutes = require('./bible_routes');

module.exports = function(app, db)
                 {
		     bibleRoutes(app,db);
                 }
