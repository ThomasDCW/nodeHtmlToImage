const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs");

const title = "Titre";
const description = "Description de la vignette.";
const image = fs.readFileSync("./images/image.png");
const base64Image = Buffer.from(image).toString("base64");
const dataURI = `data:image/jpeg;base64,${base64Image}`;

nodeHtmlToImage({
  output: `./generated/thumbnail_${Date.now()}.png`,
  html: `
    <html>
      <style>
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      </style>
      <body>
        <h1>${title}</h1>
        <p>${description}</p>
        <img src="{{imageSource}}" />
      </body>
    </html>`,
  content: { imageSource: dataURI },
})
  .then(() => {
    console.log("La vignette a été créée avec succès!");
  })
  .catch((error) => {
    console.error("Erreur lors de la création de la vignette:", error);
  });
