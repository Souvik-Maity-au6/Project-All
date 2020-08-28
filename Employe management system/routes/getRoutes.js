const  express = require("express");
const  router = express.Router();
const {authenticate} = require("../middlewares/authenticate")
const  {renderEmployeeDashboard,renderCreateCompany,renderCompaniesList,renderCompanyDetails} = require("../controllers/getController");

router.get("/employee-dashboard", authenticate, renderEmployeeDashboard);
router.get("/create-company", authenticate, renderCreateCompany);
router.get("/companies-list",  renderCompaniesList)
router.get("/company-details/:id",  renderCompanyDetails)

module.exports = router;
