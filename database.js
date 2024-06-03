const QTpageSchema = new Schema ({
  name: {type: String},
  boxes: [{
    boxID: {type: ObjectId}
  }],
  lines: [{
    lineID: {type: ObjectId}
  }]
});

const QTboxSchema = new Schema ({
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

const QTlineSchema = new Schema ({
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


const QTuserSchema = new Schema ({
  name: {type: String},
  pass: {type: String},
  pages: [{
    pageID: {type: ObjectId}
  }]
});