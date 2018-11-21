"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router(); //crea una nueva instancia de nuestro router
router.get('/heroes', (req, res) => {
    const query = `
        SELECT *
        FROM heroes
        `;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes: heroes
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id; //al escribir el objeto req. salen las ayudas de escritura, gracias a que estamos ocupando typescript
    const escapeId = mysql_1.default.instance.cnn.escape(id); //para evitar caracteres raros, el paquete MYSQL tiene el metodo  escape, para evitarlos
    const query = `
    SELECT *
    FROM heroes
    where id = ${escapeId}`;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe: heroe[0] //esto evita que nos lo imprima en formato de arreglo probar quitandolo 
            });
        }
    });
});
exports.default = router;
//ocuparemos las definicioes que vienes de las clases que se encuentran dentro de mysql en typescript @types/mysql --dev
