//
// $(document).ready(function(){
//   $("#search_item_table").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#item_table tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });
function searchtable()
{
  var input, txtfilter, table, tr, td, txtvalue, i, j, matchcount;

  input = document.getElementById("search_item_table");
  txtfilter = input.value.trim().toLowerCase();
  table = document.getElementById("item_table");
  tr = table.getElementsByTagName("tr");

  for(i = 1; i < tr.length; i++)
  {
    matchcount = 0;
    for(j = 0; j < tr[i].cells.length; j++)
    {
      td = tr[i].getElementsByTagName("td")[j];

      if(td)
      {
        txtvalue = td.innerText.trim().toLowerCase();
        // alert(txtvalue);
        if(txtvalue.includes(txtfilter))
        {
          tr[i].style.display = "";
          matchcount++;
        }
      }
    }
    if(matchcount == 0)
    {
      tr[i].style.display = "none";
    }
  }

}
