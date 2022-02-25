const per_image = await Jimp.read(img_string);
            per_image.resize(319,400);