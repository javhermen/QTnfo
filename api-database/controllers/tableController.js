const TableModel = require('../models/tableModel');

class TableController {

	static async getAll(res, table) {
		try {
      const data = await TableModel.getAll(table);
      res.json(data);
		}
    catch (error) {
      this.errorHandler(res, error);
		}
	}

	static async getByID(res, table, id) {
		try {
      const data = await TableModel.getByID(table, id);

      if (data) {
        res.json(data);
      }
      else {
        res.status(400).json({
          response: 'ID not found on the table',
          error: 'ID_NOT_FOUND',
          id: id,
          table: table
        });
      }
		}
    catch (error) {
      this.errorHandler(res, error);
		}
	}

	static async getByName(res, table, name) {
		try {
      const data = await TableModel.getByName(table, name);

      if (data.length > 0) {
        res.json(data);
      }
      else {
        res.status(400).json({
          response: 'Name not found on the table',
          error: 'NAME_NOT_FOUND',
          name: name,
          table: table
        });
      }

		}
    catch (error) {
      this.errorHandler(res, error);
		}
	}

  static async getFilteredBy(res, table, col, val) {
		try {
      const data = await TableModel.getFilteredBy(table, col, val);
      
      if (data) {
        res.json(data);
      }
      else {
        res.status(400).json({
          response: 'Something went wrong',
          error: 'SOMETHING',
          col: col,
          val: val,
          table: table
        });
      }
		}
    catch (error) {
      this.errorHandler(res, error);
		}
	}

  static async test(res) {
		try {
      const data = await TableModel.test();
      
      if (data) {
        res.json(data);
      }
      else {
        res.status(400).json({
          response: 'Something went wrong',
          error: 'SOMETHING',
          col: col,
          val: val,
          table: table
        });
      }
		}
    catch (error) {
      this.errorHandler(res, error);
		}
	}

  static async add(res, table, body) {
		try {
      const data = await TableModel.add(table, body);
      
      if (data) {
        res.json(data);
      }
      else {
        res.status(400).json({
          response: 'Something went wrong',
          error: 'SOMETHING',
          col: col,
          val: val,
          table: table
        });
      }
		}
    catch (error) {
      this.errorHandler(res, error);
		}
	}


  static async errorHandler(res, error) {
    let errorCode = error.code;

    if (errorCode === 'ER_NO_SUCH_TABLE') {
      res.status(400).json({response: 'The table does not exist', error: errorCode, sql: error.sql});
    }
    else {
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = TableController;