const mongoose = require ('mongoose');

const Schema = mongoose.Schema;


const QTpageSchema = new Schema ({
  name: { type: String },
  QTboxes: [{ type: Schema.Types.ObjectId, ref: 'QTbox' }],
  QTconnections: [{ type: Schema.Types.ObjectId, ref: 'QTconnection' },
]
});

const QTpage = mongoose.model('QTpage', QTpageSchema);

module.exports = QTpage;