const mongoose = require ('mongoose');

const Schema = mongoose.Schema;


const QTfavoriteSchema = new Schema ({
  url: { type: String },
});

const QTfavorite = mongoose.model('QTfavorite', QTfavoriteSchema);

module.exports = QTfavorite;