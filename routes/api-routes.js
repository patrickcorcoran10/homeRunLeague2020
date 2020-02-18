const db = require("../models");

module.exports = function(app) {
  // POST Route from Draft Page
  app.post("/api/draft", (req, res) => {
    db.Drafts.create({
      team: req.body.team,
      pick: req.body.pick,
      month: req.body.month,
      total: req.body.total
    }).then(dbData => {
      res.json(dbData);
    });
  });
};
