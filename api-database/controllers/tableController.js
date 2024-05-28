class TableController {
  static getModel(table) {
    switch (table) {
      case 'QTnotes':
        return require('../models/QTnoteModel');
        break;
    
      default:
        throw new Error('ER_NO_SUCH_TABLE')
        break;
    }
  }

	static async getAll(res, table) {
		try {
      let model = this.getModel(table);
      const data = await model.find();
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

  static async insert(res, table, body) {
    try {
      let model = this.getModel(table);
      let MyRow = new model(body);
      
      MyRow.save();

      res.json(MyRow)
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}


  static async errorHandler(res, error) {
    let errorCode = error.message;

    if (errorCode === 'ER_NO_SUCH_TABLE') {
      res.status(400).json({response: 'The table does not exist', error: errorCode});
    }
    else {
      res.status(500).json({response: 'Internal Server Error', error});
    }
  }
}

module.exports = TableController;