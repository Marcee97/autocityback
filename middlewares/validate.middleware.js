
export const loginMiddle = ({ schema }) => (req, res, next) => {
   const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
      field: issue.path.join("."),   
      message: issue.message         
    }));

    return res.status(400).json({
      message: "Escribi un usuario y una Contraseña",
      errors
    });
  }

  next();
}

