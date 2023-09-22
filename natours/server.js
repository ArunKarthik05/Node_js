const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
//Connecting MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db connection successfully established');
  });

/*Creating models
const testTour = new Tour({
  name: 'The Park Caomper',
  price: 400,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });
  */
//env variables
// console.log(process.env);
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
