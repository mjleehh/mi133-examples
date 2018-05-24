export default function userId(req) {
    return req.session.passport.user
}