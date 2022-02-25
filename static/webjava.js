
let uplo = "None";

var Jimp=window.Jimp;

var base64String="";
var resized_img;


async function reduce_image_file_size(base64Str, MAX_WIDTH = 319, MAX_HEIGHT = 400) {
   let resized_base64 = await new Promise((resolve) => {
       let img = new Image()
       img.src = base64Str
       img.onload = () => {
           let canvas = document.createElement('canvas')
           let width = img.width
           let height = img.height

           if (width > height) {
               if (width > MAX_WIDTH) {
                   height *= MAX_WIDTH / width
                   width = MAX_WIDTH
               }
           } else {
               if (height > MAX_HEIGHT) {
                   width *= MAX_HEIGHT / height
                   height = MAX_HEIGHT
               }
           }
           canvas.width = width
           canvas.height = height
           let ctx = canvas.getContext('2d')
           ctx.drawImage(img, 0, 0, width, height)
           resolve(canvas.toDataURL()) // this will return base64 image results after resize
       }
   });
   return resized_base64;
}

function calc_image_size(image) {
   let y = 1;
   if (image.endsWith('==')) {
       y = 2
   }
   const x_size = (image.length * (3 / 4)) - y
   return Math.round(x_size / 1024)
}

async function funchange() {
   uplo = document.getElementById("popu").innerHTML = "Uploaded";
   var reader = new FileReader();
   reader.onload = async function () {
      base64String = reader.result

      base64String=await reduce_image_file_size(base64String)

      document.getElementById("userImg").value=base64String;

         
   };
   reader.readAsDataURL(document.getElementById("inp-no-bdr").files[0]);
}

 function check() {
   if ((uplo == "Uploaded") && (document.getElementById("name").value != "") && (document.getElementById("age").value.length <= 2 && document.getElementById("age").value !="")  && (document.getElementById("phone").value).length >= 10 && (document.getElementById("email").value.includes("@gmail.com")) && (document.getElementById("add").value != "")) {
      document.getElementById("form-sub").submit();

   }
   else{
       alert("Please Enter Valid Details!!")
   }

}

function thankYou(){
   document.getElementById("form-sub").innerHTML="<div><h1>Thank You! Your Entry is Recorded.</div>";
}
