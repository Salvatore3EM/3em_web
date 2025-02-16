//SECTION LINGUA
function getLang() {
     var ln = localStorage.getItem("lang");
     if (ln == null) {
         setLang("it");
     }
     else {
         setFlag(ln);
         LoadOffers();
         $.getJSON("resources/language.json", function (data) {
             $.each(data.language[ln], (key, data) => {
                 $(key).html(data);
             });
         });
     }
 }
 function setLang(ln) {
     localStorage.removeItem("lang");
     localStorage.setItem("lang", ln);
     getLang();
 }
 function setFlag(ln) {
     if (ln == "it") {
           document.getElementById("flag").innerHTML =  "<img src='images/flag/italy.png'  />";
       }
       else if (ln == "en") {
         document.getElementById("flag").innerHTML = "<img src='images/flag/uk.png'  />";
       }
 }

//Section Menu

   $('.navbar-collapse a').on('click',function(){
     $(".navbar-collapse").collapse('hide');
   });
   if(document.title=="3EM Group"){
   $(window).scroll(function() {
     if ($(".navbar").offset().top > 50) {
       $(".navbar-fixed-top").addClass("top-nav-collapse");
         } else {
           $(".navbar-fixed-top").removeClass("top-nav-collapse");
         }
   });
 }
 else {
   $(".navbar-fixed-top").addClass("top-nav-collapse");
 }



const EmailTarget = ["recruitment@3em.it", "a.leone@3em.it"];
// File Upload Button
Array.prototype.forEach.call(
    document.querySelectorAll(".file-upload__button"),
    function(button) {
      const hiddenInput = button.parentElement.querySelector(
        ".file-upload__input"
      );
      const label = button.parentElement.querySelector(".file-upload__label");
      const defaultLabelText = "Nessun file selezionato";
  
      // Set default text for label
      label.textContent = defaultLabelText;
      label.title = defaultLabelText;
  
      button.addEventListener("click", function() {
        hiddenInput.click();
      });
  
      hiddenInput.addEventListener("change", function() {
        const filenameList = Array.prototype.map.call(hiddenInput.files, function(
          file
        ) {
          return file.name;
        });
  
        label.textContent = filenameList.join(", ") || defaultLabelText;
        label.title = label.textContent;
      });
    }
  );
function showSnackbar() {
  var x = document.getElementById("snackbar");
  x.classList.add("show");
}
// Mobile File Upload Button
function SetUpUplaodFileButton(){
     var label = $('#m_LabelUpload');
     var FileUpload = $('#m_File');
     var button = $('#m_Upload_button');
        document.querySelectorAll('#m_Upload_button')[0].addEventListener('click',function() {
          document.querySelectorAll('#m_File')[0].click();
          });
     $(FileUpload).on("change", function(e) {
               var fileName = e.target.files[0].name;
             $(label).text(fileName);
     });
}

 const toBase64 = file => new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);
 });
 function validateEmail(email) {
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
 }

 async function prepareEmail() {
    var Mittente = $('#txtEmail').val();
    var Subject = "3EM.IT LAVORA CON NOI - MAIL DA ["+Mittente+"] - " + $('#txtNome').val() + " " + $('#txtCognome').val() + " - " + $('#slcOggetto').val();
    var Body = $('#txtCorpo').val();
    var file = document.querySelector('#myFile').files[0];
    var isClean = true;
    if ($('#txtNome').val().trim() == "") 
    {
         isClean = false;
         $('#txtNome').css('border', '1px solid red');
    }
    else {
        $('#txtNome').css('border', '1px solid #ccc');
    }
    if( $('#txtCognome').val().trim() == ""){
         isClean = false;
         $('txtNome').css('border', '1px solid red');
    }
    else {
     $('#txtNome').css('border', '1px solid #ccc');
    }
    if ($('#slcOggetto').val().trim() == "") 
    {
         $('#slcOggetto').css('border', '1px solid red');
         isClean = false;
    }
    else {
         $('#slcOggetto').css('border', '1px solid #ccc');;
    }
    if(validateEmail(Mittente) != true)
    {
         $('#txtEmail').css('border', '1px solid red');
         isClean = false;
    }
    else {
        $('#txtEmail').css('border', '1px solid #ccc');;
    }
    if(Body.trim() == "") {
         $('#txtCorpo').css('border', '1px solid red');
         isClean = false;
    }
    else {
         $('#txtCorpo').css('border', '1px solid #ccc');;
    }
    if(document.getElementById("myFile").files.length == 0) {
         $('#fileError').show();
         isClean = false;
    }
    else {
         $('#fileError').hide();
    }
    if(isClean) {
    var Allegato = {
    Nome : $('#lblFile').text(),
    File : await toBase64(file)
    }
    EmailTarget.forEach((To) => {
     sendEmail(Mittente, To, Subject, Body, Allegato);
     });
    }
}

 async function prepareEmailMobile() {
     var Mittente = $('#m_txtEmail').val();
     var Subject = "3EM.IT LAVORA CON NOI - MAIL DA ["+Mittente+"] - " + $('#m_txtNome').val() + " " + $('#m_txtCognome').val() + " - " + $('#m_txtOggetto').val();
     var Body = $('#m_txtCorpo').val();
     var file = document.querySelector('#m_File').files[0];
     var isClean = true;
     if ($('#m_txtNome').val().trim() == "") 
     {
          isClean = false;
          $('#m_txtNome').css('border', '1px solid red');
     }
     else {
         $('#m_txtNome').css('border', '1px solid #ccc');
     }
     if( $('#m_txtCognome').val().trim() == ""){
          isClean = false;
          $('m_txtCognome').css('border', '1px solid red');
     }
     else {
      $('#m_txtCognome').css('border', '1px solid #ccc');
     }
     if ($('#m_txtOggetto').val().trim() == "") 
     {
          $('#m_txtOggetto').css('border', '1px solid red');
          isClean = false;
     }
     else {
          $('#m_txtOggetto').hide();
     }
     if(validateEmail(Mittente) != true)
     {
          $('#m_txtEmail').css('border', '1px solid red');
          isClean = false;
     }
     else {
         $('#m_txtEmail').css('border', '1px solid #ccc');;
     }
     if(Body.trim() == "") {
          $('#m_txtCorpo').css('border', '1px solid red');
          isClean = false;
     }
     else {
          $('#m_txtCorpo').css('border', '1px solid #ccc');;
     }
     if(document.getElementById("m_File").files.length == 0) {
          $('#m_fileError').show();
          isClean = false;
     }
     else {
          $('#m_fileError').hide();
     }
     if(isClean) {
     var Allegato = {
     Nome : $('#m_LabelUpload').text(),
     File : await toBase64(file)
     }
     EmailTarget.forEach((To) => {
          sendEmail(Mittente, To, Subject, Body, Allegato);
     });
     }
 }
function sendEmail(From, To, Subject, Body, Allegato) {

	Email.send({
    SecureToken : "a7c34612-0c0e-444b-aa84-2bda9f6feaa9",
    To : To,
    From : "e.calise@3em.it",
    Subject : Subject,
    Body : Body,
    Attachments : [
	{
		name : Allegato.Nome,
		data : Allegato.File
	}]
    }).then( x => { console.error(x);
     Swal.fire(
          'Candidatura Inviata',
          'La tua candidatura è stata inviata con successo',
          'success'
        )}
    );
}
let load = {
     title : "Plc Specialist Junior",
     description : "We're looking for a PLC Specialist Junior that will be able to do suck stuff",
     requirements: "SO Windows, Reading ITA and ENG, Rockwell siemens and other stuff",
     studyTitle: "3a Media ",
     experience: "2 anni di esperienza su lavori plc"
}
function createofferContainer(obj, index, active, ln) {

     /*Create offContainer */
     let cont = document.createElement("div");
     cont.classList.add("offContainer")
     if (active) cont.classList.add("active");
     /*Now Create The Title */
     let offTitle = document.createElement("div");
     offTitle.classList.add("offTitle");
     let h4offTitle = document.createElement("h4");
     h4offTitle.innerHTML = (ln == "it") ? obj.title : obj.title_en;
     offTitle.append(h4offTitle);
     /*Now Create the separator*/
     let separator = document.createElement("hr");
     /*Now Create the body*/
     let offBody = document.createElement("div");
     offBody.classList.add("offBody");
     offBody.innerHTML = ".";
     /*Now Append Everything */
     cont.append(offTitle);
     cont.append(separator);
     cont.append(offBody);
     cont.onclick = function(){
          //Disable all active ones
          let boc = document.getElementById('bodyOffersContainer');
          let moc = document.getElementById('miniOffersContainer');
          let bocCount = boc.children.length;
          for (let i = 0; i< bocCount; i++) {
               boc.children[i].classList.remove("active");
               moc.children[i].classList.remove("active");
          }
          moc.children[index-1].classList.add("active");
          boc.children[index-1].classList.add("active");
          cont.active = true;
     }
     document.getElementById("miniOffersContainer").append(cont);
     //Create body container
     let bCont = document.createElement("div");
     if(active)
          bCont.classList.add("active");
     bCont.id="OfferBody"+index;
     //Create Title
     let bTitle = document.createElement("h3");
     bTitle.innerHTML = (ln == "it") ? obj.title : obj.title_en;
     //Create description
     let bDesc = document.createElement("p");
     bDesc.innerHTML = (ln == "it") ? obj.description : obj.description_en;
     //Create requirements Title
     let bReq = document.createElement("h4");
     bReq.innerHTML = (ln == "it") ? "Requisiti" : "Requirements";
     //Create requirements Body
     let bReqb = document.createElement("p");
     bReqb.innerHTML = (ln == "it") ?  obj.requirements : obj.requirements_en;
     //Create Study Title
     let bStudy = document.createElement("h4");
     bStudy.innerHTML = (ln == "it") ?  "Titolo di studio" : "Educational qualification";
     //Create Study Title Body
     let bStudyb = document.createElement("p")
     bStudyb.innerHTML = (ln == "it") ? obj.studyTitle : obj.studyTitle_en;
     //Create Experience Title
     let bExperience = document.createElement("h4");
     bExperience.innerHTML = (ln == "it") ? "Esperienza Pregressa" : "Previous Experience";
     //Create Experience Body
     let bExperienceb = document.createElement("p");
     bExperienceb.innerHTML =(ln == "it") ?  obj.experience : obj.experience_en;
     //Create Options
     let opt = document.createElement("option");
     opt.innerHTML = (ln == "it") ? obj.title : obj.title_en;
     opt.value = (ln == "it") ? obj.title : obj.title_en;
     let mOpt = document.createElement("option");
     mOpt.innerHTML = (ln == "it") ? obj.title : obj.title_en;
     mOpt.value = (ln == "it") ? obj.title : obj.title_en;
     //Append Everything
     bCont.append(bTitle);
     bCont.append(bDesc);
     bCont.append(bReq);
     bCont.append(bReqb);
     bCont.append(bStudy);
     bCont.append(bStudyb);
     bCont.append(bExperience);
     bCont.append(bExperienceb);
     document.getElementById('slcOggetto').append(opt);
     document.getElementById('m_txtOggetto').append(mOpt);
     document.getElementById("bodyOffersContainer").append(bCont);
}
function clearOffers() {
     let bodyOffersContainer = document.getElementById('bodyOffersContainer');
     while(bodyOffersContainer.children.length > 0){
          bodyOffersContainer.children[0].remove();
          }
     let miniOffersContainer = document.getElementById('miniOffersContainer');
     while(miniOffersContainer.children.length > 0){
          miniOffersContainer.children[0].remove();
          }
     let slcOggetto = document.getElementById('slcOggetto');
     while(slcOggetto.children.length > 0){
          slcOggetto.children[0].remove();
          }
     let m_slcOggetto = document.getElementById('m_txtOggetto');
     while(m_slcOggetto.children.length > 0){
          m_slcOggetto.children[0].remove();
     }
     let mTitoli = document.getElementById('titoli');
     while(mTitoli.children.length > 0){
          mTitoli.children[0].remove();
     }
}
function LoadOffers() {
     clearOffers();
     $.getJSON('JsonHandling/readJobJson.php', function (data) {
          var index = 1;
          var lang = localStorage.getItem("lang") || "it";
          let slc = document.getElementById('slcOggetto');
          let mSlc = document.getElementById('m_txtOggetto');
          let optLibero = document.createElement('option');
          optLibero.innerHTML = (lang == "it") ? "Candidatura Spontanea" : "Spontaneous Application";
          optLibero.value = (lang == "it") ? "Candidatura Spontanea" : "Spontaneous Application";
          let mOptLibero = document.createElement('option');
          mOptLibero.innerHTML = (lang == "it") ? "Candidatura Spontanea" : "Spontaneous Application";
          mOptLibero.value = (lang == "it") ? "Candidatura Spontanea" : "Spontaneous Application";
          slc.append(optLibero);
          mSlc.append(mOptLibero);
          data.forEach(dati => {
               if(index==1){
                    createofferContainer(dati, index, true, lang);
               } else {
                    createofferContainer(dati, index, false, lang);
               }
               createMobileOfferTitle(dati, index, lang);
               index = index+1;
          }
     )});
}
function createMobileOfferTitle(dati, index, lang){
          /*Create offContainer */
          let cont = document.createElement("div");
          cont.classList.add("offContainer")
          /*Now Create The Title */
          let offTitle = document.createElement("div");
          offTitle.classList.add("offTitle");
          let h4offTitle = document.createElement("h4");
          h4offTitle.innerHTML = (lang == "it") ? dati.title : dati.title_en;
          offTitle.append(h4offTitle);
          cont.append(offTitle);
          cont.onclick= function() {
               createMobileOfferBody(dati, index, lang);
          }
          document.getElementById('titoli').append(cont);
}
function createMobileOfferBody(obj, index, ln){
     document.getElementById('corpi').innerHTML = "";
     //Create body container
     let bCont = document.createElement("div");
     bCont.id="mOfferBody"+index;
     //Create Title
     let bTitle = document.createElement("h3");
     bTitle.innerHTML = (ln == "it") ? obj.title : obj.title_en;
     //Create description
     let bDesc = document.createElement("p");
     bDesc.innerHTML = (ln == "it") ? obj.description : obj.description_en;
     //Create requirements Title
     let bReq = document.createElement("h4");
     bReq.innerHTML = (ln == "it") ? "Requisiti" : "Requirements";
     //Create requirements Body
     let bReqb = document.createElement("p");
     bReqb.innerHTML = (ln == "it") ?  obj.requirements : obj.requirements_en;
     //Create Study Title
     let bStudy = document.createElement("h4");
     bStudy.innerHTML = (ln == "it") ?  "Titolo di studio" : "Educational qualification";
     //Create Study Title Body
     let bStudyb = document.createElement("p")
     bStudyb.innerHTML = (ln == "it") ? obj.studyTitle : obj.studyTitle_en;
     //Create Experience Title
     let bExperience = document.createElement("h4");
     bExperience.innerHTML = (ln == "it") ? "Esperienza Pregressa" : "Previous Experience";
     //Create Experience Body
     let bExperienceb = document.createElement("p");
     bExperienceb.innerHTML =(ln == "it") ?  obj.experience : obj.experience_en;
     //Create Options
     let opt = document.createElement("option");
     opt.innerHTML = (ln == "it") ? obj.title : obj.title_en;
     opt.value = (ln == "it") ? obj.title : obj.title_en;
     //Append Everything
     bCont.append(bTitle);
     bCont.append(bDesc);
     bCont.append(bReq);
     bCont.append(bReqb);
     bCont.append(bStudy);
     bCont.append(bStudyb);
     bCont.append(bExperience);
     bCont.append(bExperienceb);
     document.getElementById('corpi').append(bCont);
     document.getElementById('titoli').classList.add("slide-out-left");
     setTimeout('document.getElementById("titoli").style.display = "none";', 400);
     setTimeout("document.getElementById('corpi').style.display = 'block';", 400);
     setTimeout("document.getElementById('corpi').classList.add('slide-in-right');", 400);
     setTimeout("document.getElementById('btnBackCont').style.display = 'block';", 400);
}
function goBack(){
     document.getElementById('corpi').classList.add("slide-out-left");
     setTimeout("document.getElementById('btnBackCont').style.display = 'none';", 400);
     setTimeout('document.getElementById("corpi").style.display = "none";', 400);
     setTimeout("document.getElementById('titoli').style.display = 'block';", 400);
     setTimeout("document.getElementById('titoli').classList.add('slide-in-right');", 400);
}
function Initialize() {
     getLang();
     $('.preloader').fadeOut(1000);
     SetUpUplaodFileButton();
     //setTimeout("showSnackbar()", 1500);
}