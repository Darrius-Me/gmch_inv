//
// $(document).ready(function(){
//   $("#search_item_table").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#item_table tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });

$(document).ready(function(){
  var i=1;
  $("#add_row").click(function(){
    $('#addr'+i).html("<td>"+ (i+1) +"</td><td><input name='name"+i+"' type='text' placeholder='Name' class='form-control input-md'  /> </td><td><input  name='mail"+i+"' type='text' placeholder='Mail'  class='form-control input-md'></td><td><input  name='mobile"+i+"' type='text' placeholder='Mobile'  class='form-control input-md'></td>");

    $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
    i++;
  });
  $("#delete_row").click(function(){
    if(i>1){
      $("#addr"+(i-1)).html('');
      i--;
    }
  });
});

function addrow()
{
  var table = document.getElementById("addtable");
  var row = table.insertRow(table.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);

  cell1.innerHTML = "<td><input type='text' name='name0' placeholder='ENTER HERE' class='form-control'/></td>";
  cell2.innerHTML = "<td><input type='text' name='name0' placeholder='ENTER HERE' class='form-control'/></td>";
  cell3.innerHTML = "<td><input type='text' name='name0' placeholder='ENTER HERE' class='form-control'/></td>";
  cell4.innerHTML = "<td><input type='text' name='name0' placeholder='ENTER HERE' class='form-control'/></td>";
  cell5.innerHTML = "<td><input type='text' name='name0' placeholder='ENTER HERE' class='form-control'/></td>";
  cell6.innerHTML = "<td><input type='text' name='name0' placeholder='ENTER HERE' class='form-control'/></td>";
  cell7.innerHTML = "<td><input type='text' name='name0' placeholder='ENTER HERE' class='form-control'/></td>";
  cell8.innerHTML = "<td><input type='text' name='name0' placeholder='ENTER HERE' class='form-control'/></td>";
}

function deleterow()
{
  var table = document.getElementById("addtable");
  if(table.rows.length > 2)
  {
    table.deleteRow(table.rows.length-1);
  }
}

function clicks()
{
  alert("CLICKED!");
}

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

function sel_dep(dep)
{
  document.getElementById("tableplaceholder").innerHTML = dep;
}

function get_po_items(po)
{
  // alert(po);
  // window.location.replace("http://www.w3schools.com");
}
