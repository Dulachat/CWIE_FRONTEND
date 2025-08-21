const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    console.log(`Request: ${req.method} ${req.url}`); // เพิ่ม logging
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => { // เปลี่ยนเป็น 0.0.0.0
    if (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
    console.log("Server is running on http://0.0.0.0:3000 V2");
  });
}).catch((err) => {
  console.error('Error preparing Next.js app:', err);
  process.exit(1);
});