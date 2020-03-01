const db = require("../models");
// const passport = require("../config/passport");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/admin");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // POST Route from Draft Page
  app.post("/api/draft", (req, res) => {
    db.Drafts.create({
      team: req.body.team,
      pickID: req.body.pickID,
      pickName: req.body.pickName,
      month: req.body.month,
      total: req.body.total,
      cut: req.body.cut,
      aprilPickTotal: 0,
      mayPickTotal: 0,
      junePickTotal: 0,
      julyPickTotal: 0,
      augustPickTotal: 0,
      septemberPickTotal: 0
    }).then(dbData => {
      res.json(dbData);
    });
  });
  // GET Route for Admin Page
  app.get("/api/april/draft-roster", (req, res) => {
    db.Drafts.findAll({
      where: {
        cut: false,
        month: "4"
      }
    }).then(dbData => {
      res.json(dbData);
    });
  });
  // GET Route for the Scoreboard Page
  app.get("/api/april/scoreboard", (req, res) => {
    db.Drafts.findAll({
      where: {
        cut: false,
        month: "4"
      }
    }).then(dbData => {
      res.json(dbData);
    });
  });
  // DELETE Route for Deleted Players on Admin Page
  app.delete("/api/delete:id", (req, res) => {
    db.Drafts.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbData => {
      res.json(dbData);
    });
  });
  // PUT Route for Cut Players on Admin Page
  app.put("/api/cut-player:id", (req, res) => {
    db.Drafts.update(
      {
        cut: true
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(dbData => {
      res.json(dbData);
    });
  });
  // PUT Route for Updating HR Totals
  app.put("/api/keep/:pickID", (req, res) => {
    db.Drafts.update(
      {
        total: req.body.total,
        month: req.body.month + 1
        // total: "35"
      },
      {
        where: {
          pickID: req.params.pickID
        }
      }
    ).then(dbData => {
      res.json(dbData);
    });
  });
};
