const express = require("express")
const path = require("path")
const routerAdmin = require("./routes/adminRoutes")
const routerAuth = require("./routes/authRouter")
const routerWeb = require("./routes/webRoutes")
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(cookieParser());

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.static(path.join(__dirname, "/node_modules/jodit/")))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routerAuth)
app.use(routerAdmin)
app.use(routerWeb)

app.use((req, res) => {
  res.render("404")
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.info(`Server run on http://localhost:${PORT}`);
})
