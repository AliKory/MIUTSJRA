const express = require("express");
const routes = require("./rutas/routes"); 
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const forumRoutes = require('./rutas/forumRoutes');
const app = express();
app.use(express.json());


app.set("view engine", "ejs");
app.use("/web", express.static(path.join(__dirname, "/web")));
app.use("/js", express.static(path.join(__dirname, "/web/js")));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret:process.env.SECRETO_SESION,
  resave: true,
  saveUninitialized:true
}));

dotenv.config();

// Usar rutas definidas
// Example: /login, /logout, /inicio, /error
app.use("/", routes);
app.use('/api', forumRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
