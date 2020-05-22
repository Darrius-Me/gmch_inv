//
// $(document).ready(function(){
//   $("#search_item_table").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#item_table tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });


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

  cell1.innerHTML = "<td id='addtable'><b>" + (table.rows.length -1) + "</b></td>";
  cell2.innerHTML = "<td><div class='form-row'><div class='form-group col-md-1'></div><div class='form-group col-md-3'><label for='it" + (table.rows.length -1) + "3'>Unit</label><input type='text' class='form-control' name='it" + (table.rows.length -1) + "3' placeholder='#'></div><div class='form-group col-md-3'><label for='it" + (table.rows.length -1) + "4'>Quantity</label><input type='text' class='form-control' name='it" + (table.rows.length -1) + "4' placeholder='#'></div><div class='form-group col-md-3'><label for='it" + (table.rows.length -1) + "5'>Unit Cost</label><input type='text' class='form-control' name='it" + (table.rows.length -1) + "5' placeholder='#'></div></div><div class='form-row'><div class='form-group col-md-1'></div><div class='form-group col-md-6'><label for='it" + (table.rows.length - 1) + "1'>Description</label><input type='text' class='form-control' name='it" + (table.rows.length - 1) + "1' placeholder='#'></div><div class='form-group col-md-3'><label for='it" + (table.rows.length -1) + "2'>Brand</label><input type='text' class='form-control' name='it" + (table.rows.length -1) + "2' placeholder='#'></div></div></td>";
}

function deleterow()
{
  var table = document.getElementById("addtable");
  if(table.rows.length > 2)
  {
    table.deleteRow(table.rows.length-1);
  }
}

function additem_process()
{
  // alert("added items");
  var desc = document.getElementById("adddelivery_description");
  var description = desc.options[desc.selectedIndex].text;

  var quantity = document.getElementById("adddelivery_quantity").value;
  var manufacturer = document.getElementById("adddelivery_manufacturer").value;
  var brand = document.getElementById("adddelivery_brand").value;
  var lotno = document.getElementById("adddelivery_lotno").value;
  var expiration_date = document.getElementById("adddelivery_expiration").value;
  var remarks = document.getElementById("adddelivery_remarks").value;

  var prevtable = document.getElementById("delivery_table");
  var prevtable_length = prevtable.rows.length;

 if(prevtable_length == 0)
 {
   var id = "1";
 }
 else
 {
   var previd = prevtable.rows[prevtable_length-1].cells[0].id;
   var id = parseInt(previd) + 1;
 }

  var table = document.getElementById("delivery_table");
  var row = table.insertRow(table.rows.length);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.id = id;

  cell1.innerHTML = '<td><b>' + table.rows.length + "</b></td>";
  // cell2.innerHTML = '<td><div class="container" style="text-align: left;"><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-6"><b>Product</b><br><input type="text" class="form-control" id="add_del_desc" value="' + description +'"readonly></div><div class="form-group col-md-3"><b>Quantity</b><br><input type="text" class="form-control" id="add_del_quantity" value="' + quantity + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-9"><b>Manufacturer</b><br><input type="text" class="form-control" id="add_del_manufacturer" value="' + manufacturer + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-3"><b>Brand</b><br><input type="text" class="form-control" id="add_del_brand" value="' + brand + '" readonly></div><div class="form-group col-md-3"><b>Lot Number</b><br><input type="text" class="form-control" id="add_del_lotno" value="' + lotno + '" readonly></div><div class="form-group col-md-3"><b>Expiration Date</b><br><input type="text" class="form-control" id="add_del_expiration" value="' + expiration_date + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-9"><b>Remarks</b><br><input type="text" class="form-control" id="add_del_remarks" value="' + remarks + '" readonly></div><div class="form-group col-md-2"><b>&nbsp</b><a class="pull-right btn btn-danger" onclick="deleteitem_process(' + id + ')" style="width:100%; color: white">Delete Item</a></div></div></td>';
  cell2.innerHTML = '<td><div class="container" style="text-align: left;"><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-6"><b>Product</b><br><input type="text" class="form-control" id="add_del_desc" name="del_date-' + table.rows.length + '" value="' + description +'"readonly></div><div class="form-group col-md-3"><b>Quantity</b><br><input type="text" class="form-control" id="add_del_quantity" value="' + quantity + '" name="del_quantity-' + table.rows.length + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-9"><b>Manufacturer</b><br><input type="text" class="form-control" id="add_del_manufacturer" value="' + manufacturer + '" name="del_manufacturer-' + table.rows.length + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-3"><b>Brand</b><br><input type="text" class="form-control" id="add_del_brand" value="' + brand + '" name="del_brand-' + table.rows.length + '" readonly></div><div class="form-group col-md-3"><b>Lot Number</b><br><input type="text" class="form-control" id="add_del_lotno" value="' + lotno + '" name="del_lotno-' + table.rows.length + '" readonly></div><div class="form-group col-md-3"><b>Expiration Date</b><br><input type="text" class="form-control" id="add_del_expiration" value="' + expiration_date + '" name="del_expiration_date-' + table.rows.length + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-9"><b>Remarks</b><br><input type="text" class="form-control" id="add_del_remarks" value="' + remarks + '" name="del_remarks-' + table.rows.length + '" readonly></div><div class="form-group col-md-2"><b>&nbsp</b><a class="pull-right btn btn-danger" onclick="deleteitem_process(' + id + ')" style="width:100%; color: white">Delete Item</a></div></div></td>';

  document.getElementById("adddelivery_quantity").value = "";
  document.getElementById("adddelivery_manufacturer").value = "";
  document.getElementById("adddelivery_brand").value = "";
  document.getElementById("adddelivery_lotno").value = "";
  document.getElementById("adddelivery_expiration").value = "";
  document.getElementById("adddelivery_remarks").value = "";

}

function deleteitem_process(clicked_id)
{
  var table = document.getElementById("delivery_table");
  var table_length = table.rows.length;
  for(var i = 0; i < table_length; i++)
  {
    if(table.rows[i].cells[0].id == clicked_id)
    {
      table.deleteRow(i);
      break;
    }
  }

  table_length = table.rows.length;
  for(var i = 0; i < table_length; i++)
  {
    table.rows[i].cells[0].innerHTML = '<td><b>' + (i + 1) + "</b></td>";;
    
    // table.rows[i].cells[1].innerHTML = '<td><div class="container" style="text-align: left;"><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-6"><b>Product</b><br><input type="text" class="form-control" id="add_del_desc" name="del_date-' + (i + 1) + '""readonly></div><div class="form-group col-md-3"><b>Quantity</b><br><input type="text" class="form-control" id="add_del_quantity" name="del_quantity-' + (i + 1) + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-9"><b>Manufacturer</b><br><input type="text" class="form-control" id="add_del_manufacturer" name="del_manufacturer-' + (i + 1) + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-3"><b>Brand</b><br><input type="text" class="form-control" id="add_del_brand" name="del_brand-' + (i + 1) + '" readonly></div><div class="form-group col-md-3"><b>Lot Number</b><br><input type="text" class="form-control" id="add_del_lotno" name="del_lotno-' + (i + 1) + '" readonly></div><div class="form-group col-md-3"><b>Expiration Date</b><br><input type="text" class="form-control" id="add_del_expiration" name="del_expiration_date-' + (i + 1) + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-9"><b>Remarks</b><br><input type="text" class="form-control" id="add_del_remarks" name="del_remarks-' + (i + 1) + '" readonly></div><div class="form-group col-md-2"><b>&nbsp</b><a class="pull-right btn btn-danger" onclick="deleteitem_process(' + table.rows[i].cells[0].id + ')" style="width:100%; color: white">Delete Item</a></div></div></td>';
  }
  // alert("this");
}

$('table').find('tr').each(function()
{
  var trResult= '';
  $(this).find('td').each(function()
  {
    if(trResult.indexOf($(this).val()) ===-1)
    trResult += $(this).val() +';';
  });
});

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
