import { assets } from ".";

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function loadImage(name: string, src: string) {
  // Simulate delay here for dev purposes
  await sleep(Math.random() * 10000);

  return new Promise((res, rej) => {
    const img = new Image();

    img.src = src;

    // Decode method is better than onload event handler since when onload successfully fires,
    // it's only when the image has been downloaded so it's possible that the image is not yet
    // fully available
    img.decode()
      .then(() => {
        assets[name] = img;

        res(img);
      })
      .catch((err) => [console.log(err), rej(new Error(`Failed to decode '${src}'`))]);
  });
}

export function getAsset(name: string) {
  return assets[name];
}