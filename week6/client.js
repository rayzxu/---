const net = require("net");
const maxConnectCount = 10;

for (let i = 0; i < maxConnectCount; ++i) {
  net
    .createConnection({
      port: 8989,
      host: "localhost",
    })
    .on("data", (d) => {
      console.log(d.toString());
    })
    .on("error", (d) => {
      console.log(d.toString());
    });
}
