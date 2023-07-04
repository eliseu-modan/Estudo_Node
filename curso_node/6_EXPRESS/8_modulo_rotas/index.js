const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const basePath = path.join(__dirname, 'templates')


// ler o body
app.use(
  express.urlencoded({
    extended: true,
  }),
  )
  
  app.use(express.json())
  
  var checkAuth = function (req, res, next) {
    req.authStatus = true
    
    if (req.authStatus) {
      console.log('Está logado, pode continuar')
      next()
    } else {
      console.log('Não está logado, faça o login para continuar!')
    }
  }
  
  app.use(checkAuth)
  const users = require('./users')
  
  app.use('/users', users)
  
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
