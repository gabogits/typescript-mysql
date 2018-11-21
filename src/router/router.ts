import {Router, Request, Response} from 'express';
import MYSQL from '../mysql/mysql';

const router = Router(); //crea una nueva instancia de nuestro router

router.get('/heroes', (req: Request,res: Response) => { //req: Request,res: Response , definimos el tipo de dato que recibe la request y la response, para que typescript tenga todos sus metodos a la mano
    const query = `
        SELECT *
        FROM heroes
        `;
    MYSQL.ejecutarQuery(query, (err:any, heroes: Object[])=> {
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            })
        }else {
            res.json({
                ok:true,
                heroes : heroes
            })
        }
    });


    
    
})

router.get('/heroes/:id', (req: Request,res: Response) => {
    const id = req.params.id; //al escribir el objeto req. salen las ayudas de escritura, gracias a que estamos ocupando typescript

    const escapeId = MYSQL.instance.cnn.escape(id); //para evitar caracteres raros, el paquete MYSQL tiene el metodo  escape, para evitarlos

    const query = `
    SELECT *
    FROM heroes
    where id = ${escapeId}`;
    MYSQL.ejecutarQuery(query, (err:any, heroe: Object[])=> {
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            })
        }else {
            res.json({
                ok:true,
                heroe : heroe[0] //esto evita que nos lo imprima en formato de arreglo probar quitandolo 
            })
        }
    });

})

export default router;

//ocuparemos las definicioes que vienes de las clases que se encuentran dentro de mysql en typescript @types/mysql --dev