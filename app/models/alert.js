var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var AlertSchema		= new Schema({
	id: {
		type: Number,
		required: true,
		index: {
			unique: true
		}
	},
	createdBy: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		required: true,
		default: Date.now()
	}
});

module.exports = mongoose.model('Alert', AlertSchema);