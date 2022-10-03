const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;

      return next();
    } catch (error) {
      res.status(422).send({
        error: "Validation Error",
        ...error,
      });
    }
  };
};

module.exports = validate;
