import { pool } from "../db/db.js";

import bcrypt from "bcrypt";
export const registroUsuario = async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM registro WHERE usuario = ?",
      [usuario]
    );

    if (rows.length > 0) {
      return res.status(200).json({ message: "El usuario ya existe" });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO registro (usuario, password) VALUES (?, ?)",
        [usuario, passwordHash]
      );
      console.log(passwordHash, "crear usuario");
      res.status(200).json({ message: "Nuevo usuario registrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const ingresoUsuario = async (req, res) => {
  try{

    const { usuario, password } = req.body;
    console.log(usuario, password);
  const [rows] = await pool.query("SELECT * FROM registro WHERE usuario = ?", [
    usuario,
  ]);

  if (rows.length === 0) {
    return res.status(400).json({
      errors: [
        {
          field: "usuario",
          message: "No existe el usuario en la base",
        },
      ],
    });
  } else {
    //hacer el bcrypt compare
    const hash = rows[0].password;
    console.log(rows[0].password, "el usuario registrado para obtener el hash");
    const match = await bcrypt.compare(password, hash);
    
    if (match) {
      return res.status(200).json({ message: "Match Ingreso Exitoso" });
    } else {
      return res.status(400).json({ message: "Match Ingreso denegado" });
    }
  }
}catch(error){
  console.log(error)
  return res.status(500).json({message: "Error Interno del Servidor"})
}
};
