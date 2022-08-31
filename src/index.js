const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const publcicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publcicDirectoryPath))

app.get('',(req,res)=>{
    res.render({
        title:"Chat app"
    })
})
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})