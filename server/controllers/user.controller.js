
var service = require('../services/user.service');

/**
 **_ Function to create the user in user collection.
 _**/
exports.create = (req, res, next) => {
    var body = new User(req.body);
    if (!body.username) {
        return res.status(400).send('User name is missing');
    }
    
    service.create(body, (error, response) => {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
}

/**
 _ Function to find user from user collection.
 _*/
exports.find = function (req, res) {
    var params = req.params || {};
    var query = {
        username: params.username
    };
    if (!query) {
        return res.status(400).send('Bad Request');
    }

    service.find(query, function (error, response) {
        if (error) {
            return res.status(404).send(error);
        }

        return (!response) ? 
            res.status(204).send('No Data Found') :
            res.status(200).send(response);
    });
}

/**
 **_ Function to update the user data  by their ID.
 _**/
exports.updateById = function (req, res) {
    var body = req.body;

    if (!body.id) {
        res.status(400).send('Id is missing');
        return;
    }
    var updateData = body.data || {}
    service.updateById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
}

/**
 _ Function to uodate the user data by filter condition.
 _**/
exports.update = function (req, res) {
    var body = req.body;
    var query = body.query;
    var data = body.data;
    var options = body.options
    if (!query) {
        res.status(400).send('Bad request');
        return;
    }

    service.update(query, data, options, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
}

/**
 _ Function to delete the user from collection.
 */
exports.delete = function (req, res) {
    var body = req.body || {};
    var query = body.query;
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    service.delete(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(202).send(body);
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: 'No data found'
                });
            }
        }
    });
}
//TODO: 
// Model.find()
// Model.findById()

class User {
    constructor(userData) {
        this.username = userData.username || '';
        this.firstName = userData.firstName || '';
        this.lastName = userData.lastName || '';
        this.dob = userData.dob || '';
        this.address = userData.address || '';
        this.phone = userData.phone || '';
        this.role = userData.role || '';
    }
}