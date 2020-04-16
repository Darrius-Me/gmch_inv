$(document).ready(function(){
  $("#search_item_table").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#item_table tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
