const express = require('express');

const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//This is middleware
app.use(express.json());

//3rd party middelware
app.use(morgan('dev'));

//next should be sent after all our middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//v1=version 1

/*
app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);
*/
//ROUTE MIDDLEWARE FOR TOURS
// const tourRouter = express.Router();
// const userRouter = express.Router();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = app;
