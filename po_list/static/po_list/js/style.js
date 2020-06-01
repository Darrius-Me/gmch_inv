//
// $(document).ready(function(){
//   $("#search_item_table").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#item_table tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });


function validate_delivery(key)
{
  if(key == "date-invoice")
  {
    var date = document.getElementById("delivery_date");
    var invoice = document.getElementById("delivery_invoice");
    if(date.value == null || date.value == "" || invoice.value == null || invoice.value == "")
    {
      // alert(document.getElementById("delivery_table").rows.length);
      document.getElementById("adddelivery_remarks").scrollIntoView();
      document.getElementById("error_delivery_label").innerHTML = "<p><b>Invalid DELIVERY DATE or INVOICE.<br>Please enter the correct details.</b></p>";
      $("#error_delivery").modal();
    }
    else if(document.getElementById("delivery_table").rows.length == 0)
    {
      document.getElementById("error_delivery_label").innerHTML = "<p><b>No item was added in the delivery.<br>Please enter the correct details.</b></p>";
      $("#error_delivery").modal();
    }
    else
    {
      $("#proceed_delivery").modal();
    }
  }
  else if(key == "item-delivery")
  {
    var desc = document.getElementById("adddelivery_description");
    var desc_temp = desc.options[desc.selectedIndex].value.split("-");
    var description = desc_temp[0];
    var quantity = document.getElementById("adddelivery_quantity").value;
    var manufacturer = document.getElementById("adddelivery_manufacturer").value;
    var brand = document.getElementById("adddelivery_brand").value;
    var lotno = document.getElementById("adddelivery_lotno").value;
    var expiration_date = document.getElementById("adddelivery_expiration").value;
    var remarks = document.getElementById("adddelivery_remarks").value;

    if(description == "" || description == null || quantity == "" || quantity == null || manufacturer == "" || manufacturer == null || brand == "" || brand == null || lotno == "" || lotno == null || expiration_date == "" || expiration_date == null)
    {
      document.getElementById("adddelivery_toggle").scrollIntoView();
      document.getElementById("error_delivery_label").innerHTML = "<p><b>All entries should be filled except REMARKS.<br>Please enter the correct details.</b></p>";
      $("#error_delivery").modal();
    }
    else
    {
      additem_process();
    }
  }
}

function verifyadd()
{
  var table = document.getElementById("addtable_main");
  var table_length = table.rows.length-1;

  var unit = document.getElementById("it" + table_length + "3").value;
  var quantity = document.getElementById("it" + table_length + "4").value;
  var unit_cost = document.getElementById("it" + table_length + "5").value;
  var description = document.getElementById("it" + table_length + "1").value;
  var brand = document.getElementById("it" + table_length + "2").value;

  if(unit == "" || unit == null)
    return "Unit!";
  else if(quantity == "" || quantity == null)
    return "Quantity!";
  else if(unit_cost == "" || unit_cost == null)
    return "Unit Cost!";
  else if(description == "" || description == null)
    return "Description!";
  else if(brand == "" || brand == null)
    return "Brand!";
  else
    return "NO ERROR";
}

function addrow()
{
  var verified = verifyadd();
  if(verified == "NO ERROR")
  {
    var table = document.getElementById("addtable_main");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = "<td ><b>" + (table.rows.length -1) + "</b></td>";
    cell2.innerHTML = "<td><div class='form-row'><div class='form-group col-md-1'></div><div class='form-group col-md-3'><label for='it" + (table.rows.length -1) + "3'>Unit</label><input type='text' class='form-control' name='it" + (table.rows.length -1) + "3' id='it" + (table.rows.length -1) + "3' placeholder='#'></div><div class='form-group col-md-3'><label for='it" + (table.rows.length -1) + "4'>Quantity</label><input type='text' class='form-control' name='it" + (table.rows.length -1) + "4' id='it" + (table.rows.length -1) + "4' placeholder='#'></div><div class='form-group col-md-3'><label for='it" + (table.rows.length -1) + "5'>Unit Cost</label><input type='text' class='form-control' name='it" + (table.rows.length -1) + "5' id='it" + (table.rows.length -1) + "5' placeholder='#'></div></div><div class='form-row'><div class='form-group col-md-1'></div><div class='form-group col-md-6'><label for='it" + (table.rows.length - 1) + "1'>Description</label><input type='text' class='form-control' name='it" + (table.rows.length - 1) + "1' id='it" + (table.rows.length - 1) + "1' placeholder='#'></div><div class='form-group col-md-3'><label for='it" + (table.rows.length -1) + "2'>Brand</label><input type='text' class='form-control' name='it" + (table.rows.length -1) + "2' id='it" + (table.rows.length -1) + "2' placeholder='#'></div></div></td>";
  }
  else
  {
    // alert("Error " + verified);
    // document.getElementById("adddelivery_toggle").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error " + verified + " All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
}

function submit_add()
{
  var inpo = document.getElementById("inpo").value;
  var insup = document.getElementById("insup").value;
  var inadd = document.getElementById("inadd").value;
  var indate = document.getElementById("indate").value;
  var inmode = document.getElementById("inmode").value;
  var inpr = document.getElementById("inpr").value;
  var intr = document.getElementById("intr").value;
  var delplace = document.getElementById("delplace").value;
  var delterm = document.getElementById("delterm").value;
  var deldate = document.getElementById("deldate").value;
  var payterm = document.getElementById("payterm").value;

  if(inpo == "" || inpo == null)
  {
    document.getElementById("addfirsthalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error PO Number! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(insup == "" || insup == null)
  {
    document.getElementById("addfirsthalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error Supplier! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(inadd == "" || inadd == null)
  {
    document.getElementById("addfirsthalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error Address! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(indate == "" || indate == null)
  {
    document.getElementById("addfirsthalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error Date! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(inmode == "" || inmode == null)
  {
    document.getElementById("addfirsthalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error Mode of Procurement! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(inpr == "" || inpr == null)
  {
    document.getElementById("addfirsthalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error PR Number All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(intr == "" || intr == null)
  {
    document.getElementById("addfirsthalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error Tracking Number! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(delplace == "" || delplace == null)
  {
    document.getElementById("addsecondhalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error Delivery Place! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(delterm == "" || delterm == null)
  {
    document.getElementById("addsecondhalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error Delivery Term! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(deldate == "" || deldate == null)
  {
    document.getElementById("addsecondhalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error Delivery Date! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else if(payterm == "" || payterm == null)
  {
    document.getElementById("addsecondhalf").scrollIntoView();
    document.getElementById("error_add_label").innerHTML = "<p><b>Error Payment Term! All entries should be filled.<br>Please enter the correct details.</b></p>";
    $("#error_add").modal();
  }
  else
  {
    $("#proceed_add").modal();
  }
}

function deleterow()
{
  var table = document.getElementById("addtable_main");
  if(table.rows.length > 2)
  {
    table.deleteRow(table.rows.length-1);
  }
}

function additem_process()
{
  // alert("added items");
  var desc = document.getElementById("adddelivery_description");
  var desc_temp = desc.options[desc.selectedIndex].value.split("-");
  var description = desc_temp[0];
  var item_id = desc_temp[1];
  var unit_cost = desc_temp[2];

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
  cell2.innerHTML = '<td><div class="container" style="text-align: left;"><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-6"><b>Product</b><br><input type="text" class="form-control" id="add_del_desc" name="it-1-' + table.rows.length + '" value="' + description +'"readonly></div><div class="form-group col-md-3"><b>Quantity</b><br><input type="text" class="form-control" id="add_del_quantity" value="' + quantity + '" name="it-2-' + table.rows.length + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-9"><b>Manufacturer</b><br><input type="text" class="form-control" id="add_del_manufacturer" value="' + manufacturer + '" name="it-3-' + table.rows.length + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-3"><b>Brand</b><br><input type="text" class="form-control" id="add_del_brand" value="' + brand + '" name="it-4-' + table.rows.length + '" readonly></div><div class="form-group col-md-3"><b>Lot Number</b><br><input type="text" class="form-control" id="add_del_lotno" value="' + lotno + '" name="it-5-' + table.rows.length + '" readonly></div><div class="form-group col-md-3"><b>Expiration Date</b><br><input type="text" class="form-control" id="add_del_expiration" value="' + expiration_date + '" name="it-6-' + table.rows.length + '" readonly></div></div><div class="form-row"><div class="form-group col-md-1"></div><div class="form-group col-md-9"><b>Remarks</b><br><input type="text" class="form-control" id="add_del_remarks" value="' + remarks + '" name="it-7-' + table.rows.length + '" readonly><input type="hidden" name="it-8-' + table.rows.length + '" value="' + item_id +'"><input type="hidden" name="it-9-' + table.rows.length + '" value="' + unit_cost +'"></div><div class="form-group col-md-2"><b>&nbsp</b></div></div></td>';

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

  if(table.rows.length > 0)
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
