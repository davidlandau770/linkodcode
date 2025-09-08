import { user } from "./accountRoute.js"

const configRoutes = (app) => {
    app.use('/', user)
}

export {
    configRoutes
}