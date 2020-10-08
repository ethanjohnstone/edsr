const mongoose = require('mongoose');
const tempRecord = mongoose.model('tempRecord');

/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
exports.create = (data, callback) => {
    tempRecord.create(data).then(response => {
        callback(null, response);
    }, error => {
        callback(error, null);
    });
};

exports.find = (query, callback) => {
    tempRecord.findOne(query, callback);
};

exports.updateById = (id, data, callback) => {
    tempRecord.findByIdAndUpdate({
        _id: id
    }, data, (err, response) => {
        callback(err, response);
    });
};

exports.update = (query, data, options, callback) => {
    tempRecord.findOneAndUpdate(query, data, options, (err, response) => {
        callback(err, callback);
    });
};

exports.delete = (query, callback) => {
    tempRecord.deleteOne(query, callback);
}
