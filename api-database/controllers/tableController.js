class TableController {
  static getModel(table) {
    switch (table) {
      case 'QTnotebooks':
        return require('../models/QTnotebookModel');
        break;
      case 'QTpages':
        return require('../models/QTpageModel');
        break;
      case 'QTconnections':
        return require('../models/QTconnectionModel');
        break;
      case 'QTboxes':
        return require('../models/QTboxModel');
        break;
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
      console.log(error);
      this.errorHandler(res, error);
		}
	}

  static async getAllnotebooksPopulated(res) {
		try {
      let model = this.getModel('QTnotebooks');
      this.getModel('QTpages');
      this.getModel('QTboxes');
      this.getModel('QTnotes');
      this.getModel('QTconnections');
      
      let data = await model.find().populate({
        path: 'QTpages',
        populate: [{
          path: 'QTboxes',
          populate: { path: 'QTnotes' },
        },
        {
          path: 'QTconnections'
        }]
      });

      res.json(data);
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
  }

  static async getNotebookPages(res, QTnotebook) {
		try {
      let model = this.getModel('QTnotebooks');
      this.getModel('QTpages');
      const data = await model.findOne({ name: QTnotebook }, 'QTpages').populate('QTpages');
      res.json(data.QTpages);
		}
    catch (error) {
      console.log(error);
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


  static async refill(res) {
    try {
      let QTnoteModel = this.getModel('QTnotes');
      let QTnote1 = new QTnoteModel({
        type: 'text',
        info: 'hello1',
        pos: {
          x: 50,
          y: 50,
          z: 2
        },
        dimensions: {
          width: 100,
          height: 100
        }
      });

      let QTnote2 = new QTnoteModel({
        type: 'text',
        info: 'hello2',
        pos: {
          x: 50,
          y: 50,
          z: 2
        },
        dimensions: {
          width: 100,
          height: 100
        }
      });

      
      let QTboxModel = this.getModel('QTboxes');
      let QTbox1 = new QTboxModel({
        title: 'testHead1',
        pos: {
          x: 50,
          y: 50,
          z: 2
        },
        dimensions: {
          width: 200,
          height: 200
        },
        QTnotes: [QTnote1._id]
      });
      
      let QTbox2 = new QTboxModel({
        title: 'testHead2',
        pos: {
          x: 250,
          y: 250,
          z: 3
        },
        dimensions: {
          width: 200,
          height: 200
        },
        QTnotes: [QTnote2._id]
      });


      let QTconnectionModel = this.getModel('QTconnections');
      let QTconnection = new QTconnectionModel({
        QTboxID1: QTbox1._id,
        QTboxID2: QTbox2._id
      });


      let QTpageModel = this.getModel('QTpages');
      let QTpage = new QTpageModel({
        name: 'pageNameNum',
        QTboxes: [QTbox1._id, QTbox2._id],
        QTconnections: [QTconnection._id]
      });
      
      let QTnotebookModel = this.getModel('QTnotebooks');
      let QTnotebook = new QTnotebookModel({
        name: 'noteboook',
        QTpages: [QTpage._id]
      });


      QTnote1.save();
      QTnote2.save();
      QTbox1.save();
      QTbox2.save();
      QTconnection.save();
      QTpage.save();
      QTnotebook.save();

      res.json({refilled: 'true'});
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}


  static async unfill(res) {
    try {
      let QTnoteModel = this.getModel('QTnotes');
      let QTboxModel = this.getModel('QTboxes');
      let QTconnectionModel = this.getModel('QTconnections');
      let QTpageModel = this.getModel('QTpages');
      let QTnotebookModel = this.getModel('QTnotebooks');

      let QTnote = await QTnoteModel.deleteMany({});
      let QTbox = await QTboxModel.deleteMany({});
      let QTconnection = await QTconnectionModel.deleteMany({});
      let QTpage = await QTpageModel.deleteMany({});
      let QTnotebook = await QTnotebookModel.deleteMany({});

      res.json({unfilled: 'true'});
    }
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
    }
	}


  static async reset(res) {
    try {
      let QTnoteModel = this.getModel('QTnotes');
      let QTboxModel = this.getModel('QTboxes');
      let QTconnectionModel = this.getModel('QTconnections');
      let QTpageModel = this.getModel('QTpages');
      let QTnotebookModel = this.getModel('QTnotebooks');

      let QTnoteDeleted = await QTnoteModel.deleteMany({});
      let QTboxDeleted = await QTboxModel.deleteMany({});
      let QTconnectionDeleted = await QTconnectionModel.deleteMany({});
      let QTpageDeleted = await QTpageModel.deleteMany({});
      let QTnotebookDeleted = await QTnotebookModel.deleteMany({});


      let QTnote1 = new QTnoteModel({
        type: 'text',
        info: 'hello1',
        pos: {
          x: 50,
          y: 50,
          z: 2
        },
        dimensions: {
          width: 100,
          height: 100
        }
      });

      let QTnote2 = new QTnoteModel({
        type: 'text',
        info: 'hello2',
        pos: {
          x: 50,
          y: 50,
          z: 2
        },
        dimensions: {
          width: 100,
          height: 100
        }
      });

      
      let QTbox1 = new QTboxModel({
        title: 'testHead1',
        pos: {
          x: 50,
          y: 50,
          z: 2
        },
        dimensions: {
          width: 200,
          height: 200
        },
        QTnotes: [QTnote1._id]
      });
      
      let QTbox2 = new QTboxModel({
        title: 'testHead2',
        pos: {
          x: 250,
          y: 250,
          z: 3
        },
        dimensions: {
          width: 200,
          height: 200
        },
        QTnotes: [QTnote2._id]
      });


      let QTconnection = new QTconnectionModel({
        QTboxID1: QTbox1._id,
        QTboxID2: QTbox2._id
      });


      let QTpage = new QTpageModel({
        name: 'pageNameNum',
        QTboxes: [QTbox1._id, QTbox2._id],
        QTconnections: [QTconnection._id]
      });
      

      let QTnotebook = new QTnotebookModel({
        name: 'notebook',
        color: '#6464ff',
        QTpages: [QTpage._id]
      });


      QTnote1.save();
      QTnote2.save();
      QTbox1.save();
      QTbox2.save();
      QTconnection.save();
      QTpage.save();
      QTnotebook.save();


      res.json({reseted: 'true'});
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
      res.status(500).json({response: 'Internal Server Error', error: error});
    }
  }
}

module.exports = TableController;