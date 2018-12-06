//  vue 项目的路由文件

var express = require('express')

var request = require('request')
var async = require('async')
var { waterfall } = require('async')

var router = express.Router()

var { conn } = require('./db')

router.get('/', (req, res) => {
  console.log('111222')
  res.json({
    msg: 'wechat 项目路由',
    code: 'success'
  })
})

router.get('/list', (req, res) => {
  var subId = req.query.id
  subId = parseInt(subId)
  conn((err, db) => {
    db.collection('lesson')
      .find({ subId: subId }, {})
      .toArray((err, result) => {
        if (err) throw err
        res.json(result)
        db.close()
      })
  })
})

router.get('/addlike', (req, res) => {
  var title = req.query.title
  var img = req.query.img
  var id = req.query.id
  var body = { title, img, id }
  conn((err, db) => {
    db.collection('wechatLike').insert(body, (err, result) => {
      if (err) throw err
      if (result) {
        console.log('ok')
      }
      db.close()
      res.send(result)
    })
  })
})

router.get('/mylike', (req, res) => {
  conn((err, db) => {
    db.collection('wechatLike')
      .find({}, {})
      .toArray((err, result) => {
        if (err) throw err
        res.json(result)
        db.close()
      })
  })
})

router.get('/addlesson', (req, res) => {
  var url = 'https://c.open.163.com/open/mob/subscribe/home/list.do?rtypes=2'
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
        var data = body.data
        console.log(data)
        // res.send(data)

        conn((err, db) => {
          db.collection('lesson').insert(data, (err, result) => {
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

router.get('/wechat', (req, res) => {
  conn((err, db) => {
    db.collection('lesson')
      .find({}, {})
      .toArray((err, result) => {
        if (err) throw err
        res.json(result)
        db.close()
      })
  })
})

module.exports = router
