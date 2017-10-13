// routes/bible_routes.js

var ObjectID = require('mongodb').ObjectID;

//statement below defines a function that can be shared as  amodule in other files
module.exports = function(app, database)
  {
     app.put( '/verses/:id',
              (request, response) =>
	      {
                 const id = request.params.id;
                 const details = { '_id' : new ObjectID(id) };
                 const verse = { book        : request.body.book,
                                 chapter_num : request.body.chapter_num,
                                 verse_num   : request.body.verse_num,
                                 verse       : request.body.verse
                               };
                 database.collection('verses').update( details,
                                                       verse,
                                                       (error, item) =>
                                                       {
						          if(error)
                                                          {
							     response.send( {'error' : 'An error occured'} );
                                                          }
                                                          else
                                                          {
							     response.send(verse);
                                                          }
                                                       }
                                                     )
              }
            )
     app.delete( '/verses/:id',
                 (request, response) =>
                 {
                    const id = request.params.id;
                    const details = { '_id' : new ObjectID(id) };
                    database.collection('verses').remove( details,
                                                          (error, item) =>
                                                          {
                                                             if(error)
                                                             {
							        response.send( { 'error' : 'An error occurred' } );
                                                             }
                                                             else
                                                             {
							        resposne.send('Verse ' + id + 'deleted!');
                                                             }
                                                          }
                                                        )
                 }
               )
     app.get( '/verses/:id',
	      (request, response) =>
              {
                 const id = request.params.id;
                 const details = { '_id': new ObjectID(id) };
                 database.collection('verses').findOne( details,
                                                        (error, item) =>
                                                        {
                                                           if(error)
		                                           {
                        			              response.send({'error':'An error occurred'});
                                                           }
                                                           else
							   {
						              response.send(item);
							   }
                                                        }
                                                      );
              }
            );

     //defining actions for a post request
     app.post('/verses', (request, response) =>
		           {
                              const verse = {
					      book        : request.body.book,
					      chapter_num : request.body.chapter_num,
					      verse_num   : request.body.verse_num,
					      verse       : request.body.verse
				            };
		              database.collection('verses').insert( verse,
							            (error, results) =>
							            {
                                                                       if(error)
                                                                       {
							                  response.send({'error':'An error occurred '});
                                                                       }
                                                                       else
                                                                       {
				                 	                  response.send(results.ops[0]);
                                                                       }
                                                                    }
                                                                  );
                           }
             );
  }
