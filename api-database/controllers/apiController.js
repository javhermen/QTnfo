const TableController = require('./tableController');

class ApiController {

  static async router(req, res) {
    const { table, id, name, col, val, imgName } = req.params;

    if (id) {
      TableController.getByID(res, table, id);
    }
    else if (name) {
      TableController.getByName(res, table, name);
    }
    else if (col && val) {
      TableController.getFilteredBy(res, table, col, val);
    }
    else if (imgName) {
      res.sendFile(imgName, { root: './uploads' });
    }
    else if (table) {
      TableController.getAll(res, table);
    }
    else {
      TableController.test(res);
    }
  }
}

module.exports = ApiController;