const app = require('./server/server');

app.listen(4000, () => {
  console.log('Listening');
  console.log(`server is run in http://localhost:4000`)
});
