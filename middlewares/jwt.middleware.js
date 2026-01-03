import jwt from "jsonwebtoken";

export const authJwt = (req, res, next) => {
console.log("cookies en el backend:", req.cookies);

  const token = req.cookies.token;
  console.log("desde el middleware", token)
  if(!token) {
    return res.status(401).json({ message: "No autorizado"})
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next()
  } catch(error) {
    return res.status(401).json({message:"Token invalido"})
  }
}