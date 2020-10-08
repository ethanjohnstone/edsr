const service = require("../services/temp.service");
const Record = require("../models/tempRecord.model");

exports.create = (req, res, next) => {
    if (!req.body.reading) {
        return res.status(400).send("TempRecord is missing a reading...");
    }

    const record = new Record({
        reading: req.body.reading
    });

    record.save()
        .then(data => res.redirect("/"))
        .catch(err => res.status(500).send({ message: err.message || "Some error occured while saving the record" }));
};

exports.findAll = (req, res) => {
    Record.find()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message || "error retrieving records"}));
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
    });
};

exports.updateById = (req, res) => {
    let body = req.body;
    if (!body.id) {
        return res.status(400).send("Id is missing");
    }

    let updateData = body.data || {};
    service.updateById(body.id, updateData, (err, response) => {
        if (response) {
            return res.status(200).send(response);
        } else if (err) {
            return res.status(400).send(err);
        }
    });
};

exports.update = (req, res) => {
    let body = req.body;
    let query = body.query;
    let data = body.data;
    let options = body.options;

    if (!query) {
        return res.status(400).send("Bad Request");
    }

    service.update(query, data, options, (err, response) => {
        if (response) {
            return res.status(200).send(response);
        } else if (err) {
            return res.status(400).send(err);
        }
    });
};

exports.delete = (req, res) => {
    let body = req.body || {};
    let query = body.query;

    if (!query) {
        return res.status(400).send(error);
    }

    service.delete(query, (err, response) => {
        if (err) {
            return res.status(400).send(err)
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