const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:4001/";
const formidable = require('formidable');


const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file === undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        res.json({
            url: `/images/${req.file.originalname}`,
        })
        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __dirname + "/resources/static/assets/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = `${req.protocol}://${req.get('host')}/images/`;

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

const remove = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __dirname + "/resources/static/assets/uploads/";
  
    fs.unlink(directoryPath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not delete the file. " + err,
            });
        }
    
        res.status(200).send({
            message: "File is deleted.",
        });
    });
};
  
const removeSync = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __dirname + "/resources/static/assets/uploads/";
  
    try {
        fs.unlinkSync(directoryPath + fileName);
    
        res.status(200).send({
            message: "File is deleted.",
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete the file. " + err,
        });
    }
};

module.exports = {
    upload,
    getListFiles,
    download,
    remove,
    removeSync,
};
