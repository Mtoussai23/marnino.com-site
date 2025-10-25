// pages/api/presave-click.js
export default function handler(req, res) {
  console.log("PreSave click", { ts: Date.now(), ua: req.headers["user-agent"] });
  res.status(204).end();
}
