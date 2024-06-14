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


const QTnotebookSchema = new Schema ({
  name: { type: String },
  pages: [{ type: Schema.Types.ObjectId, ref: 'QTpage' }]
});

const QTpageSchema = new Schema ({
  name: { type: String },
  QTboxes: [{ type: Schema.Types.ObjectId, ref: 'QTbox' }],
  QTconn: [{
    QTboxID1: { type: Schema.Types.ObjectId, ref: 'QTbox' },
    QTboxID2: { type: Schema.Types.ObjectId, ref: 'QTbox' }
  }]
});

const QTboxSchema = new Schema ({
  title: { type: String },
  pos: {
    x: { type: Number },
    y: { type: Number },
    z: { type: Number }
  },
  dimensions: {
    width: { type: Number },
    height: { type: Number }
  },
  QTnotes: [{ type: Schema.Types.ObjectId, ref: 'QTnote' }]
});

const QTnoteSchema = new Schema ({
  type: { type: String },
  info: { type: String },
  pos: {
    x: { type: Number },
    y: { type: Number },
    z: { type: Number }
  },
  dimensions: {
    width: { type: Number },
    height: { type: Number }
  }
});