'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const {net} = require('electron');
var mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 160
        ,height: 60
        ,transparent: true
        ,frame: false
        ,resizable: false
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', function () {
    createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

exports.getLast = function (func) {
    const request = net.request('https://coincheck.com/api/ticker');
    request.on('response', (response) => {
        response.on('data', (chunk) => {
            func(JSON.parse(chunk).last);
        });
        response.on('end', () => {});
    });
    request.end();
};