const mongoose = require ('mongoose');

const Schema = mongoose.Schema;


const QTnoteSchema = new Schema ({
  user: {type: String},
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

const QTnote = mongoose.model('QTnote', QTnoteSchema);

module.exports = QTnote;