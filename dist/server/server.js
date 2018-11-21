"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class Server {
    // por ejemplo aqui el puerto solo puede recibir un numero por que si no, nos va a marcar un error a la hora de escritura
    // entonces aqui nos brinca el error al momento de escribirlo y no en la ejecucion
    // no podemos acceder al tipo de dato que es express  app: express;, por que el paqyuete express esta definido para sea de javascript y no para typescript
    // para obtener toda la informacion  metodos, tipado, opciones, que argumentos recibe los metodos, de un paquete que no pensado para que sea de typescript
    // tenemos que instalar la siguiente extension
    // hay una comunidad que se dedica a todo paquete de node darle su definicion en typescript, lo que que le ayuda a typescript que metodos y definiciones tiene este paquete
    // npm install @types/express  --save-dev  -esto es en el caso de express- como esto es solo de desarrollo hay que ocupar --save-dev 
    //practicamente cualquier paquete de node que no tenga su representacion en typescript todos se encuentran asi @types/(y el nombre del paquete )
    /* para saber que esto lo hizo bien, checar el package json
    "devDependencies": {
        "@types/express": "^4.16.0"
    }
    */
    //ahora al hacer referencia al paquete y escribir punto seguido(express.) nos aparece un menu, con los metodos y propiedades a los que podemos acceder desde typescript
    constructor(puerto) {
        this.port = puerto;
        this.app = express(); //inicializamos la aplicacion de express;
    }
    static init(puerto) {
        //estes el metodo que voy a llamar, va ser Server.init y ese dispara el constructor ( constructor( puerto:number ) ) e inicializa todo
        // la idea es que solo tengamos una instancia de express corriendo 
        return new Server(puerto);
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public'); //aquí ya especificamos donde va estar la carpeta publica
        this.app.use(express.static(publicPath));
    }
    //llamamos publicFolder () cuando la aplicacion ya esta escuchando
    //hasta este punto  no arranca la app  ya que en dist se requiere una carpeta public  con el index.html en dist segun la especificacion del path
    //pero esto no lo genera automaticamente al compilar con tsc, por lo que se requiere otro paquete
    // npm i copyfiles solo la instalamos para desarrollo
    //para usar llamamos copyfiles something/*.js out  y definimos que archivos son los que quieres copiar, en este caso van a ser los archivos html
    //nos vamos al packagejson
    /*modificamos este objeto de esta manera
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "html": "copyfiles --up 1 src/public/*.html dist"  //esto significa quiero la carpeta public y sus  html de este origen (src) a la carpeta dist
            //  --up 1, significa que ignores src, por que al no indicar eso, copia todo el directorio desde src
            // solo queremos public directamente en raiz de dist
        },

    hasta este punto tenemos que ejecutar
    dos lineas de comando para compilar typescript y para generar la carpeta public en dist
    tsc y npm run html, podemos ejecutar eso haciendo una modificación de arranque en el package json de la sig manera

    "build": "tsc && npm run html"

    */
    //ahora tenemos que arrancar nuestra applicacion de la sig manera npm run html
    start(callback) {
        this.app.listen(this.port, callback);
        this.publicFolder(); //llamamos este metodo cuando la aplicacion ya esta escuchando
    }
}
exports.default = Server;
// generalmente se haria de esta manera const express = require('express');, pero con ts se usa import
/*
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));



app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});

*/ 
