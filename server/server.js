const express = require('express')
const path = require('path')

const PORT =process.env.PORT || 8000
const app = express()

const publicPath = path.join(__dirname ,'../public')
app.use(express.static(publicPath))



console.log(publicPath)

app.listen(PORT, () => {
    console.log('Server is Up at Port : ',PORT)
})