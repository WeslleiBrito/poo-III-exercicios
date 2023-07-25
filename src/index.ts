import express from 'express'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log("API rodando na porta 3003!")
})