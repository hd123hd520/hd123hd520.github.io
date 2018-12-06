//  vue 项目的路由文件

var express = require('express')

var request = require('request')
var async = require('async')
var { waterfall } = require('async')

const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIoar8t7hBc0eQ'
const secretAccessKey = 'zEt7MkFkVU9g3ciSlcYL40FPUKQvak'

var router = express.Router()

var { conn } = require('./db')

router.get('/', (req, res) => {
console.log('111222')
  res.json({
    msg: 'vue 项目路由',
    code: 'success'
  })
})

router.get('/sendCode', (req, res) => {
  var tel = req.query.tel
  // console.log(tel)
  var num = ''
  for (var i = 0; i < 4; i++) {
    num += Math.floor(Math.random() * 10)
  }

  var insertData = function(db, callback) {
    var user = db.collection('vueuserinfo')

    waterfall(
      [
        function(callback) {
          user.findOne(
            {
              tel: tel
              // use: use,
            },
            (err, result) => {
              // console.log(result)
              if (err) throw err
              if (result) {
                callback(null, true)
              } else {
                callback(null, false)
              }
            }
          )
        },
        function(arg, callback) {
          // console.log(arg)
          if (!arg) {
            user.insert(
              {
                tel: tel,
                code: num,
                state: 1
              },
              (err, result) => {
                if (err) throw err
                // console.log(result)
                callback(null, {
                  code: num
                })
              }
            )
          } else {
            user.update(
              {
                tel: tel
              },
              {
                $set: {
                  code: num
                }
              },
              (err, result) => {
                if (err) throw err
                // console.log(result)
                callback(null, {
                  code: num,
                  tel: tel
                })
              }
            )
          }
        },
        function(tip, callback) {
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
            smsClient
              .sendSMS({
                PhoneNumbers: tel,
                SignName: 'TalkTonight',
                TemplateCode: 'SMS_145594161',
                TemplateParam: JSON.stringify(code)
              })
              .then(
                function(respon) {
                  let { Code } = respon
                  if (Code === 'OK') {
                    console.log('ok')
                    callback(null, {
                      msg: '发送成功'
                    })
                  }
                },
                function(err) {
                  if (err) throw err
                  callback(null, {
                    msg: '发送失败'
                  })
                }
              )
          } else {
            console.log('1123')
          }
        }
      ],
      function(err, result) {
        if (err) throw err
        callback(result)
      }
    )
  }

  conn((err, db) => {
    if (err) throw err
    insertData(db, result => {
      console.log(result)
      res.send(result)
    })
  })
})

router.get('/signup', (req, res) => {
  var tel = req.query.tel
  var code = req.query.code
  var insertData = function(db, callback) {
    var user = db.collection('vueuserinfo')
    user.findOne(
      {
        tel: tel,
        code: code
      },
      (err, result) => {
        if (err) throw err

        callback(result)
      }
    )
  }
  conn((err, db) => {
    if (err) throw err
    insertData(db, result => {
      if (result) {
        req.session.usertel = tel
        res.send({
          msg: '登陆成功',
          code: 0
        })
        db.close()
      } else {
        res.send({
          msg: '手机号或者验证码错误',
          code: 1
        })
        db.close()
      }
    })
  })
})

router.get('/movie', (req, res) => {
  conn((err, db) => {
    db.collection('movie')
      .find(
        {},
        {
          year: 1,
          title: 1,
          id: 1,
          genres: 1,
          _id: 0
        }
      )
      .toArray((err, result) => {
        if (err) throw err
        res.json(result)
        db.close()
      })
  })
})

router.get('/hotmovienouser', (req, res) => {
  var url =
    ' https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E6%AD%A6%E6%B1%89&start=0&count=100&client=&udid= '
  var e = request(
    {
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'text/json',
        Charset: 'utf-8'
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var body = JSON.parse(body)
        console.log(body)
        // res.send(body)
        var data = body.subjects
        console.log(data)
        // res.send(data)

        conn((err, db) => {
          db.collection('hotmovieT').insert(data, (err, result) => {
            if (err) throw err
            if (result) {
              console.log('ok')
            }
            db.close()
            res.send(result)
          })
        })
      }
    }
  )
})

router.get('/gethot', (req, res) => {
  // var limit = req.params.limit
  // console.log(limit)
  conn((err, db) => {
    db.collection('hotmovie')
      .find({}, {})
      .toArray((err, result) => {
        if (err) throw err
        res.json(result)
        db.close()
      })
  })
})

router.get('/getmusic', (req, res) => {
  var limit = req.query.limit
  var skip = req.query.skip
  conn((err, db) => {
    db.collection('test')
      .find({}, {})
      .toArray((err, result) => {
        if (err) throw err
        res.json(result)
        db.close()
      })
  })
})

router.get('/musicinfo', (req, res) => {
  var id = req.query.id
  console.log(id)
  conn((err, db) => {
    db.collection('test').findOne(
      {
        id: id
      },
      (err, result) => {
        if (err) throw err
        console.log(result)
        res.json(result)
        db.close()
      }
    )
  })
})

router.get('/movieinfo', (req, res) => {
  var id = req.query.id
  console.log(req.query)
  conn((err, db) => {
    db.collection('hotmovie').findOne(
      {
        id: id
      },
      (err, result) => {
        if (err) throw err
        console.log(result)
        res.json(result)
        db.close()
      }
    )
  })
})

router.get('/search', (req, res) => {
  var name = req.query.name
  var reg = new RegExp(name)
  console.log(name)
  conn((err, db) => {
    db.collection('hotmovie').findOne(
      {
        title: reg
      },
      {
        id: 1,
        title: 1
      },
      (err, result) => {
        if (err) throw err
        console.log(result)
        res.json(result)
        db.close()
      }
    )
  })
})

router.get('/addmusic', (req, res) => {
  var id = req.query.id
  console.log(id)
  var url = 'https://api.douban.com/v2/music/' + id
  var e = request(
    {
      url: url,
      method: 'GET',
      headers: {
        'Content-Type': 'text/json',
        Charset: 'utf-8'
      }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var body = JSON.parse(body)
        console.log(body)
        // res.send(body)
        // var data = body.subjects
        // console.log(data)
        // res.send(data)

        conn((err, db) => {
          db.collection('mymusic').insert(body, (err, result) => {
            if (err) throw err
            if (result) {
              console.log(result)
              console.log('ok')
            }
            db.close()
            res.send(result)
          })
        })
      }
    }
  )
})

router.get('/set', (req, res) => {
  var ads = req.query
  ads = JSON.parse(ads)

  console.log(ads)
  conn((err, db) => {
    if (err) throw err
    var list = db.collection("mylist")

    series([
        function(callback){
            list.remove({},(err,result)=>{
                if(err) {
                    callback(err,null)

                }
                callback(null,result)
            })
        },
        function (callback){
            list.insert(ads,(err,result)=>{
                if(err){
                    callback(err,null)
                }
                callback(null,result)
            })
        }
    ],function(err,result){
        if(err) throw err
        res.send('插入成功')
    })
  })
})

module.exports = router
