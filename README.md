# comment-system
## Server
Server is able to save a new comment to the systems and return all created
comments. To save comments used structures that store information in-memory.  
It is also implemented the validation of the correct format of the comment model: the comment author and comment fields must not be empty, the comment author field is no more than 100 characters long, the comment field is no more than 1000 characters long. In case of unsuccessful validation, return 400 Bad Request.
- The list of comments is received via the http-protocol by the GET method at url: / allComments, the received data is a list of pairs {author, comment}
- A new comment is added via the http-protocol using the POST method at url: / addComment , data: {author, comment}  
## Client
The client implement:
1. A form for viewing all comments, which will update the content asynchronously in real time (without reloading the page). 
2. The form for entering a new comment contain:
- field for entering username - required field, maximum field length 100 characters
- field for entering a comment - required field, the maximum length of the field is 1000 characters
- button - send, by clicking on which, it is validate the fields: username and comment, and in case of successful validation, send an asynchronous request to the server with a new comment. In case of unsuccessful validation, display a message.

