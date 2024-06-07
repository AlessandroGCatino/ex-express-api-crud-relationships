const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routerPosts = require('./routers/routerPosts.js');
const errorHandler = require('./middlewares/errorHandler.js');
const missingPage = require('./middlewares/missingPage.js');

app.use(express.json());

app.use("/posts", routerPosts);

app.use(missingPage)

app.use(errorHandler);

app.listen(port, () => 
    console.log(`Server is running on http://localhost:${port}`))