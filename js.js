$(document).ready(function () {
    toonLijst();
});

// Database uitlezen

function toonLijst() {

         $(document).ready(function () {
             $.getJSON("uitlees.php")
             .done(function (data) {
                 var output = "<ul>";
                 for (var i in data) {
                     output += "<br><li class='card'><br><img src='img/pin.png' id='roodpin' alt='Rood pinnetje' width='45' height='auto' style='margin-left: 0px;'><h3>" + data[i].title + "</h3><br>";
                     if (data[i].complete == 1) {
                         output += "<div class='statusV'>Status: Voltooid <i class='fas fa-check'></i></div><br>";
                         output += '<td><button type="button" class="btn btn-warning" class="kaartknop" data-titel="' + data[i].title + '" data-id="' + data[i].id + '" id="openKnop">Open zetten</button></td>';
                     } else {
                         output += "<div class='statusO'>Status: Open <i class='fas fa-signature'></i></div><br>";
                         output += '<td><button type="button" class="btn btn-primary" class="kaartknop" data-titel="' + data[i].title + '" data-id="' + data[i].id + '" data-toggle="modal" data-target="#pasaanModal" id="pasaanKnop">Wijzig</button></td>';
                         output += '<td><button type="button" class="btn btn-success" class="kaartknop" data-titel="' + data[i].title + '" data-id="' + data[i].id + '" id="voltooiKnop">Voltooien</button></td>';
                     }

                     if (data[i].complete) {
                            output += '<td><button type="button" class="btn btn-danger" class="kaartknop" data-titel="' + data[i].title + '" data-id="' + data[i].id + '" data-toggle="modal" data-target="#verwijderModal" id="verwijderKnop">Verwijder</button></td><br><br>';
                        }

                     output += "</li>";
                 }
                 output += "</ul>";
                 $("#lijst").html(output);
             });
         });
    }
    $(document).on('click', '#pasaanKnop', function () {
        // Het ID & Titel uitlezen
    var titel = $(this).data('titel');
    console.log("titel = " + titel);
    $("#pasaanModal-label").html(titel);
    var id = $(this).data('id');
    console.log(id);
    $("#aanpasInfo").html("ID: " + id + "");
    $("#aanpasID").html("ID: " + id + "");
        
/*
$(document).ready(function () {
    var afstand = Math.floor(Math.random() * 400); 
                 console.log(afstand);
    document.getElementById("roodpin").style.left = "" + afstand + "px";
});
*/

// Aanpas script

    $(document).ready(function(){
           $("#knopaanpas").click(function () {
           $("#knopaanpas").attr("disabled", "disabled");
           var aanpasinvoer = $('#aanpasinvoer').val();
           if(aanpasinvoer!="") {
               $.ajax({
                   url: "aanpas.php",
                   type: "POST",
                   data: {
                       aanpasid: id,
                       aanpasinvoer: aanpasinvoer				
                   },
                   cache: false,
                   success: function(dataResult){
                       var dataResult = JSON.parse(dataResult);
                       if(dataResult.statusCode==200){
                           $("#knopaanpas").removeAttr("disabled");
                           $('#aanpasform').find('input:text').val('');
                           $("#successaanpas").show();
                           $('#successaanpas').html('Aangepast!').fadeOut(6500);
                           toonLijst();				
                       }
                       else if(dataResult.statusCode==201){
                          
                       }
                       
                   }
               });
           }
           else{
               alert('Vul alles in!');
           }
       });
   });
});

// Toevoeg script

$(document).ready(function(){
    $("#knop").click(function () {
    $("#knop").attr("disabled", "disabled");
    var invoer = $('#invoer').val();
    if(invoer!="") {
        $.ajax({
            url: "voegtoe.php",
            type: "POST",
            data: {
                invoer: invoer				
            },
            cache: false,
            success: function(dataResult){
                var dataResult = JSON.parse(dataResult);
                if(dataResult.statusCode==200){
                    $("#knop").removeAttr("disabled");
                    $('#invoegform').find('input:text').val('');
                    $("#success").show();
                    $('#success').html('Toegevoegd!').fadeOut(6500);
                    toonLijst();						
                }
                else if(dataResult.statusCode==201){
                   alert("Error, gebruik normale letters of probeer opnieuw");
                }
                
            }
        });
    }
    else{
        alert('Vul alles in!');
    }
  });
});

// Verwijderen

$(document).on('click', '#verwijderKnop', function () {
    $("#knopverwijder").show();
    // Het ID & Titel uitlezen
var titel = $(this).data('titel');
console.log("titel = " + titel);
$("#verwijderModal-label").html("Weet je zeker dat je <strong>" + titel + "</strong> wilt verwijderen?");
var id = $(this).data('id');
console.log(id);
$("#verwijderInfo").html("ID: " + id + "");
$("#verwijderID").html("ID: " + id + "");

$(document).ready(function(){
       $("#knopverwijder").click(function () {
       $("#knopverwijder").attr("disabled", "disabled");
       if(id!="") {
           $.ajax({
               url: "verwijder.php",
               type: "POST",
               data: {
                   verwijderid: id				
               },
               cache: false,
               success: function(dataResult){
                   var dataResult = JSON.parse(dataResult);
                   if(dataResult.statusCode==200){
                       $("#knopverwijder").removeAttr("disabled");
                       $('#verwijderform').find('input:text').val('');
                       $("#successverwijder").show();
                       $("#knopverwijder").hide();
                       $('#laatmaarknop').html('Sluiten');
                       $('#successverwijder').html('Verwijderd!').fadeOut(6500);
                       toonLijst();						
                   }
                   else if(dataResult.statusCode==201){
                      alert("Error, gebruik normale letters of probeer opnieuw");
                   }
                   
               }
           });
       }
       else{
           alert('Vul alles in!');
       }
     });
   });
});

$(document).ready(function(){
    $(document).on('click', '#voltooiKnop', function () {
            // Het ID & Titel uitlezen
        var titel = $(this).data('titel');
        console.log("titel = " + titel);
        var id = $(this).data('id');
        
// Voltooi script
    
               $("#voltooiKnop").attr("disabled", "disabled");
               var status = 1
               if(id!="") {
                   $.ajax({
                       url: "aanpas.php",
                       type: "POST",
                       data: {
                           aanpasid: id,
                           aanpasstatus: status				
                       },
                       cache: false,
                       success: function(dataResult){
                           var dataResult = JSON.parse(dataResult);
                           if(dataResult.statusCode==200){
                               $("#successmain").show();
                               $('#successmain').html('Aangepast!').fadeOut(6500);
                               toonLijst();					
                           }
                           else if(dataResult.statusCode==201){
                              
                           }
                           
                       }
                   });
               }
               else{
                   alert('Vul alles in!');
               }
           });
       });
       $(document).ready(function(){
        $(document).on('click', '#openKnop', function () {
                // Het ID & Titel uitlezen
            var titel = $(this).data('titel');
            console.log("titel = " + titel);
            var id = $(this).data('id');
            
// Open script
        
                   $("#openKnop").attr("disabled", "disabled");
                   var status = 2
                   if(id!="") {
                       $.ajax({
                           url: "aanpas.php",
                           type: "POST",
                           data: {
                               aanpasid: id,
                               aanpasstatus: status				
                           },
                           cache: false,
                           success: function(dataResult){
                               var dataResult = JSON.parse(dataResult);
                               if(dataResult.statusCode==200){
                                   $("#successmain").show();
                                   $('#successmain').html('Aangepast!').fadeOut(6500);
                                   toonLijst();						
                               }
                               else if(dataResult.statusCode==201){
                                  
                               }
                               
                           }
                       });
                   }
                   else{
                       alert('Vul alles in!');
                   }
               });
           });   
                  
