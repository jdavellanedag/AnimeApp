require('./config/config');
const app = require('./server/app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`);
})