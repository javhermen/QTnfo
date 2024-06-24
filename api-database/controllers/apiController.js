const TableController = require('./tableController');

class ApiController {

  static JSON_HELP = {
    api: "QTnfo_database_api",
    valid_routes: {
      GET: {
        "/": "Gets this info message.",
        "/api": "Gets this info message.",
        "/api/<table>": "Gets all the data from a table.",
        "/api/<table>/id/<id>": "Gets the info of a single row on a table using the ID as a reference."
      },
      POST: {
        "/api/<table>": "Insert a row on this table."
      }
    }
  }

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


  static async putQTbox(req, res) {
    const { QTboxID } = req.params;
    const QTbox = req.body.QTbox;
    TableController.updateQTbox(res, QTboxID, QTbox);
  }

  static async putQTnote(req, res) {
    const { QTnoteID } = req.params;
    const QTnote = req.body.QTnote;
    TableController.updateQTnote(res, QTnoteID, QTnote);
  }


  static async postQTnotebook(req, res) {
    const QTnotebook = req.body.QTnotebook;
    TableController.insertQTnotebook(res, QTnotebook);
  }

  static async postQTbox(req, res) {
    const { QTpageID } = req.params;
    const QTbox = req.body.QTbox;
    TableController.insertQTbox(res, QTpageID, QTbox);
  }

  static async postQTnote(req, res) {
    const { QTboxID } = req.params;
    const QTnote = req.body.QTnote;
    TableController.insertQTnote(res, QTboxID, QTnote);
  }


  static async deleteQTbox(req, res) {
    const { QTpageID, QTboxID } = req.params;
    TableController.deleteQTbox(res, QTpageID, QTboxID);
  }

  static async deleteQTnote(req, res) {
    const { QTboxID, QTnoteID } = req.params;
    TableController.deleteQTnote(res, QTboxID, QTnoteID);
  }



  static async reset(req, res) {
    TableController.reset(res);
  }
}

module.exports = ApiController;