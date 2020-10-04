const mongoose = require('mongoose');
const phRecord = mongoose.model('phRecord');

/**
 * Function to execute the create query to create a ph record
 * @param {*} data ph data
 * @param {*} callback callback function
 */

exports.create = (data, callback) => {
    phRecord.create(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);    
    });
};

/**
 * Function to find the phrecord from collections
 * @param {*} query condition or expression to find the ph record from collections
 * @param {*} callback callback function
 */
exports.find = (query, callback) => {
    phRecord.findOne(query, callback);
};

/**
 * Function to execute the update query by ph record id
 * @param {*} id ph id
 * @param {*} data ph record data we need to update
 */
exports.updateById = (id, data, callback) => {
    phRecord.findByIdAndUpdate({
        _id: id
    }, data, (err, response) => {
        callback(err, response);
    });
};

/**
 * Function to execute the update query
 * @param {_} query Condition or filter to find the user
 * @param {_} data data we need to update
 * @param {_} options 
 */
exports.update = (query, data, options, callback) => {
    phRecord.findOneAndUpdate(query, data, options, (err, response) => {
        callback(err, callback);
    });
}

exports.delete = (query, callback) => {
    phRecord.deleteOne(query, callback);
}