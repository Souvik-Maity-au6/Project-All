var User = require("../models/User");
var Company = require("../models/Company");

module.exports = {
  async renderEmployeeDashboard(req, res) {
    try {
      const user = await User.findById(req.session.userId);
      const length = user.pastCompanies.length;
      const currCompany = user.currCompany;
      const company = await Company.findById(currCompany.id);
      companyName = "null";
      joinedDate = "null";
      if (company) {
        companyName = company.name;
        joinedDate = company.joinedDate;
      }
      const pastCompanies = user.pastCompanies;
      res.render("employee-dashboard", {
        user: req.session.userId,
        companyName,
        joinedDate,
        pastCompanies,
        length,
        userName: user.name,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  },
  async renderCreateCompany(req, res) {
    try {
      res.render("create-company", {
        user: req.session.userId,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async renderCompaniesList(req, res) {
    try {
      var resignStatus = false;
      const companies = await Company.find();
      if (req.session.userId) {
        var user = await User.findById(req.session.userId);
        if (user.currCompany) {
          resignStatus = true;
        }
      }
      res.render("companies-list", {
        companies,
        resignStatus,
        user: req.session.userId,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async renderCompanyDetails(req, res) {
    try {
      const company = await Company.findById(req.params.id);
      const currEmployees = company.currEmployees;
      const pastEmployees = company.pastEmployees;
      res.render("company-details", {
        company,
        currEmployees,
        pastEmployees

      });
    } catch (error) {
      console.log(error);
    }
  },
};
