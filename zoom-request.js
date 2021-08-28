const fs = require("fs");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// API認証情報の読み込み
const API_KEY = process.env.ZOOM_API_KEY;
const API_SECRET = process.env.ZOOM_API_SECRET;

// JWT Token生成関数
const generateToken = (apiKey, apiSecret, expirySeconds) => {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: apiKey,
    exp: now + expirySeconds,
  };
  const token = jwt.sign(payload, apiSecret, { algorithm: "HS256" });
  return token;
};

// Request関数
const getRequest = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

// Requestの実行
const url = "https://api.zoom.us/v2/users";
const token = generateToken(API_KEY, API_SECRET, 600);
const reqHeaders = new fetch.Headers();
reqHeaders.append("Authorization", `Bearer ${token}`);
const reqOptions = {
  method: "GET",
  headers: reqHeaders,
};

getRequest(url, reqOptions).then((response) =>
  fs.writeFileSync("./output.json", JSON.stringify(response), {
    encoding: "utf-8",
  })
);
