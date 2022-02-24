
let uplo = "None";

var Jimp=window.Jimp;


let base64String = "";

async function textOverlay(u_name,u_gender,u_age,u_email,u_phone,u_add) {
   // Reading image

   var reader = new FileReader();
   reader.onload = function () {base64String = reader.result.replace("data:image/jpeg;base64,", "")};
   reader.readAsDataURL(document.getElementById("inp-no-bdr").files[0]);
   const image = await Jimp.read('./static/card.png');
   const per_image = await Jimp.read(base64String);
   per_image.resize(319,400);
   // Defining the text font
   const fontb = await Jimp.loadFont("./static/fonts/basefont.fnt");
   const fontm = await Jimp.loadFont("./static/fonts/basemedium.fnt");
   const fontnum = await Jimp.loadFont("./static/fonts/numeric_font.fnt");
   const fonts = await Jimp.loadFont("./static/fonts/small_font.fnt");
   
   image.print(fontb, 638, 237, u_name);
   image.print(fontm, 638, 320, u_gender);
   image.print(fontnum, 800, 320, u_age);
   image.print(fonts, 700, 380, u_email);
   image.print(fonts, 700, 437, u_phone);
   image.print(fonts, 700, 493, u_add );
   image.composite(per_image,200,200);
   image.getBase64(Jimp.AUTO, function(err, data) {
      document.getElementById("form-sub").innerHTML=`<div><img id="img_card" src=${data} style='display:block;' width='500' height='300'/><center><a id='download-img' href=${data} download onclick='thankYou()'>Download</a></center></div>`;
      window.stop();
});
}


function funchange() {
   console.log(document.getElementById("inp-no-bdr").value)
   uplo = document.getElementById("popu").innerHTML = "Uploaded";
   console.log(uplo);

}


 function check() {
   if ((uplo == "Uploaded") && (document.getElementById("name").value != "") && (document.getElementById("age").value.length <= 2 && document.getElementById("age").value !="")  && (document.getElementById("phone").value).length >= 10 && (document.getElementById("email").value.includes("@gmail.com")) && (document.getElementById("add").value != "")) {
      textOverlay(document.getElementById("name").value.toUpperCase(),document.getElementById("gender").value,document.getElementById("age").value,document.getElementById("email").value,document.getElementById("phone").value,document.getElementById("add").value);
   }
   else{
       alert("Please Enter Valid Details!!")
   }

}

function thankYou(){
   document.getElementById("form-sub").innerHTML="<div><h1>Thank You! Your Entry is Recorded.</div>";
}
