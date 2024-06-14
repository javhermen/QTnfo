const mongoose = require ('mongoose');

const Schema = mongoose.Schema;


const QTconnectionSchema = new Schema ({
  QTboxID1: { type: Schema.Types.ObjectId, ref: 'QTbox' },
  QTboxID2: { type: Schema.Types.ObjectId, ref: 'QTbox' }
});

const QTconnection = mongoose.model('QTconnection', QTconnectionSchema);

module.exports = QTconnection;