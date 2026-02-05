import express from 'express'
import session from 'express-session';
import path from 'path'
import dotenv from 'dotenv'
import contactRoutes from './routes/contact.routes.js'

dotenv.config()
const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: 'my_admin_secret',   // koi bhi strong string
    resave: false,
    saveUninitialized: false
}))

app.use('/', contactRoutes)


// app.post('/', (req, res) =>{
//     const { name, email, number, message} = req.body

//     console.log(name)
//     res.redirect('/')
// })
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


