var service = require("../services/ph.service");

/**
 * Function to create the ph record in the collection
 */
exports.create = (req, res, next) => {
    const body = new PhRecord(req.body);
    if (!body.reading) {
        return res.status(400).send("Phrecord is missing a reading..");
    }

    service.create(body, (err, response) => {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
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

class PhRecord {
    constructor(data) {
        this.reading = data.reading || "";
    }
}