const express = require("express");

const server = express();

const AccountRouter = require("./data/accounts/acounts-router");

server.use("/api/accounts", AccountRouter);

server.use(express.json());

module.exports = server;
