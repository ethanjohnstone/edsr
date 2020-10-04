const service = require("../services/ph.service");
const Record = require("../models/phRecord.model");

/**
 * Function to create the ph record in the collection
 */
exports.create = (req, res, next) => {
    if (!req.body.reading) {
        return res.status(400).send("Phrecord is missing a reading..");
    }

    const record = new Record({
        reading: req.body.temp
    });

    record.save()
        .then(data => {
            res.redirect("/");
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occured while saving the record"});
        });
};

exports.find = (req, res) => {
    let params = req.params || {};
    let query = {
        reading: params.reading
    };

    if (!query) {
        return res.status(400).send("Bad Request");
    }

    service.find(query, (err, response) => {
        if (error) {
            return res.status(404).send(error);
        }

        return (!response) ?
            res.status(204).send("No data found") :
            res.status(200).send(response);
    })
}

/**
 * Update the phrecord data by their ID;
 */
exports.updateById = (req, res) => {
    let body = req.body;

    if (!body.id) {
        return res.status(400).send('Id is missing');
    }

    let updateData = body.data || {};
    service.updateById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
};

/**
 * Function to update the record data by filter condition;
 */
exports.update = (req, res) => {
    let body = req.body;
    let query = body.query;
    let data = body.data;
    let options = body.options;

    if (!query) {
        return res.status(400).send("Bad request");
    }

    service.update(query, data, options, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    })
};

exports.delete = (req, res) => {
    let body = req.body || {};
    let query = body.query;

    if (!query) {
        return res.status(400).send("Bad request");
    }

    service.delete(query, (err, response) => {
        if (error) {
            return res.status(400).send(error);
        }

        if (response) {
            if (response.n === 1 && response.ok === 1) {
                response.status(202).send(body);
            }

            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: "No data found"
                });
            }
        }
    });
};