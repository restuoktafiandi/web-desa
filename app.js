const express = require("express")
const path = require("path")
const routerAdmin = require("./routes/adminRoutes")
const routerWeb = require("./routes/webRoutes")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static(path.join(__dirname, "/public")))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routerAdmin)
app.use(routerWeb)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.info(`Server run on http://localhost:${PORT}`);
})
