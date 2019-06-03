const express = require('express');
const bodyParser = require('body-parser');
const soap = require("soap");

const  userService = require('../services/user.service');
const  playListService = require('../services/playlist.service');
const  trackService = require('../services/track.service');


var myService = {
    productionary: {
        productionary_0: {
            createUser: function (args) {
                return userService.create(args);
            },
            updateUser: function (args) {
                return userService.update(args);
            },
            getUserById: function (args) {
                return userService.getById(args);
            },
            getAllUsers: function (args) {
                return userService.getAll();
            },
            createTrack: function (args) {
                return trackService.create(args)
            },
            updateTrack: function (args) {
                return trackService.update(args);
            },
            getTrackById: function (args) {
                return trackService.getById(args);
            },
            getAllTracks: function (args) {
                return trackService.getAll();
            },
            createPlayList: function (args) {
                return playListService.create(args);
            },
            updatePlayList: function (args) {
                return playListService.update(args);
            },
            getPlayListById: function (args) {
                return playListService.getById(args);
            },
            getAllPlayList: function (args) {
                return playListService.getAll(args);
            },
        }
    }
};

var xml = require('fs').readFileSync('./apis/soap/xml.wsdl', 'utf8');

var app = express();

//body parser middleware are supported (optional)
app.use(bodyParser.raw({ type: function () { return true; }, limit: '5mb' }));

app.listen(5000, function () {
    console.log('Servidor soap rodando na porta 5000');
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    let server = soap.listen(app, {
        path: '/wsdl',
        services: myService,
        xml: xml,
        callback: function (err, res) {
            console.log('===================SOAP SERVER INITIALIZED===================');
        },
        postProcess: () => {
            console.log("===================POSTPROCESS===================")
        }
    });

    server.log = ((type, data) => {
        // console.log(type,"\n")
        if(type == "replied"){
            console.log("\n", "===========================================RESPONSE==========================================");
            console.log(data.replace(new RegExp(">", 'g'),">\n"), "\n=============================================================================================");
        }
    })
    server.on("request", (request, methodName) => {
        console.log("\n", "===========================================REQUEST===========================================");
        console.log(request,'\n');
        console.log("\n", "=============================================================================================" ,'\n');
    });
    // server.on("response", (request, methodName) => {
    //     console.log("\n", "===========================================RESPONSE==========================================");
    //     console.log(request,'\n');
    //     console.log("\n", "=============================================================================================" ,'\n');
    // });
});