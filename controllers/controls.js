import { pool } from "../db/db.js"


export const testing = (req, res) => {
    res.send("El servidor funciona correctamente")
}

export const prueba = async(req, res) => {
    try{

        await pool.query ("INSERT INTO lavados (marca, vin, ubicacion, tiempo) VALUES (?,?,?,?)",
            [req.body.marca, req.body.vin, req.body.ubicacion, req.body.tiempoFOrmateado])
            res.send("Ruta de prueba funcionando")
        }catch(error) {
            console.log(error)
        }
    }


export const getLavados = async(req, res) => {
    try {
       const [rows] = await pool.query("SELECT * FROM lavados")
       const fechaFormateadas = rows.map(lav => {
        const fecha = new Date(lav.fecha);
      return {
        ...lav,
        fecha: new Date(lav.fecha).toLocaleString("es-AR", {
            timeZone: "America/Argentina/Buenos_Aires",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      };
    });

       console.log(fechaFormateadas)
       res.json(fechaFormateadas)
    } catch (error) {
        console.log(error)
    }
}