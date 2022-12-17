const Roumbersment = require('../models/RoumbersmentModel');
const Logger = require('../logger');



exports.getRoumbersment = function (req, res) {
    Roumbersment.find({
        bulletinId: req.body.id_bulletin
    } || {
        bulletinId: req.params.idbulletin
    })
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            res.send(body.remprice);
        })

}

exports.postRoumbersment = function (req, res) {
    var PRICE
    var days = req.body.days
    if((req.body.code==101)||(req.body.code==102)||(req.body.code==103)||
    (req.body.code==104)||(req.body.code==105)||(req.body.code==106)||
    (req.body.code==107)||(req.body.code==108)||(req.body.code==109)||
    (req.body.code==110)||(req.body.code==111)||(req.body.code==112)){
        PRICE = req.body.amount*0.8
        if (PRICE>=50)
        {
            PRICE=50}
    }
    else if ((req.body.code==201)){
        PRICE = req.body.amount*0.9
        if (PRICE>=600)
        {
            PRICE=600}
    }
    else if ((req.body.code==206)){
        PRICE = req.body.amount*0.8
        if (PRICE>=180)
        {
            PRICE=180}
            else if ((req.body.code==207)){
                PRICE = req.body.amount*0.8
                if (PRICE>=150)
                {
                    PRICE=150}}
    }
    else if ((req.body.code==202)){
        PRICE = req.body.amount*0.8
        if (PRICE>=(55*days))
        {
            PRICE=55*days}
    }
    else if ((req.body.code==208)){
        PRICE = req.body.amount*0.8
        if (PRICE>=300)
        {
            PRICE=300}
    }
    else if ((req.body.code==203)){
        PRICE = req.body.amount
        if (PRICE>=200)
        {
            PRICE=200}
    }
    else if ((req.body.code==209)){
        PRICE = req.body.amount
        if (PRICE>=80)
        {
            PRICE=80}
    }
    else if ((req.body.code==204)){
        PRICE = req.body.amount
        if (PRICE>=40)
        {
            PRICE=40}
    }else{
        PRICE = req.body.amount
    }
    let roumbersment = new Roumbersment({
        code: req.body.code,
        amount: req.body.amount,
        remprice:PRICE,
        id_bulletin: req.body.id_bulletin
    });
    roumbersment.save(function (err) {
        if (err) {
            Logger.error(err);
            return res.status(500).send({
                error: "sys-001",
                message: "Internal error is occured"
            });
        }
        res.send({
            _id: roumbersment._id
        })
    })
}

exports.putRoumbersment = function (req, res) {
    Roumbersment.findById(req.params.roumbersmentId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Roumbersment.findByIdAndUpdate(req.params.roumbersmentId, {
                    $set: req.body
                }, function (err, body) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested roumbersment is successfully modified.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested Roumbersment is not found"
                });
            }

        })

}


exports.deleteRoumbersment = function (req, res) {
    Roumbersment.findById(req.params.roumbersmentId)
        .exec(function (err, body) {
            if (err) {
                Logger.error(err);
                return res.status(500).send({
                    error: "sys-001",
                    message: "Internal error is occured"
                });
            }
            if (body) {
                Roumbersment.findByIdAndRemove(req.params.roumbersmentId, function (err) {
                    if (err) {
                        Logger.error(err);
                        return res.status(500).send({
                            error: "sys-001",
                            message: "Internal error is occured"
                        });
                    }
                    res.send('The requested roumbersment is successfully deleted.');
                })
            } else {
                res.status(400).send({
                    error: "app-002",
                    message: "The requested roumbersment is not found"
                });
            }
        })
}