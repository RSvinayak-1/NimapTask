var express = require('express');
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('nimapinfotech', []);
var cors = require('cors');
app.use(bodyparser());
app.use(bodyparser.json({ limit: '5mb' }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET,DELETE,PATCH,OPTIONS");
    next();
});

app.post('/insertCategory', function (req, res) {
    // console.log(req.body);
    db.category.find({ "categoryName": req.body.catName }, function (err, data) {
        if (err) throw err;
        if (data.length == 0) {
            db.category.insert({ "categoryName": req.body.catName, "categoryId": req.body.catId, "AddedOn": req.body.date },
                function (err, doc) {
                    if (err) throw err;
                    // console.log("inserted Data");
                    res.json({
                        status: true,
                        message: "Added the Category SuccessFully"
                    })
                })
        } else {
            res.json({
                status: 501,
                message: "Duplicate Category is not allowed"
            })
        }
    })
})

app.get('/getCetgories', function (req, res) {
    // console.log("for finding the category");
    db.category.find({}, function (err, doc) {
        if (err) throw err;
        // console.log("All categories")
        // console.log(doc);
        res.json(doc);
    })
})

app.delete('/deleteCategory:id', function (req, res) {
    var id = req.params.id;
    // console.log(id);
    db.category.remove({ "_id": mongojs.ObjectID(id) }, function (err, doc) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "category deleted successfully"
        })
    })
})

app.put('/updateCat', function (req, res) {
    db.category.update({ "_id": mongojs.ObjectID(req.body.id) }, { $set: { "categoryName": req.body.catName, "categoryId": req.body.catId, "AddedOn": req.body.date } },
        function (err, doc) {
            if (err) console.log("there is err with updating");
            res.json({
                status: true,
                message: "Update was successful"
            })
        })
})


app.post("/insertProduct", function (req, res) {
    db.product.insert({ "productName": req.body.pName, "productId": req.body.Pid, "categoryName": req.body.cName },
        function (err, doc) {
            if (err) console.log(err)
            res.json({
                status: 200,
                message: "Product Inserted Successfully"
            })
        })
})

app.get('/getProducts', function (req, res) {
    db.product.find({}, function (err, doc) {
        if (err) console.log(err)
        // console.log("ggggggggggggggggggg")
        // console.log(doc)
        res.json(doc);
    })
})

app.delete('/deleteProduct:id', function (req, res) {
    var id = req.params.id;
    db.product.remove({ "_id": mongojs.ObjectId(id) }, function (err, doc) {
        if (err) console.log(err)
        res.json({
            status: 200,
            message: "Product Deleted Successfully"
        })
    })
})

app.put("/updatePro", function (req, res) {
    db.product.update({ "_id": mongojs.ObjectId(req.body.Id) },
        { $set: { "productName": req.body.pName, "productId": req.body.pId } }, function (err, doc) {
            if (err) console.log(err)
            res.json({
                status: 200,
                message: "Product Details Updated Successfully"
            })
        })
})

app.get("/getList", function (req, res) {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    db.category.aggregate(
        [{
            $lookup: {
                from: "product",
                localField: "categoryName",
                foreignField: "categoryName",
                as: "data"
            }
        },
        { $unwind: "$data" },
        {
            $project: {
                id: 1,
                categoryName: 1,
                categoryId: 1,
                productName: "$data.productName",
                productId: "$data.productId"
            }
        }], function (err, doc) {
            if (err) console.log(err);
            console.log(doc);
            res.json(doc);
        })
})

const port = 4444;
app.listen(port, function () {
    console.log(port);
})