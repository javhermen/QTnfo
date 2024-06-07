const QTpageSchemaOld = new Schema ({
  name: {type: String},
  boxes: [{
    boxID: {type: ObjectId}
  }],
  lines: [{
    lineID: {type: ObjectId}
  }]
});

const QTboxSchemaOld = new Schema ({
  type: {type: String},
  info: {type: String},
  position: {
    x: {type: Number},
    y: {type: Number},
    z: {type: Number}
  },
  dimensions: {
    width: {type: Number},
    height: {type: Number}
  }
});

const QTlineSchemaOld = new Schema ({
  p1: {
    x: {type: Number},
    y: {type: Number},
  },
  p2: {
    x: {type: Number},
    y: {type: Number},
  },
  strokeWidth: {type: Number},
  color: {type: String}
});


const QTuserSchemaOld = new Schema ({
  name: {type: String},
  pass: {type: String},
  pages: [{
    pageID: {type: ObjectId}
  }]
});


////////////////////////////////////////////////////////////////////////


const QTuserSchema = new Schema ({
  name: {type: String},
  pass: {type: String},
  email: {type: String},
  pages: [{ type: Schema.Types.ObjectId, ref: 'QTpage' }]
});

const QTpageSchema = new Schema ({
  name: { type: String },
  QTboxes: [{ type: Schema.Types.ObjectId, ref: 'QTbox' }],
  QTconn: [{
    QTboxID1: {type: ObjectId},
    QTboxID2: {type: ObjectId}
  }]
});

const QTboxSchema = new Schema ({
  tittle: {type: String},
  pos: {
    x: {type: Number},
    y: {type: Number},
    z: {type: Number}
  },
  dimensions: {
    width: {type: Number},
    height: {type: Number}
  },
  QTnotes: [{ type: Schema.Types.ObjectId, ref: 'QTnote' }]
});

const QTnoteSchema = new Schema ({
  type: {type: String},
  info: {type: String},
  pos: {
    x: {type: Number},
    y: {type: Number},
    z: {type: Number}
  },
  dimensions: {
    width: {type: Number},
    height: {type: Number}
  }
});



////////////////////////////////////////////////////////////////////////



const QTuserSchemaNew = new Schema ({
  name: {type: String},
  pass: {type: String},
  QTpages: [{
    name: { type: String },
    QTboxes: [{
      tittle: {type: String},
      pos: {
        x: {type: Number},
        y: {type: Number},
        z: {type: Number}
      },
      dimensions: {
        width: {type: Number},
        height: {type: Number}
      },
      QTnotes: [{
        type: {type: String},
        info: {type: String},
        pos: {
          x: {type: Number},
          y: {type: Number},
          z: {type: Number}
        },
        dimensions: {
          width: {type: Number},
          height: {type: Number}
        }
      }]
    }],
    QTconn: [{
      QTboxID1: {type: ObjectId},
      QTboxID2: {type: ObjectId}
    }]
  }]
});