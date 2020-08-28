var User = require("../models/User");
var Company = require("../models/Company");

module.exports={
    async leaveCompany(req, res) {
        try {
            const user = await User.findById(req.session.userId)
            user.currCompany = null
            await user.save()

            const company = await company.findById(req.params.id)
            const userObj = company.currEmployees.find((elem)=>{
                return elem.id==req.session.userId
            })
            const index = company.currEmployees.indexOf(userObj)
            company.currEmployees.splice(index,1)
            await company.save()

            return res.redirect("/employee-dashboard");
        } catch (error) {
            console.log(error)
        }
    },
   

}