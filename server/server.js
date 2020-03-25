const express = require('express');
const app = express();

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`server listenin at ${PORT}`);
});