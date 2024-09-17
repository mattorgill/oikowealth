
exports.getSession = async (req, res) => {

    if (req.session.user) {
        res.status(200).json({ authenticated: true, user: req.session.user });
    } else {
        res.status(200).json({ authenticated: false });
    }
}