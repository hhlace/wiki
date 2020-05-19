const express = require('express');
const app = express();
const morgan = require( 'morgan' );
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks')
const db = require('./db/index.js');
const routes = require('./routes');
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

var models = require('./models');


// apuntá nunjucks al directorio conteniendo templates y apagando el cacheo,
// configure devuelve una instancia Enviornment que vamos a querer usar para
// agregar Markdown después.
var env = nunjucks.configure('views', {noCache: true})
app.use(express.static('public'));
app.use(morgan());
app.use(jsonParser);
app.use(urlencodedParser);
app.use(routes);


// hace res.render funcionar con archivos html
app.set('view engine', 'html');
// cuando res.render funciona con archivos html, haz que use nunjucks para eso.
app.engine('html', nunjucks.render);


db.sync({force: false})

.then(function () {
    // asegurate de reemplazar el nombre de abajo con tu app de express
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
