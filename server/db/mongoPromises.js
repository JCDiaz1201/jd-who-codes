const mongoCall = require("./config/db.mongoCalls")

let getVideos = params => {
    return new Promise((resolve, reject) => {
        mongoCall.getVideoIDs()
            .then((message) => {
                // console.log("DB call: ", message)
                resolve(message)
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = { getVideos }