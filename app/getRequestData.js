getRequestData = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", function (data) {
        body += data.toString();
      });

      req.on("end", function (data) {
          resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = getRequestData;
