const TableController = require('./tableController');

class ApiController {

  static JSON_HELP = {
    api: "QTnfo_database_api",
    valid_routes: {
      GET: {
        "/api": "Gets this info message.",
        "/api/<table>": "Gets all the data from a table.",
        "/api/<table>/id/<id>": "Gets the info of a single row on a table using the ID as a reference."
      },
      POST: {
        "/api/<table>": "Insert a row on this table."
      }
    }
  }

  static async router(req, res) {
    const { method, params, body } = req;
    const { table, id } = params;


    switch (method) {
      case "GET":
        if (id) {
          TableController.getByID(res, table, id);
        } else if (table) {
          TableController.getAll(res, table);
        } else {
          res.json(ApiController.JSON_HELP);
        }
        break;

      case "POST":
        if (id) {

        } else if (table) {
          TableController.add(res, table, body);
        } else {
          TableController.test(res);
        }
        break;

      case "PUT":
        break;

      case "DELETE":
        break;
    
      default:
        break;
    }
  }
}

module.exports = ApiController;