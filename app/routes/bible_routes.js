// routes/bible_routes.js

//statement below defines a function that can be shared as  amodule in other files
module.exports = function(app, db)
                    {
		       //defining actions for a post request
                       app.post('/verses', (request, response) =>
				   {
				      console.log(request.body);
                                      response.send('Hello');
                                   }
                               );
}
