var express = require('express');
var app = express();
var fs = require('fs');

var usersData;

fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    if (!err) {
        usersData = JSON.parse(data);
    }
});

app.get('/getUsers', function (req, res) {
    res.json(usersData);
});

app.get('/getUsers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = usersData["user" + id]; // Access the user by key
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
  

app.post('/addUser', function (req, res) {
    var user = {
        "user6": {
            "id": 6,
            "firstname": "Jazel Mae",
            "lastname": "Endriga",
            "position": "Assistant Manager",
            "location": "Bunawan",
            "Company": "Vape Shop"
        }
    };
    usersData["user6"] = user["user6"];

    fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(usersData), 'utf8', function (err) {
        if (!err) {
            console.log("User added successfully.");
            res.json(usersData);
        }
    });
});

app.get('/:id', function (req, res) {
    var user = usersData["user" + req.params.id];
    console.log(user);
    res.json(user);
});

app.delete('/deleteUser/:id', function (req, res) {
    var id = req.params.id;
    if (usersData["user" + id]) {
        delete usersData["user" + id];

        fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(usersData), 'utf8', function (err) {
            if (!err) {
                console.log("User deleted successfully.");
                res.json(usersData);
            }
        });
    } else {
        res.status(404).send("User not found.");
    }
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("REST API demo app listening at http://%s:%s", host, port);
});