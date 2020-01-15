const axios = require("axios")
const Dev = require("../models/Dev")
const ParseArrayAsString = require("../utils/ParseStringAsArray")

module.exports = {
    async index(request, response) {
        let devs = await Dev.find()

        return response.json(devs)
    },
    async store(request, response) {
        const { github_username, techs, latitude, longitude} = request.body
        
        let dev = await Dev.findOne({github_username})

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, bio, avatar_url} = apiResponse.data

            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: ParseArrayAsString(techs),
                location
            })
        }
        
        return response.json(dev)
    }
}