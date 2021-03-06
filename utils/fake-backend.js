/******************************************************************************
 * 
 * This file is part of Serleena-Frontend
 * 
 * The MIT License (MIT)
 *
 * Copyright (C) 2015 Antonio Cavestro, Matteo Lisotto.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *****************************************************************************/


var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

// Serve a disabilitare il CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers",
  	"Origin, X-Requested-With, Content-Type, Accept, X-CustomToken, X-AuthToken");
  if ('OPTIONS' == req.method){
    return res.sendStatus(200);
  }
  next();
});

app.get('/user/token', function (req, res) {
  console.log(req);
  res.send("32fdb64818a41ec4aad07493090a9d047cab08d8");
});

app.post('/user', function (req, res) {
  console.log(req);
  res.send("ACK");
});

app.put('/user/recovery', function (req, res) {
  console.log(req);
  res.send("ACK");
});

var createExp = {};

app.get('/experiences', function (req, res) {
  var ret = {
    experiences: []
  };
  if (Object.keys(createExp).length != 0){
    ret.experiences.push({
      id: 1,
      name: createExp.name
    });
    ret.experiences.push({
      id: 2,
      name: "Esperienza di test"
    });
  }
  res.send(JSON.stringify(ret));
});

app.get('/paths/:from/:to', function (req, res){
  var paths = {
    paths: [
      {
        name: "Sentiero del monte Cinto",
        points: [
          {
            lat: 45.276413,
            lng: 11.650587
          },
          {
            lat: 45.275977,
            lng: 11.652806
          },
          {
            lat: 45.276257,
            lng: 11.654908
          },
          {
            lat: 45.277573,
            lng: 11.654297
          },
          {
            lat: 45.278192,
            lng: 11.655213
          },
          {
            lat: 45.279032,
            lng: 11.655626
          },
          {
            lat: 45.280266,
            lng: 11.655875
          },
          {
            lat: 45.281726,
            lng: 11.655550
          }
        ]
      }
    ]
  };
  res.send(JSON.stringify(paths));
});

app.get('/poi/:from/:to', function (req, res){
  var poi = [
    {
      "latitude": 45.280063,
      "longitude": 11.654495,
      "name": "POI1",
      "type": "INFO"
    },
    {
      "latitude": 45.280063,
      "longitude": 11.654495,
      "name": "POI1",
      "type": "WARNING"
    },
    {
      "latitude": 45.280063,
      "longitude": 11.654495,
      "name": "POI1",
      "type": "FOOD"
    }
  ];
  res.send(JSON.stringify(poi));
});

app.post('/experiences', function(req, res){
  console.log(req.body);
  createExp = req.body;
  res.sendStatus(200);
});

app.delete('/experiences/:id', function(req, res){
  res.sendStatus(200);
});

app.get('/data/sync', function(req, res){
  var exp = {
    experiences: [
      {
        id: 1,
        name: "Esperienza 1",
        selected: true
      },
      {
        id: 2,
        name: "Esperienza 2",
        selected: false
      },
      {
        id: 3,
        name: "Esperienza 3",
        selected: true
      }
    ]
  };
  res.send(exp);
});

app.put('/data/sync', function(req, res){
  res.sendStatus(200);
});

app.put('/users/pair', function(req, res){
  res.sendStatus(200);
});

app.get('/experiences/:id', function(req, res){
  var exp = {
    name: "Esperienza di test",
    perimeter: {
      ne: {
        lat: 45.284005,
        lng: 11.645359
      },
      sw: {
        lat: 45.272599,
        lng: 11.660111
      }
    },
    poi: [
      {
        id: "!vjkldfjghksdlfjvsdlk",
        name: "POI B",
        lat: 45.281597,
        lng: 11.653035
      }
    ],
    userpoints: [
      {
        lat: 45.280063,
        lng: 11.654495
      },
    ],
    tracks: [
      {
        id: 1,
        name: "Percorso A"
      },
      {
        id: 2,
        name: "Percorso B"
      },
      {
        id: 3,
        name: "Percorso C"
      }
    ]
  };
  res.send(JSON.stringify(exp));
});

app.get('/experiences/:eid/tracks/:tid', function(req, res){
  var c = [
    {
      lat: 45.276413,
      lng: 11.650587
    },
    {
      lat: 45.275977,
      lng: 11.652806
    },
    {
      lat: 45.276257,
      lng: 11.654908
    },
    {
      lat: 45.277573,
      lng: 11.654297
    },
    {
      lat: 45.278192,
      lng: 11.655213
    },
    {
      lat: 45.279032,
      lng: 11.655626
    },
    {
      lat: 45.280266,
      lng: 11.655875
    },
    {
      lat: 45.281726,
      lng: 11.655550
    }
  ];
  res.send(c);
});

app.get('/experiences/:eid/tracks/:tid/telemetries', function(req, res){
  var t = [
    {
      id: 1,
      date: "23/01/2015 15:54"
    },
    {
      id: 2,
      date: "24/01/2015 08:54"
    },
    {
      id: 3,
      date: "25/01/2015 15:54"
    }
  ];
  res.send(JSON.stringify(t));
});

app.get('/experiences/:eid/tracks/:tid/telemetries/:telid', function(req, res){
  var t = [];
  var telid = req.params.telid;
  if (telid == 1){
     t = [
      {
        id: 1,
        heart: 95
      },
      {
        id: 2,
        heart: 145
      },
      {
        id: 3,
        heart: 185
      },
      {
        id: 4,
        heart: 160
      },
      {
        id: 5,
        heart: 145
      },
    ];
  } else if (telid == 2){
    t = [
      {
        id: 1,
        heart: 95
      },
      {
        id: 2,
        heart: 125
      },
      {
        id: 3,
        heart: 165
      },
      {
        id: 4,
        heart: 140
      },
      {
        id: 5,
        heart: 125
      },
    ];
  } else {
    t = [
      {
        id: 1,
        heart: 95
      },
      {
        id: 2,
        heart: 125
      },
      {
        id: 3,
        heart: 145
      },
      {
        id: 4,
        heart: 120
      },
      {
        id: 5,
        heart: 110
      },
    ];
  }

  res.send(JSON.stringify(t));
});

app.put('/experiences/:id', function(req, res){
  res.sendStatus(200);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Fake serleena Backend listening at http://%s:%s', host, port);

});