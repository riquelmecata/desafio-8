import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { router as ProductRouter,dbM } from "./routes/api/product.routes.js"
import { router as CartRouter} from "./routes/api/carts.routes.js"
import { router as viewsRouter } from "./routes/view.routes.js"
import { router as sessionRouter } from "./routes/api/sessions.routes.js"

import "./dao/dbConfig.js"

import session  from "express-session";
import  FileStore  from "session-file-store";


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
const fileStore= FileStore(session)
app.use(session({
    store: new fileStore({
        path: __dirname+"/sessions"
    }),
    secret:"default",
    
}))


//Api Routes
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);
app.use('/api/sessions', sessionRouter);




// Views routes
app.use('/', viewsRouter);
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.get('/', (req, res) => {
    res.redirect('/login')
})



const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("Andando en puerto " + PORT)
})


httpServer