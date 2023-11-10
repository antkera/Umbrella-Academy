const express = require("express")
const router = express.Router()

const getRouting = (path, view, data) => {
    this.router.get(path, (req, res, next) => {
        res.render(view, data)
    })
}

module.exports = getRouting