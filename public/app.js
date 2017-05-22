// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + 
      data[i].title +'<br/>'+data[i].author +'<br/><img src="'+ 
      data[i].img +'>"<br><br/>'+ data[i].abstract+ "<br>" + data[i].link + "</p>");
  }
});


// Whenever someone clicks a saveNote tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
   $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2> ");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
    if (data.note) 
    {
      $("#notes").append("<br><h2>Comments</h2><br>");
      for(var i=0;i<data.note.length;i++)
      {
        // Place the title of the note in the title input
        $("#notes").append("<br><b>"+data.note[i].title+"</b><br>");
        // Place the body of the note in the body textarea
        $("#notes").append("<br>"+data.note[i].body+"<br>");

        $("#notes").append("<br><button type='button'data-id='"+data.note[i]._id+"'parent_id='"+thisId+"'id='delete'>Delete</button><br>");

      }
    }
      
    });
});

// When you click the savenote button
$(document).on("click", "#delete", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  var parentId = $(this).attr("parent_id");
  alert(parentId);
  
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/comments/delete/" + thisId+"/"+parentId
    
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });


});
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  
  
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
