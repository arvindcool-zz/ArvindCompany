 var flightdata=[];
 function renderFlights(){
    var isdeploy="false";
    $('#services').show();
    $("#flightContainer").empty();
    var from= $("#from option:selected" ).text();
    var to=$("#to option:selected" ).text();
    if(from == to ){
      alert("Please choose different locations for From and To");
      return false;
    }
    var userdate=$('#date').val();
    if( typeof userdate === 'undefined' || userdate === null || userdate ==""){
      alert("Plese enter valid date for your travel");
      return false;
    }
   var dateobj = new Date(userdate);
   userdatemillis=dateobj.getTime();
   dateobj=new Date();
   var currdate=dateobj.getTime();
   var diffDays = parseInt((currdate - userdatemillis) / (1000 * 60 * 60 * 24)); 
   if(diffDays > 0){
      alert("Plese enter valid date for your travel");
      return false;
    }
    if(isdeploy=="true"){
    var data="from="+from+"&to="+to; //no i18n
    $.ajax({
    url: 'http://localhost:9059/api/flight',
    type: 'GET',
    data:data,
    dataType: 'json',
    success: function (result) {
      flightdata=result;
      var showdata=[];
     for(var i=0;i<flightdata.length;i++){
        var arr=flightdata[i].Arrives.split("T");
        if(flightdata[i].From == from && flightdata[i].To == to && arr[0] == userdate){
          showdata.push(flightdata[i]);
        }
     }
      var theTemplateScript = $("#flightTemplate").html();
  // Compile the template
     var theTemplate = Handlebars.compile(theTemplateScript);
  // Define our data object
 
  // Pass our data to the template

    var theCompiledHtml = theTemplate(showdata);

  // Add the compiled html to the page
  $('#flightContainer').append(theCompiledHtml);
  
    },
    error: function (request, message, error) {
      alert("Some error occured pls try again later");
      return false;
    }
  });
  }
    else{
     flightdata=[{"From":"SEA","To":"PHX","FlightNumber":1000,"Departs":"2017-07-21T18:00:00","Arrives":"2017-07-22T20:00:00","MainCabinPrice":120.00,"FirstClassPrice":200.00},{"From":"SEA","To":"PHX","FlightNumber":1000,"Departs":"2017-07-22T18:00:00","Arrives":"2017-07-22T20:00:00","MainCabinPrice":100.00,"FirstClassPrice":200.00},{"From":"SEA","To":"PHX","FlightNumber":1001,"Departs":"2017-07-22T19:00:00","Arrives":"2017-07-22T21:00:00","MainCabinPrice":110.00,"FirstClassPrice":190.00},{"From":"SEA","To":"PHX","FlightNumber":1002,"Departs":"2017-07-22T16:00:00","Arrives":"2017-07-22T18:00:00","MainCabinPrice":99.00,"FirstClassPrice":175.00},{"From":"SEA","To":"PHX","FlightNumber":1003,"Departs":"2017-07-22T07:00:00","Arrives":"2017-07-22T09:00:00","MainCabinPrice":132.00,"FirstClassPrice":214.00}];
     var showdata=[];
     for(var i=0;i<flightdata.length;i++){
        var arr=flightdata[i].Arrives.split("T");
        if(flightdata[i].From == from && flightdata[i].To == to && arr[0] == userdate){
          showdata.push(flightdata[i]);
        }
     }
     var theTemplateScript = $("#flightTemplate").html();
    // Compile the template
     var theTemplate = Handlebars.compile(theTemplateScript);
    // Define our data object
   
    // Pass our data to the template

      var theCompiledHtml = theTemplate(showdata);

    // Add the compiled html to the page
    $('#flightContainer').append(theCompiledHtml);
    if(showdata.length ==0){
      $('#flightContainer').empty();
      alert("No flights are available on the date chosen.");
    }
  }
}
 function renderFlightsSorted(data,stat,div){
    var from= $("#from option:selected" ).text();
    var to=$("#to option:selected" ).text();
    if(from == to ){
      alert("Please choose different locations for From and To");
      return false;
    }
    var userdate=$('#date').val();
    $('#services').show();
    $("#flightContainer").empty();
    var showdata=[];
     for(var i=0;i<data.length;i++){
        var arr=data[i].Arrives.split("T");
        if(data[i].From == from && data[i].To == to && arr[0] == userdate){
          showdata.push(data[i]);
        }
     }
   var theTemplateScript = $("#flightTemplate").html();
  // Compile the template
   var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
 
  // Pass our data to the template

    var theCompiledHtml = theTemplate(showdata);

  // Add the compiled html to the page
  $('#flightContainer').append(theCompiledHtml);

  if(stat =="up"){
    $(div).attr("src","img/down.png");
    $(div).attr("title","Sort in Ascending order");
  }
}

function bookFlights(){
    alert("Your ticket has been Booked");
}

function sortFareUp(div){
    var src=$(div).attr("src");
    if(src === "img/up.png"){
            if(div=="#sortfirstfare"){
               data=sortByKeyUp(flightdata,'FirstClassPrice');
            }
            else{
              data=sortByKeyUp(flightdata,'MainCabinPrice');
            }
            renderFlightsSorted(data,"up",div);
    }
    else if(src === "img/down.png"){
     var data=[{"From":"SEA","To":"PHX","FlightNumber":1000,"Departs":"2017-07-21T18:00:00","Arrives":"2017-07-22T20:00:00","MainCabinPrice":100.00,"FirstClassPrice":200.00},{"From":"SEA","To":"PHX","FlightNumber":1000,"Departs":"2017-07-22T18:00:00","Arrives":"2017-07-22T20:00:00","MainCabinPrice":100.00,"FirstClassPrice":200.00},{"From":"SEA","To":"PHX","FlightNumber":1001,"Departs":"2017-07-22T19:00:00","Arrives":"2017-07-22T21:00:00","MainCabinPrice":110.00,"FirstClassPrice":190.00},{"From":"SEA","To":"PHX","FlightNumber":1002,"Departs":"2017-07-22T16:00:00","Arrives":"2017-07-22T18:00:00","MainCabinPrice":99.00,"FirstClassPrice":175.00},{"From":"SEA","To":"PHX","FlightNumber":1003,"Departs":"2017-07-22T07:00:00","Arrives":"2017-07-22T09:00:00","MainCabinPrice":132.00,"FirstClassPrice":214.00}];
            if(div=="#sortfirstfare"){
               flightdata=sortByKeyDown(flightdata,'FirstClassPrice');
            }
            else{
              flightdata=sortByKeyDown(data,'MainCabinPrice');
            }
            renderFlightsSorted(flightdata,"down",div);
            }       
    }
function sortTime(div){
    var src=$(div).attr("src");
    for(var i=0;i<flightdata.length;i++){
      if(div=="#sortarrtime"){
        var date1=flightdata[i].Arrives;
      }
      else{
        var date1=flightdata[i].Departs;
      }
      var d = new Date(date1);
      var s=d.getTime();
      flightdata[i].timemillis=s;
    }
    if(src === "img/up.png"){
            flightdata=sortByKeyUp(flightdata,'timemillis');
            renderFlightsSorted(flightdata,"up",div);
    }
    else if(src === "img/down.png"){
            flightdata=sortByKeyDown(flightdata,'timemillis');
            renderFlightsSorted(flightdata,"down",div);
            } 

  }
function sortByKeyUp(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
function sortByKeyDown(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
$("#from").change(function(){
   var from= $("#from option:selected" ).text();
  var to=$("#to option:selected" ).text();
  if(from == to ){
    alert("Please choose different locations for From and To");
    return false;
  }
});
$("#to").change(function(){
       var from= $("#from option:selected" ).text();
  var to=$("#to option:selected" ).text();
  if(from == to ){
    alert("Please choose different locations for From and To");
    return false;
  }
});

