const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
////////////////filesystem

//1.Synchronous
// const text = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(text);

// const textout =`This is what we know about the avacodo:${text} .\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textout);

// console.log('Written');

//2.ansynchronous-Callback hell

// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     if(err) return console.log('Error');
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//         console.log(data3);
//               fs.writeFileSync('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('Callback-hell executed😁😁');
//             });
//         });
//     });
// });
// console.log('Reading data..');
///////////////////2.SERVER////////////////////////////////

const tempOverview = fs.readFileSync(
  './templates/template-overview.html',
  'utf-8'
);
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./templates/product.html', 'utf-8');

const data = fs.readFileSync('.//dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
//console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    //product
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const product = dataObj[query.id];

    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, {  'Content-Type': 'application/json' });
    res.end(data);
    // res.end('this is API');

    //NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end('<h1>Not found</h1>');
  }
});
server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000');
});
