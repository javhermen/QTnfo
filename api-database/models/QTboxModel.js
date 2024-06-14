const mongoose = require ('mongoose');

const Schema = mongoose.Schema;


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

const QTbox = mongoose.model('QTbox', QTboxSchema);

module.exports = QTbox;