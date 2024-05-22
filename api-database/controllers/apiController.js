const TableController = require('./tableController');

class ApiController {

  static async router(req, res) {
    const { method, params, body } = req;
    const { table, id } = params;

    console.log(body); // GET POST PUT DELETE

    if (id) {
      TableController.getByID(res, table, id);
    }
    else if (table) {
      if (method === "GET") {
        TableController.getAll(res, table);
      } else if (method === "POST") {
        TableController.add(res, table, body);
      }
    }
    else {
      TableController.test(res);
    }
  }
}

module.exports = ApiController;