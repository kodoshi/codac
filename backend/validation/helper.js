exports.createPostValidator = (req, res, next) => {
  req.check("title", "Insert Title").notEmpty();
  req
    .check("title", "Title length limited between 3 & 100 characters")
    .isLength({
      min: 3,
      max: 100,
    });

  req.check("body", "Insert Content").notEmpty();
  req
    .check("content", "Content length limited between 3 & 1000 characters")
    .isLength({
      min: 3,
      max: 1000,
    });

  //extra error checking
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((err) => err.msg)[0]; //first error instance gets logged
    return res.status(400).json({ error: firstError });
  }

  next(); //so we dont get stuck
};
