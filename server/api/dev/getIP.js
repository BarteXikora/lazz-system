const getIP = (req, res) => {
    res.json({ success: true, data: req.ip })
}

module.exports = getIP