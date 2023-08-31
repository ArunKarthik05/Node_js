const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I couldn't find it😣😣");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('I couldnt write file😣😣');
      resolve('success');
    });
  });
};

///async await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed:${data}`);

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1, res2]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    //console.log(res.body.message);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random image imported');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2:Your pic is Ready😁😁';
};
(async () => {
  try {
    console.log('1. Will get dog pics');
    const x = await getDogPic();
    console.log(x);
  } catch (err) {
    console.log('ERROR🤣🤣🤣');
  }
})();

/*
console.log('1. Will get dog pics');
getDogPic()
  .then((x) => {
    console.log(x);
  })
  .catch((err) => {
    console.log('ERROR🤣🤣🤣');
  });
PROMISES
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed:${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random image imported');
  })
  .catch((err) => {
    console.log(err);
  });
*/
