"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MYSQL {
    constructor() {
        this.conectado = false;
        //este mensaje deberia aparecer una unica vez
        //si esto apareciera mas de una unica vez, significaria que nuestro patrón singletón
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'marvel',
        });
        this.conectarDB(); //esta metodo es privado y solo se podrá acceder dentro de la misma clase 
    }
    //vamos a implementar los getters y setters de  _instance, que nos permitir manipular esta informacion
    // esto de los getters  y setter ses el hecho de controlar las formas cuando hagamos referencias a alguna propiedad de la la clase 
    // este metodo es un getter para manipular la instancia, este sera llamado mediante la instrucción MYSQL.instance
    static get instance() {
        //la ventaja de utilizar typescript es que al no retornar nada, al dejar vacio el metodo instance () marca un error, ya que  al escribir un metodo
        //no tendría sentido que no devuelva nada, entonces como minimo exije que la interfaz devuelva algo
        //ya sabemos que _instance es esto  private static _instance: MYSQL; pero yo no lo estoy incializando hasta aquí es null,
        //cuando se haga el get instance va verificar que exista una instancia, si no existe va a llamar el constructor va inicializarlo 
        //y toda esta clase va almacenarla en esta instancia
        return this._instance || (this._instance = new this());
        // de esta manera cuando llamemos muchas veces el get instance, siempre vamos a utilizar  la misma instancia y
    }
    //este metodo va servir para ejecutar cualquier query de forma automatica, solo mandariamos los argumentos
    static ejecutarQuery(query, callback) {
        // especificamos los argumentos y el tipo de dato a recibir en ellos query: string, callback: Function, la query es una cadena 
        //y en el callback vamos a recibir una funcion
        this.instance.cnn.query(query, (err, results, fields) => {
            //no funciona asi this.cnn, por que es una propiedad de la clase y no es una propiedad estatica de la clase
            // cnn solo se puede ser utilizada si la clase esta inicializada y como es un metodo estatico (static ejecutarQuery)  puede que la clase no este inicializada
            // por eso se usa instance por que estoy haciendo uso de este get  get instance () y por consecuencia si la instancia no existe crea una nueva
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
                //le agregamos un null por que nuestro callback esta esperando dos argumentos entre ellos el error 
                //  MYSQL.ejecutarQuery(query, (err:any, heroe: Object[])=> {
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
            }
            this.conectado = true;
            console.log("Base de datos online!");
        });
    }
}
exports.default = MYSQL;
