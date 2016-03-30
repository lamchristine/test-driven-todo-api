// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

   todos.forEach(function (element) {
     //q=discover

     var queryString = req.body.task;
     var word = queryString.substring( queryString.indexOf("=") ); //gives you everything after =

     var results = todos.match(word);
     console.log(results);
     res.send(results);
   });

});

app.get('/api/todos', function index(req, res) {
  res.send({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */

   var newID = todos.length + 1;
  //  console.log(id);
  //  var newID = parseID + 1;
   console.log(newID);

   var newTask = req.body.task;
   console.log(newTask);
   var newDescription = req.body.description;

   var newTodo = {_id:newID, task:newTask, description:newDescription};
   todos.push(newTodo);
   res.send(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */

  var id = req.params.id;
  // console.log(id);
  var parseID = parseInt(id);

  todos.forEach(function (element) {
    if (element._id === parseID) {
      res.send(element);
    }
  });
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var id = req.params.id;
   var parseID = parseInt(id);

   var newTask = req.body.task;
   var newDescription = req.body.description;

   todos.forEach(function(element){
     if (element._id === parseID) {
       element.task = newTask;
       element.description = newDescription;

       res.send(element);
     }
   });
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */

var id = req.params.id;
var parseID = parseInt(id);
// console.log(todos)

todos.forEach(function (element){
  if (element._id === parseID) {
    todos.splice (parseID-1,1);
    res.send({});
  }
});
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
