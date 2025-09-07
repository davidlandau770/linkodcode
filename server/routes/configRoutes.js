import { user } from "./rLogin.js"

const configRoutes = (app) => {
    app.use('/', user)
}

export {
    configRoutes
}