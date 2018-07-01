const express = require('express');
const bodyParser = require('body-parser');
      
const port = process.env.PORT || 9999;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const apiRoutes = require('./routes/router');
app.use(apiRoutes);

app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
});
