//
// $(document).ready(function(){
//   $("#search_item_table").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#item_table tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });
$('.datepicker').datepicker();

function checkdate()
{
  var date = document.getElementById("indate");
  var datetxt = date.value.trim().toLowerCase();

  if(!datetxt.includes("/"))
  {
    error_fomat("Date");
    return;
  }

  var dates = datetxt.split("/");

  if(dates.length!=3)
  {
    error_fomat("Date");
    return;
  }

  if((dates[0] < 0) || (dates[0] > 12))
  {
    error_fomat("Date");
    return;
  }

  if(dates[2].length!=4)
  {
    error_fomat("Date");
    return;
  }

  if(dates[0]==1 || dates[0]==3 || dates[0]==5 || dates[0]==7 || dates[0]==8 || dates[0]==10  || dates[0]==12)
  {
    if(dates[1] < 0 || dates[1] > 31)
    {
      error_fomat("Date");
      return;
    }
  }
  else if(dates[0]==4 || dates[0]==6 || dates[0]==9 || dates[0]==11)
  {
    if(dates[1] < 0 || dates[1] > 30)
    {
      error_fomat("Date");
      return;
    }
  }
  else if(dates[0]==2)
  {
    if(checkleap(dates[2]))
    {
      if(dates[1] < 0 || dates[1] > 29)
      {
        error_fomat("Date");
        return;
      }
    }
    else
    {
      if(dates[1] < 0 || dates[1] > 28)
      {
        error_fomat("Date");
        return;
      }
    }
  }

}

function checkleap(year)
{
  if (year % 4 != 0)
    return false;
  else if (year % 400 == 0)
    return true;
  else if (year % 100 == 0)
    return false;
  else
    return true;
}

function error_fomat(field)
{
  // alert("Error " + field + " Format!");
}

function validate_add()
{
  checkdate();
}

function addrow()
{
  var table = document.getElementById("addtable");
  var row = table.insertRow(table.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = "<td><input type='text' name='it" + (table.rows.length - 2) +"1' placeholder='ENTER HERE' class='form-control'/></td>";
  cell2.innerHTML = "<td><input type='text' name='it" + (table.rows.length - 2) +"2' placeholder='ENTER HERE' class='form-control'/></td>";
  cell3.innerHTML = "<td><input type='text' name='it" + (table.rows.length - 2) +"3' placeholder='ENTER HERE' class='form-control'/></td>";
  cell4.innerHTML = "<td><input type='text' name='it" + (table.rows.length - 2) +"4' placeholder='ENTER HERE' class='form-control'/></td>";
  cell5.innerHTML = "<td><input type='text' name='it" + (table.rows.length - 2) +"5' placeholder='ENTER HERE' class='form-control'/></td>";
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
