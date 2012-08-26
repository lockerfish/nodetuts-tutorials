var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
	name: String,
	description: String,
	price: Number,
	photo: String
});

mongoose.model('Product', productSchema);
