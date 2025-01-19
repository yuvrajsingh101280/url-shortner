"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_1 = require("../models/shortUrl");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        // Validate if fullUrl is provided
        if (!fullUrl) {
            res.status(400).json({
                success: false,
                message: "fullUrl is required",
            });
        }
        const urlFound = yield shortUrl_1.urlModel.findOne({ fullUrl });
        if (urlFound) {
            res
                .status(409)
                .json({ success: false, message: "URL already exists", url: urlFound });
        }
        const shortUrl = yield shortUrl_1.urlModel.create({ fullUrl });
        res
            .status(201)
            .json({ success: true, message: "Short URL created", data: shortUrl });
    }
    catch (error) {
        console.error("Error creating URL:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrls = yield shortUrl_1.urlModel.find();
        if (!shortUrls) {
            res.status(404).send({ message: "Urls not found" });
        }
        if (shortUrls.length < 0) {
            res.status(404).send({ message: "short url not found" });
        }
        else {
            res.status(200).send(shortUrls);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "internal server error" });
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).send({ message: "Full Url not found" });
        }
        else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: "Requested url successfully deleted" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
});
exports.deleteUrl = deleteUrl;
