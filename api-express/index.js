const serve = require('./src/app');

const port = process.env.PORT || 3000;

serve.listen(port, () => {
    console.log({ "status": "serve running" })
    console.log(`http://localhost:${port}`);

})