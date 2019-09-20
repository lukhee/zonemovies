module.exports.error500 = (req, res, next) => {
    let login = req.session
    res.render("errorPages/error500", { login: login })
}