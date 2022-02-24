
const Jimp=require('jimp');


async function textOverlay(u_name,u_age,u_email,u_phone,u_add) {
   // Reading image{
      const image = await Jimp.read('card.png');
      const per_image = await Jimp.read('pic.jpg');
      per_image.resize(319,400);
      // Defining the text font
      const fontb = await Jimp.loadFont("basefont.fnt");
      const fontm = await Jimp.loadFont("basemedium.fnt");
      const fontnum = await Jimp.loadFont("numeric_font.fnt");
      const fonts = await Jimp.loadFont("small_font.fnt");
      image.print(fontb, 638, 237, u_name);
      image.print(fontm, 638, 320, 'FEMALE');
      image.print(fontnum, 800, 320, u_age);
      image.print(fonts, 700, 380, u_email);
      image.print(fonts, 700, 437, u_phone);
      image.print(fonts, 700, 493, u_add );
      image.composite(per_image,200,200);
      // Writing image after processing
      image.writeAsync('ResultOverlay.png');
   };
   

textOverlay("ggsdga","32","gmail",991763012,"dhadad");