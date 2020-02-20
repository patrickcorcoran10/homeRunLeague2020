const db = require("../models");

module.exports = function(app) {
  // POST Route from Draft Page
  app.post("/api/draft", (req, res) => {
    db.Drafts.create({
      team: req.body.team,
      pickID: req.body.pickID,
      pickName: req.body.pickName,
      month: req.body.month,
      total: req.body.total,
      cut: req.body.cut
    }).then(dbData => {
      res.json(dbData);
    });
  });
  // GET Route for Admin Page
  app.get("/api/april/draft-roster", (req, res) => {
    db.Drafts.findAll({
      where: {
        cut: false,
        month: "april"
      }
    }).then(dbData => {
      res.json(dbData);
    });
  });
};
