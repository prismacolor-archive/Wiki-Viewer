var box = document.getElementById("box");
var search = document.getElementById("search");
var response = box.value;

search.addEventListener("click", function(){
  pullData();
});

box.addEventListener("keydown", function(event){
    if (event.which == 13) {
      pullData();
    }
  });

function pullData() {
  var api = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ box.value +"&format=json&callback=?";

  $("ul").empty();

  if (box.value.length == 0) {
    alert("You must enter search parameters to continue.")
  }

  $.ajax({
    type:"GET",
    url:api,
    async:false,
    dataType:"json",
    success: function(data){
      console.log(data);
      
      var title = data[1];
      var def = data[2];
      var link = data[3];

      for(i=0; i < title.length; i++) {
         $("ul").append('<li><h3 class="name"><a class="links" target="_blank" href="https://en.wikipedia.org/wiki/' + title[i] + '">' + title[i] + '</a></h3><p class="definition">' + def[i] + '</p></li>');
      }

      box.value = "";
      
    },
    error: function(errorMessage){
      alert("Your search has returned 0 results.")
    }

  });

}
