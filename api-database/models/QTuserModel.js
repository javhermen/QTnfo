const mongoose = require ('mongoose');

const Schema = mongoose.Schema;


const QTuserSchema = new Schema ({
  user: {type: String},
  password: {type: String}
});

const QTuser = mongoose.model('QTuser', QTuserSchema);

module.exports = QTuser;