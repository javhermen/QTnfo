const mongoose = require ('mongoose');

const Schema = mongoose.Schema;


const QTnoteSchema = new Schema ({
  type: { type: String },
  info: { type: String },
  color: { type: String },
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

const QTnote = mongoose.model('QTnote', QTnoteSchema);

module.exports = QTnote;