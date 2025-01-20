import express from "express";
import { urlModel } from "../models/shortUrl";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl } = req.body;
    // Validate if fullUrl is provided
    if (!fullUrl) {
      res.status(400).json({
        success: false,
        message: "fullUrl is required",
      });
      return;
    }

    const urlFound = await urlModel.findOne({ fullUrl });

    if (urlFound) {
      res
        .status(409)
        .json({ success: false, message: "URL already exists", url: urlFound });
    }

    const shortUrl = await urlModel.create({ fullUrl });
    res
      .status(201)
      .json({ success: true, message: "Short URL created", data: shortUrl });
  } catch (error) {
    console.error("Error creating URL:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find().sort({ createdAt: 1 });
    if (!shortUrls) {
      res.status(404).send({ message: "Urls not found" });
    }

    if (shortUrls.length < 0) {
      res.status(404).send({ message: "short url not found" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};
export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });

    if (!shortUrl) {
      res.status(404).send({ message: "Full Url not found" });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });

    if (shortUrl) {
      res.status(200).send({ message: "Requested url successfully deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
