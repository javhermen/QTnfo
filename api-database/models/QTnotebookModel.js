const mongoose = require ('mongoose');

const Schema = mongoose.Schema;


const QTnotebookSchema = new Schema ({
  name: { type: String },
  color: { type: String },
  img: { type: String},
  QTpages: [{ type: Schema.Types.ObjectId, ref: 'QTpage' }]
});

const QTnotebook = mongoose.model('QTnotebook', QTnotebookSchema);

module.exports = QTnotebook;