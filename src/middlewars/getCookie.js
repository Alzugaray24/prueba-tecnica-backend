export const getCookie = (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.token) {
    req.token = req.cookies.token;
  }
  next();
};
