
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: Schema.Types.ObjectId, ref: "Category"},
  stock:  {type: Number, required: true},
  price: {type: Number, get: getPrice, set: setPrice}
})

function getPrice(num){
  return (num/100).toFixed(2);
}

function setPrice(num){
  return num*100;
}

ItemSchema.virtual('added_format').get(function() {
  return DateTime.fromJSDate(this.added).toLocaleString(DateTime.DATE_MED)

});

ItemSchema.virtual('URL').get(function() {
  return `/inventory/item/${this._id}`

});
module.exports = mongoose.model('Item',ItemSchema)