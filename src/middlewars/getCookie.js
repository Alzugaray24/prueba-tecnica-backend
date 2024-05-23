export const getCookie = (req, res, next) => {
  if (req.cookies.token) {
    req.token = req.cookies.token;
  }
  next();
};
