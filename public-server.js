const express = require('express');
const path = require('path');
const port = process.env.PORT || 3002;
const app = express();

// serve static assets normally
app.use(express.static(`${__dirname}/static`));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(port);
// eslint-disable-next-line no-console
console.log(`server started on port ${port}`);
