var express = require("express");
var router = express.Router();

function getClientIp(req) {
  /*
    1. 先通过x-forwarded-for获取
    2. 没有就用remoteAddress
  */

  var forwardedIpsStr = req.header("x-forwarded-for");
  var ip = "";

  if (forwardedIpsStr) {
    ip = forwardedIpsStr.split(",")[0];
  }

  if (!ip) {
    // remoteAddress is "::ffff:127.0.0.1"
    // ::ffff: 是IPV6相关
    ip = req.socket.remoteAddress.split(":")[3];
    console.log(ip);
  }

  return ip;
}

/* GET home page. */
router.get("/", function (req, res, next) {
  // console.log("req.headers", req.headers);

  let ip = getClientIp(req);

  res.send({
    ip: ip,
    "x-forwarded-for": req.headers["x-forwarded-for"] || "",
    "x-real-ip": req.headers["x-real-ip"] || "",
  });
});

module.exports = router;
