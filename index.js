const nodeHtmlToImage = require("node-html-to-image");
const puppeteer = require("puppeteer");

async function getImageFromSelector(url, selector) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const image = await page.$eval(selector, (img) => img.src);
  await browser.close();
  return image;
}

const title = "Titre";
const description = "Description de la vignette.";
const url = "https://github.com/ThomasDCW";
const selector = ".avatar";

getImageFromSelector(url, selector).then((dataURI) => {
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
});
