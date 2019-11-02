exports.execQuery = (connection, query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, resp) => {
      if (!err) {
        resolve(resp);
      } else {
        reject(err);
      }
    });
  });
};
