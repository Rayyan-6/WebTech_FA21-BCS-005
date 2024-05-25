module.exports = async function (req, res, next) {
    if (!req.session.user) {
    //   res.flash("danger", "Only logged in user is allowed to access");
      return res.render("errorPage",{msg:"Please login first to access this page"});
    }
    next();
  };
  