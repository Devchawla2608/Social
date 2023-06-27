module.exports.setFlash = function(req, res , next){
    res.locals.flash = {
        'success':req.flash('success'),
        'error':req.flash('error'),
    }
    next();
}
// Find out flash from request and  set it up to locals of res
