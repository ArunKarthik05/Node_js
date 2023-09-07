const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//middle ware
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id:${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({
      status: 'failed',
      message: 'Missing name or price',
    });
  next();
};
//re1,res : Route Handler
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    reqTime: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  //converts string to num(str*1)
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

//Route Handler for POST
exports.createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//Route Handler- Patch
exports.updateTour = (req, res) => {
  res.status(200).json({
    stats: 'success',
    data: {
      tour: '<Updated tours..>',
    },
  });
};

//DELETE Route Handler
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
