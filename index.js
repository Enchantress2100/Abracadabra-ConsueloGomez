
//npm express y handlebars
const express = require('express')
const app = express()
const exphbs= require('express-handlebars')
const { dirname } = require('path/posix')

//creacion del servidor
app.listen(3000, () => {
    console.log('server on and working OK')
})
//integrar handlebars como motor de plantillas
app.set('view engine', 'handlebars')
//configurar el motor de plantilla con el metodo engine
app.engine(
    'handlebars', exphbs.engine({
        layoutsDir: __dirname + '/views',
        partialsDir:__dirname+'/views/componentes'
    })
)
//disponibilizar la carpeta assets como carpeta publica del servidor
app.use(express.static('assets'))

//acceder a index.html
app.get('/abracadabra', (_, res) => {
    res.sendFile(__dirname + '/index.html')
})

//crear en el servidor un arreglo de nombres y devolverlo en formato JSON a traves de la ruta /abracadabra/usuarios
let usuarios = {usuarios:["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"]};
app.get('/abracadabra/usuarios', (_, res) => {
    res.json((usuarios))
    })

//crear un middleware que con la ruta abracadabra/juego/:usuario valide que el parametro recibido existe en el arreglo de nombres creado
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    let usuario = req.params.usuario;
    let nombre = (usuarios.usuarios.includes(usuario))
    
    nombre === true
      ? next()
      : res.sendFile(__dirname + '/assets/who.jpeg');    
})
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.redirect('http://localhost:3000/abracadabra');
});

//crear la ruta /abracadabra/conejo/:n que valide si el parametro n coincide con el numero generado de forma aleatoria
app.get('/abracadabra/conejo/:n', (req, res) => {
    const numero = Math.floor(Math.random() * 4 + 1)
    const n = req.params.n 
    numero == n
        ? res.sendFile(__dirname + '/assets/conejito.jpg')
        : res.sendFile(__dirname + '/assets/voldemort.jpg')
})


//ruta genérica que devuelva mensaje diciendo que la página no existe
app.get('*', (req, res) => {
    res.sendFile(__dirname + "/assets/notfound.png");
})