export default function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({error: 'not logged in'}).end()
    }
}
