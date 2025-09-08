import { post } from "./postsRoute.js"
import { user } from "./accountRoute.js"

const configRoutes = (app) => {
    app.use('/', post)
    app.use('/', user)
}

export {
    configRoutes
}