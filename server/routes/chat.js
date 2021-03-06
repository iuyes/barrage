'use strict';
var router = require('express').Router();
var AV = require('leanengine');


var APP_ID = process.env.LC_APP_ID;
var APP_KEY = process.env.LC_APP_KEY;

const Theme = AV.Object.extend('Theme');


router.get('/:channel', (req, res, next) => {


  var channelId = req.params.channel;

  var themeId = req.query.theme || '564c78aa60b259caed4cffcb';

  var query = new AV.Query(Theme);

  var dataRender = {
    CHANNEL : channelId,
    APP_ID : APP_ID,
    APP_KEY : APP_KEY
  };

  query.get(themeId).try((theme) => {

    if(theme) {
      res.render('chat/'+theme.get('path')+'/index', dataRender);
    } else {
      res.render('chat/danmaku/index', dataRender);
    }
  }).catch((error) => {
    next(error);
  });


});



module.exports = router;