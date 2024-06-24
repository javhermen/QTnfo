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


  static async validateQTnotebookTitle(res, title) {
		try {
      let model = this.getModel('QTnotebooks');
      const data = await model.find({ name: title });

      if (data.length === 0) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false });
      }
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
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
      res.json(data);
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}

  static async getNotebookPage(res, QTnotebook, QTpage) {
		try {
      let model = this.getModel('QTnotebooks');
      this.getModel('QTpages');
      this.getModel('QTboxes');
      this.getModel('QTnotes');
      this.getModel('QTconnections');

      const data = await model
        .findOne({ name: QTnotebook }, 'QTpages')
        .populate({
          path: 'QTpages',
          match: { name: QTpage },
          populate: [{
            path: 'QTboxes',
            populate: { path: 'QTnotes' },
          },
          {
            path: 'QTconnections'
          }]
        });

      res.json(data.QTpages[0]);
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}


  static async updateQTbox(res, QTboxID, QTbox) {
		try {
      let model = this.getModel('QTboxes');
      const data = await model.findOne({_id: QTboxID});
      data.title = QTbox.title ? QTbox.title : data.title;
      data.color = QTbox.color ? QTbox.color : data.color;
      data.pos = QTbox.pos ? QTbox.pos : data.pos;
      data.dimensions = QTbox.dimensions ? QTbox.dimensions : data.dimensions;
      data.save();
      res.json(data);
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}

  static async updateQTnote(res, QTnoteID, QTnote) {
		try {
      let model = this.getModel('QTnotes');
      const data = await model.findOne({_id: QTnoteID});
      data.type = QTnote.type ? QTnote.type : data.type;
      data.info = QTnote.info ? QTnote.info : data.info;
      data.color = QTnote.color ? QTnote.color : data.color;
      data.pos = QTnote.pos ? QTnote.pos : data.pos;
      data.dimensions = QTnote.dimensions ? QTnote.dimensions : data.dimensions;
      data.save();
      res.json(data);
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}


  static async insertQTnotebook(res, QTnotebook) {
		try {

      if (QTnotebook.name) {

        const QTnotebooks = this.getModel('QTnotebooks');
        const data = await QTnotebooks.find({ name: QTnotebook.name });

        if (data.length === 0) {
          
          const newQTnotebook = new QTnotebooks({
            name: QTnotebook.name ? QTnotebook.name : 'title',
            color: QTnotebook.color ? QTnotebook.color : '#6464ff',
            img: QTnotebook.img ? QTnotebook.img : '',
            QTpages: QTnotebook.QTpages ? QTnotebook.QTpages : []
          });
    
          await newQTnotebook.save();
    
          res.json(newQTnotebook);

        } else {
          res.json({ invalidName: true });
        }

      } else {
        res.json({ invalidName: true });
      }

		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}

  static async insertQTpage(res, QTnotebookID, QTpage) {
		try {

      if (QTpage.name) {

        const QTnotebooks = this.getModel('QTnotebooks');
        const QTnotebook = await QTnotebooks.findOne({_id: QTnotebookID}).populate('QTpages');

        const QTpagesArray = QTnotebook.QTpages;

        for (let i = 0; i < QTpagesArray.length; i++) {
          const element = QTpagesArray[i];
          
          if (element.name === QTpage.name) {
            res.json({ invalidName: true });
            return
          }
        }

        const QTpages = this.getModel('QTpages');
        const QTpageNew = new QTpages({
          name: QTpage.name ? QTpage.name : 'title',
          color: QTpage.color ? QTpage.color : '#999999',
          QTboxes: QTpage.QTboxes ? QTpage.QTboxes : [],
          QTconnections: QTpage.QTconnections ? QTpage.QTconnections : [],
        });
  
        await QTpageNew.save();
  

        QTnotebook.QTpages.push(QTpageNew._id);
        QTnotebook.save();


        res.json(QTpageNew);
      } else {
        res.json({ invalidName: true });
      }
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}

  static async insertQTbox(res, QTpageID, QTbox) {
		try {

      const QTboxes = this.getModel('QTboxes');
      const QTboxNew = new QTboxes({
        title: QTbox.title ? QTbox.title : 'title',
        color: QTbox.color ? QTbox.color : '#1b3049',
        pos: QTbox.pos ? QTbox.pos : { x: 0, y: 0, z: 5 },
        dimensions: QTbox.dimensions ? QTbox.dimensions : { width: 200, height: 200 },
        QTnotes: QTbox.QTnotes ? QTbox.QTnotes : []
      });

      await QTboxNew.save();

      const QTpages = this.getModel('QTpages');
      const QTpage = await QTpages.findOne({_id: QTpageID});

      QTpage.QTboxes.push(QTboxNew._id);

      QTpage.save();


      res.json(QTboxNew);
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}

  static async insertQTnote(res, QTboxID, QTnote) {
		try {

      const QTnotes = this.getModel('QTnotes');
      const QTnoteNew = new QTnotes({
        type: QTnote.type ? QTnote.type : 'text',
        info: QTnote.info ? QTnote.info : 'text...',
        color: QTnote.color ? QTnote.color : '#1b3049',
        pos: QTnote.pos ? QTnote.pos : { x: 0, y: 0, z: 6},
        dimensions: QTnote.dimensions ? QTnote.dimensions : { width: 100, height: 100 },
      });

      await QTnoteNew.save();


      const QTboxes = this.getModel('QTboxes');
      const QTbox = await QTboxes.findOne({_id: QTboxID});

      QTbox.QTnotes.push(QTnoteNew._id);

      QTbox.save();

      res.json(QTnoteNew);
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}


  static async deleteQTnotebook(res, QTnotebookID) {
		try {
      const QTnotebooks = this.getModel('QTnotebooks');
      const QTnotebook = await QTnotebooks.findOne({_id: QTnotebookID});

      if (QTnotebook.QTpages) {
        const QTpagesIDs = [...QTnotebook.QTpages];
  
        for (let i = 0; i < QTpagesIDs.length; i++) {
        console.log('entered more');

          const QTpageID = QTpagesIDs[i];
  
          await this.deleteQTpage(null, QTnotebookID, QTpageID);
        }
      }

      await QTnotebooks.deleteOne({ _id: QTnotebookID });

      res.json({deleted: 'true'});
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}

  static async deleteQTpage(res, QTnotebookID, QTpageID) {
		try {
      const QTpages = this.getModel('QTpages');
      const QTpage = await QTpages.findOne({_id: QTpageID});

      if (QTpage.QTboxes) {
        const QTboxesIDs = [...QTpage.QTboxes];
  
        for (let i = 0; i < QTboxesIDs.length; i++) {
          const QTboxID = QTboxesIDs[i];
  
          await this.deleteQTbox(null, QTpageID, QTboxID);
        }
      }

      await QTpages.deleteOne({ _id: QTpageID });

      if (res !== null) {
        const QTnotebooks = this.getModel('QTnotebooks');
        const QTnotebook = await QTnotebooks.findOne({_id: QTnotebookID});
  
        QTnotebook.QTpages = QTnotebook.QTpages.filter(e => e !== QTpageID);
  
        await QTnotebook.save();

        res.json({deleted: 'true'});
      }
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}

  static async deleteQTbox(res, QTpageID, QTboxID) {
		try {
      const QTboxes = this.getModel('QTboxes');
      const QTbox = await QTboxes.findOne({_id: QTboxID});

      if (QTbox.QTnotes) {
        const QTnotesIDs = [...QTbox.QTnotes];
  
        for (let i = 0; i < QTnotesIDs.length; i++) {
          const QTnoteID = QTnotesIDs[i];
  
          await this.deleteQTnote(null, QTboxID, QTnoteID);
        }
      }

      await QTboxes.deleteOne({ _id: QTboxID });

      if (res !== null) {
        const QTpages = this.getModel('QTpages');
        const QTpage = await QTpages.findOne({_id: QTpageID});

        QTpage.QTboxes = QTpage.QTboxes.filter(e => e !== QTboxID);

        await QTpage.save();
        res.json({deleted: 'true'});
      }
		}
    catch (error) {
      console.log(error);
      this.errorHandler(res, error);
		}
	}

  static async deleteQTnote(res, QTboxID, QTnoteID) {
		try {

      const QTnotes = this.getModel('QTnotes');
      await QTnotes.deleteOne({_id: QTnoteID});


      const QTboxes = this.getModel('QTboxes');
      const QTbox = await QTboxes.findOne({_id: QTboxID});

      QTbox.QTnotes = QTbox.QTnotes.filter(e => e !== QTnoteID);

      await QTbox.save();

      if (res !== null) {
        res.json({deleted: 'true'});
      }
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
        color: '#1b3049',
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
        color: '#1b3049',
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
        color: '#1b3049',
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
        color: '#1b3049',
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
        color: '#1b3049',
        QTboxID1: QTbox1._id,
        QTboxID2: QTbox2._id
      });


      let QTpage = new QTpageModel({
        name: 'pageNameNum',
        color: '#999999',
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