import { pool } from "../db/db.js";

export const testing = (req, res) => {
  res.send("El servidor funciona correctamente");
};

export const prueba = async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO lavados (marca, vin, ubicacion, tiempo) VALUES (?,?,?,?)",
      [
        req.body.marca,
        req.body.vin,
        req.body.ubicacion,
        req.body.tiempoFOrmateado,
      ]
    );
    res.send("Ruta de prueba funcionando");
  } catch (error) {
    console.log(error);
  }
};

export const getLavados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM lavados");

    const fechaHoras = rows.map((lav) => {
      const fecha = new Date(lav.fecha);

      const fechaFormateada = fecha.toLocaleDateString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
      });

      const horaFormateda = fecha
        .toLocaleTimeString("en-US", {
          timeZone: "America/Argentina/Buenos_Aires",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        
      return {
        ...lav,
        fecha: fechaFormateada,
        hora: horaFormateda,
      };
    });
   

    res.json(fechaHoras);
  } catch (error) {
    console.log(error);
  }
};
