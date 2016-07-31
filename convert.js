#!/usr/bin/env node

var pcbStackup        = require('pcb-stackup'),
    fs                = require('fs'),
    path              = require('path'),

    argv              = require('minimist')(process.argv.slice(2)),
    fileNames         = argv._,

    srcDir            = path.dirname(fileNames[0]),
    svgFilenameTop    = path.join(srcDir, './top.svg'),
    svgFilenameBottom = path.join(srcDir, './bottom.svg'),
    boardDataFilename = path.join(srcDir, './data.json'),

    colours           = {
        'DEFAULT': {
            fr4: '#666',
            cu : '#ccc',
            cf : '#c93',
            sm : 'rgba(0, 66, 0, 0.75)',
            ss : '#fff',
            sp : '#999',
            out: '#000'
        },
        'OSHPARK': {
            fr4: '#666',
            cu : '#ccc',
            cf : '#c93',
            sm : 'rgba(75, 0, 130, 0.75)',
            ss : '#fff',
            sp : '#999',
            out: '#000'
        }
    },
    stackupOptions = {
        id             : 'my-board-id',
        maskWithOutline: true,
        color          : colours.OSHPARK
    };

console.log("Using these gerbers:\n\t" + fileNames.join(",\n\t"));
console.log("Output files will be: " + svgFilenameTop + " and " + svgFilenameBottom + "\n");

console.log("Processing layers...");
var layers = fileNames.map(function(path) {
    return {gerber: fs.createReadStream(path), filename: path};
});

console.log("Generating SVGs...");
pcbStackup(layers, stackupOptions, function(error, stackup) {
    if (error) {
        console.error("Oops! An error occurred while generating SVGs!");
        throw error;
    }

    console.log("\nWriting top layer SVG to '" + svgFilenameTop + "'...");
    fs.writeFileSync(svgFilenameTop, stackup.top.svg);

    console.log("Writing bottom layer SVG to '" + svgFilenameBottom + "'...");
    fs.writeFileSync(svgFilenameBottom, stackup.bottom.svg);

    console.log(
        "Board size is: " + stackup.bottom.width + " x " + stackup.bottom.height + " " + stackup.bottom.units +
        " / " + stackup.bottom.width + " x " + stackup.bottom.height + " " + stackup.bottom.units +
        " (Top/Bottom)"
    );
    console.log("Writing board data (size, etc.) to " + boardDataFilename);
    fs.writeFileSync(boardDataFilename, JSON.stringify(
        {
            top: {
                width: stackup.top.width,
                height: stackup.top.height,
                units: stackup.top.units
            },
            bottom: {
                width: stackup.bottom.width,
                height: stackup.bottom.height,
                units: stackup.bottom.units
            }
        }
    ));
});
