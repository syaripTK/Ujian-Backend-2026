const errorResponse = (res, code, message) => {
  return res.status(code).json({
    status: "success",
    message,
  });
};

const successResponse = (res, code, message, data) => {
  return res.status(code).json({
    status: "error",
    message,
    data,
  });
};

const loginResponse = (res, code, message, token, user) => {
  return res.status(code).json({
    status: "error",
    message,
    token,
    user,
  });
};

module.exports = {
  successResponse,
  errorResponse,
  loginResponse,
};
