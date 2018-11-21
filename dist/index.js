"use strict";
//typescript en un super set le añade funciones a javascript extension .ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//estos archivos tienen que ser compilados a javascript para que puedan ser interpretados
//para un javascript mas firme 
// existen extensiones o paquetes de node que permiten ejecutar codigo de ts directamente en node como "ts node" 
//convertir este codigo a javascript nosotros debemos decirle al typescript que reglas debe seguir 
//empezamos configurando el  typescript  tsc --init
//genera el archivo tsconfig.json y ahí hacemos las sig modificaciones
//en target modificamos a "target": "es6",  todo el codigo que creemos  en typescriot lo va convertir a  codigo  "es6" totalmente válido
// "outDir": "dist",  para la carpeta que va generar el archivo de salida 
//en la terminar ejecutamos el archivo tsc
console.log('Código de Javascript');
// hasta aqui nos genera una nueva carpeta llamada dist con mismo archivo, pero con la extension js y la indicacion "use strict";
// para indicar que sea más estricto a la hora de los revsiones
//este archivo de salida el compilado index.js  no se mueve solo el .ts
//aqui importamos la clase que creamos en server.ts
const server_1 = __importDefault(require("./server/server"));
const router_1 = __importDefault(require("./router/router"));
const server = server_1.default.init(3000); //acceso al metodo estatico que creamos init y el puerto
server.app.use(router_1.default); //una middleware para llamar al router
//const mysql = new MYSQL();
// esto const mysql = new MYSQL(); esto podria cambiarse por esto MYSQL.instance;
//de igual maera tendría que devolver clase inciializada, servidor corriendo en el puerto 300 y base de datos online, osea todo corriendo normal
//aunque se llamara multiples veces la instancia solo se ocuparia la misma
// MYSQL.instance;
// MYSQL.instance;
// MYSQL.instance;
// cuando ejecutamos un sql query , vamos a hacer a consultar esta  instancia MYSQL.instance; y si no existe vamos a crearla  una nuevay si ya existe vamos a llamar a la misma 
server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
});
//ejecutadomos el codigo tsc, para que compile todos los archivos typescript del proyecto
//en dist tambien crea la larpeta server con el archivo server.js, con codigo de javascript de este compilado
