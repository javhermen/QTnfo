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

  /*
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
          TableController.insert(res, table, body);
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
  */
  static async help(req, res) {
    res.json(ApiController.JSON_HELP);
  }


  static async getAllNotebooks(req, res) {
    TableController.getAll(res, 'QTnotebooks');
  }

  static async getAllnotebooksPopulated(req, res) {
    TableController.getAllnotebooksPopulated(res);
  }

  static async getNotebookPages(req, res) {
    const { QTnotebook } = req.params;
    TableController.getNotebookPages(res, QTnotebook);
  }

  static async getNotebookPage(req, res) {
    const { QTnotebook, QTpage } = req.params;
    TableController.getNotebookPage(res, QTnotebook, QTpage);
  }
  /*
  static async router(req, res) {
    const { method, params, body } = req;
    const { table, id } = params;


    switch (method) {
      case "GET":
        if (table) {
          TableController.getAll(res, table);
        } else {
          res.json(ApiController.JSON_HELP);
        }
        break;

      case "POST":
        if (table) {
          TableController.insert(res, table, body);
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
  */

  static async refill(req, res) {
    TableController.refill(res);
  }

  static async unfill(req, res) {
    TableController.unfill(res);
  }

  static async reset(req, res) {
    TableController.reset(res);
  }
}

module.exports = ApiController;