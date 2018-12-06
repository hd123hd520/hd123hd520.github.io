var express = require("express");

var router = express.Router()
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIoar8t7hBc0eQ'
const secretAccessKey = 'zEt7MkFkVU9g3ciSlcYL40FPUKQvak'



var request = require('request')
var async = require("async")
var {
    waterfall
} = require("async")

var {
    conn
} = require('./db')

var {
    waterfall,
    series
} = require('async')

var {
    ObjectID
} = require('mongodb')


router.get('/login', (req, res) => {
    console.log(req.body)
    res.send('登陆ok')
})

router.get('/content', (req, res) => {
    conn((err, db) => {
        if (err) throw err
        db.collection("123").find({}, {}).toArray((err, result) => {
            if (err) throw err
            console.log(result)
            res.json(result)
            db.close()
        })
    })
})

router.get('/deleteComment', (req, res) => {
    var _id = req.query._id
    console.log(_id)
    conn((err, db) => {
        if (err) throw err
        var comment = db.collection("123")
        series([
            function (callback) {
                comment.remove({
                    _id: ObjectID.createFromHexString(_id)
                }, (err, result) => {
                    if (err) throw err
                    callback(null, result)
                })
            },
            function (callback) {
                comment.find({}, {}).toArray((err, result) => {
                    if (err) throw err
                    console.log(result)
                    callback(null, result)
                })
            }
        ], function (err, result) {
            if (err) throw err
            res.json(result[1])
            db.close()
        })
    })
})


router.get('/addmovie', (req, res) => {
    // var url = "http://api.douban.com/v2/movie/top250?count=100"
    var e = request({
        url: url,
        method: 'GET',
        headers: {
            'Content-Type': 'text/json',
            'Charset': 'utf-8'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body)
            console.log(body)
            // res.send(body)
            var data = body.subjects
            console.log(data)
            // res.send(data)

            conn((err, db) => {
                db.collection("movie250").insert(data, (err, result) => {
                    if (err) throw err
                    if (result) {
                        console.log("ok")
                    }
                    db.close()
                    res.send(result)
                })

            })
        }
    })
})

router.get('/todaymovie',(req,res)=>{
    conn((err, db) => {
        db.collection("tuijianmovie").find({}, {})
            .toArray((err, result) => {
                if (err) throw err;
                res.json(result);
                db.close();
            })
    })
})

router.get('/searchtodaymovie',(req,res)=>{
    var id = 'http://api.douban.com/movie/'+req.query.id
    conn((err, db) => {
        db.collection("tuijianmovie").find({id:id}, {})
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
            db.close();
        })
    })
})

router.get('/searchHmv',(req,res)=>{
    var input = req.query.key
    var reg = new RegExp(input)
    conn((err, db) => {
        db.collection("hotmovieT").findOne({
            title:reg
        }, {
                id: 1,
                title: 1,
            }, (err, result) => {
                if (err) throw err;
                console.log(result)
                res.json(result);
                db.close();
            })
    })
})
router.get('/searchhotmovie',(req,res)=>{
    var id = req.query.id
    conn((err, db) => {
        db.collection("hotmovieT").find({id:id}, {})
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
            db.close();
        })
    })
})
router.get('/hotmovie',(req,res)=>{
    conn((err, db) => {
        db.collection("hotmovieT").find({}, {})
            .toArray((err, result) => {
                if (err) throw err;
                res.json(result);
                db.close();
            })
    })
})

router.get('/topmovie',(req,res)=>{
    var skip = parseInt(req.query.skip)
    var limit = 25
    conn((err, db) => {
        db.collection("movie250").find({}, {}).limit(limit).skip(skip)
            .toArray((err, result) => {
                if (err) throw err;
                res.json(result);
                db.close();
            })
    })
})

router.get('/userInfo',(req,res)=>{
    var tel = req.query.tel
    console.log(tel)
    conn((err,db)=>{
        db.collection("reactuserinfo").findOne({tel:tel},{_id:0},(err,result)=>{
            if(err) throw err
            console.log(result)
            res.send(result)
            db.close()
        })
    })
})

router.get('/mymovie',(req,res)=>{
    var id = req.query.id
    console.log(id)
    var url = "http://api.douban.com/v2/movie/"+id
    var e = request({
        url: url,
        method: 'GET',
        headers: {
            'Content-Type': 'text/json',
            'Charset': 'utf-8'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body)
            console.log("body")
            // res.send(body)
            var data = body
            console.log(data)
            // res.send(data)

            conn((err, db) => {
                db.collection("tuijianmovie").insert(data, (err, result) => {
                    if (err) throw err
                    if (result) {
                        console.log("ok")
                    }
                    db.close()
                    res.send(result)
                })

            })
        }
    })
})

router.get('/sendCode', (req, res) => {
    var tel = req.query.tel
    console.log(tel)
    var num = "";
    for (var i = 0; i < 4; i++) {
        num += Math.floor(Math.random() * 10)
    }

    var insertData = function (db, callback) {
        var user = db.collection("reactuserinfo")

        waterfall([
            function (callback) {
                user.findOne({
                    tel: tel,
                    // use: use,
                }, (err, result) => {
                    // console.log(result)
                    if (err) throw err
                    if (result) {
                        callback(null, true)
                    } else {
                        callback(null, false)
                    }
                })
            },
            function (arg, callback) {
                // console.log(arg)
                if (!arg) {
                    user.insert({
                        tel: tel,
                        code: num,
                        state: 1
                    }, (err, result) => {
                        if (err) throw err
                        // console.log(result)
                        callback(null, {
                            code: num,
                        })
                    })
                } else {
                    user.update({
                        tel: tel
                    }, {
                            $set: {
                                code: num
                            }
                        }, (err, result) => {
                            if (err) throw err
                            // console.log(result)
                            callback(null, {
                                code: num,
                                tel: tel
                            })
                        })
                }
            },
            function (tip, callback) {
                console.log(tel)
                console.log(num)
                let code = {
                    code: num
                }
                // let code = num;
                if (tip.code) {
                    let smsClient = new SMSClient({
                        accessKeyId,
                        secretAccessKey
                    })
                    smsClient.sendSMS({
                        PhoneNumbers: tel,
                        SignName: 'TalkTonight',
                        TemplateCode: 'SMS_145594161',
                        TemplateParam: JSON.stringify(code)
                    }).then(function (respon) {
                        let {
                            Code
                        } = respon
                        if (Code === 'OK') {

                            console.log("ok")
                            callback(null, {
                                msg: "发送成功"
                            })
                        }
                    }, function (err) {

                        if (err) throw err
                        callback(null, {
                            msg: "发送失败"
                        })
                    })
                } else {
                    console.log("1123")
                }
            }
        ], function (err, result) {
            if (err) throw err
            callback(result)
        })
    }

    conn((err, db) => {
        if (err) throw err
        insertData(db, (result) => {
            console.log(result)
            res.send(result)
        })
    })

})


router.get("/signup", (req, res) => {
    var tel = req.query.tel
    var code = req.query.code
    var insertData = function (db, callback) {
        var user = db.collection("reactuserinfo")
        user.findOne({
            tel: tel,
            code: code
        }, (err, result) => {
            if (err) throw err

            callback(result)
        })
    }
    conn((err, db) => {
        if (err) throw err
        insertData(db, (result) => {
            if (result) {
                req.session.usertel = tel
                res.send({
                    msg: "登陆成功",
                    tel:tel,
                    code: 0
                })
                console.log(result)
                db.close()
            } else {
                res.send({
                    msg: "验证码错误",
                    code: 1
                })
                console.log(result)

                db.close()
            }
        })
    })
})

module.exports = router;