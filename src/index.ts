import express, { Request, Response } from 'express'
import cors from 'cors'
import { SuperHeroesController } from './controller/SuperHeroesController'


const app = express()

app.use(cors())
app.use(express.json())

app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send('pong')
})

app.listen(3003, () => {
    console.log("API rodando na porta 3003!")
})

const superHeroes = new SuperHeroesController()

app.get('/super-heroes', superHeroes.findSuperHeroes)
app.post('/super-heroes', superHeroes.createSuperHeroe)
app.put('/super-heroes/:id', superHeroes.editSuperHeroeById)
app.delete('/super-heroes/:id', superHeroes.deleteSuperHeroeById)