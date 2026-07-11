// =====================================================
// Backend/utils/generateProducts.js
// PART 1
// =====================================================

import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd(), "..");

const menFile = path.join(
  root,
  "Frontend",
  "src",
  "data",
  "menProducts.js"
);

const womenFile = path.join(
  root,
  "Frontend",
  "src",
  "data",
  "womenProducts.js"
);

const outputFile = path.join(
  process.cwd(),
  "data",
  "products.js"
);

// =====================================================
// EXTRACT ARRAY
// =====================================================

function extractArray(content) {

  const start = content.indexOf("[");

  const end = content.lastIndexOf("]");

  return content.substring(start + 1, end);

}

// =====================================================
// PARSE PRODUCTS
// =====================================================

function parseProducts(content, gender) {

  const body = extractArray(content);

  const objects =
    body.match(/\{[\s\S]*?\}/g) || [];

  const products = [];

  for (const obj of objects) {

    const image =
      obj.match(
        /image:\s*([a-zA-Z0-9_]+)/
      )?.[1] || "";

    const name =
      obj.match(
        /name:\s*"([^"]+)"/
      )?.[1] || "";

    const category =
      obj.match(
        /category:\s*"([^"]+)"/
      )?.[1] || "";

    const brand =
      obj.match(
        /brand:\s*"([^"]+)"/
      )?.[1] || "ShopHeim";

    const rating =
      parseFloat(
        obj.match(
          /rating:\s*"?(.*?)"?[,]/
        )?.[1] || "4.5"
      );

    const description =
      obj.match(
        /description:\s*"([^"]+)"/
      )?.[1] ||
      "Premium Fashion Product";

    const price =
      Number(

        obj.match(
          /price:\s*"₹?(\d+)"/
        )?.[1]

        ||

        obj.match(
          /price:\s*(\d+)/
        )?.[1]

        ||

        "0"

      );

    products.push({

      name,

      brand,

      category,

      gender,

      image,

      price,

      rating,

      description,

      stock: 100,

    });

  }

  return products;

}

// =====================================================
// IMAGE PATH
// =====================================================

function imagePath(image, gender) {

  const folder =
    gender === "Men"
      ? "men"
      : "women";

  return `/products/${folder}/${image}.jpg`;

}

// =====================================================
// PRODUCTS WITH GALLERY IMAGES
// =====================================================

const multiImageProducts = [

  "blaze2",

  "blaze7",

  "blaze8",

  "blaze9",

  "cargtros1",

  "crickjersey1",

  "form2",

  "grooming1",

  "grooming4",

  "hankle2",

  "jeans2",

  "jeans5",

  "mactivewear1",

  "mactivewearjack1",

  "mactivewearpants1",

  "methnic4",

  "ovrcoat1",

  "sand1",

  "shirt2",

  "shirt6",

  "sneak1",

  "sport1",

  "tshirt3",

  "w3",

];

// =====================================================
// GENERATE IMAGE ARRAY
// =====================================================

function getImages(image, gender) {

  const folder =
    gender === "Men"
      ? "men"
      : "women";

  const main =
    `/products/${folder}/${image}.jpg`;

  if (!multiImageProducts.includes(image)) {

    return [main];

  }

  return [

    main,

    `/products/${folder}/${image}i.jpg`,

    `/products/${folder}/${image}ii.jpg`,

    `/products/${folder}/${image}iii.jpg`,

  ];

}

// =====================================================
// READ SOURCE FILES
// =====================================================

const menContent = fs.readFileSync(

  menFile,

  "utf-8"

);

const womenContent = fs.readFileSync(

  womenFile,

  "utf-8"

);

const menProducts = parseProducts(

  menContent,

  "Men"

);

const womenProducts = parseProducts(

  womenContent,

  "Women"

);

const products = [

  ...menProducts,

  ...womenProducts,

];

// =====================================================
// GENERATE OUTPUT FILE
// =====================================================

let output = `const products = [\n\n`;

for (const item of products) {

  const mainImage = imagePath(

    item.image,

    item.gender

  );

  const images = getImages(

    item.image,

    item.gender

  );

  output += `  {\n`;

  output += `    name: "${item.name}",\n`;

  output += `    brand: "${item.brand}",\n`;

  output += `    category: "${item.category}",\n`;

  output += `    gender: "${item.gender}",\n`;

  output += `    image: "${mainImage}",\n`;

  output += `    images: ${JSON.stringify(images)},\n`;

  output += `    price: ${item.price},\n`;

  output += `    rating: ${item.rating},\n`;

  output += `    description: "${item.description}",\n`;

  output += `    stock: ${item.stock},\n`;

  output += `  },\n\n`;

}

output += `];\n\n`;

output += `export default products;\n`;

// =====================================================
// WRITE FILE
// =====================================================

fs.writeFileSync(

  outputFile,

  output,

  "utf-8"

);

// =====================================================
// DONE
// =====================================================

console.log(

  `✅ ${products.length} Products Generated Successfully`

);

console.log(

  `📁 Saved To: ${outputFile}`

);