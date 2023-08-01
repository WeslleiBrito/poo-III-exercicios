import { Request, Response } from "express";
import { UserBusiness } from "../business/UseBusiness";


export class SuperHeroesController {


    public findSuperHeroes = async (req: Request, res: Response) => {

        try {

            const userBusness = new UserBusiness()
            const superHeroes = await userBusness.findSuperHeroes()

            res.status(200).json(superHeroes)

        } catch (error) {
            console.log(error)

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createSuperHeroe = async (req: Request, res: Response) => {

        try {

            const input: any = {
                id: req.body.id,
                name: req.body.name,
                universe: req.body.universe,
                imageUrl: req.body.imageUrl
            }

            const userBusness = new UserBusiness()
            const create = await userBusness.createSuperHeroe(input)

            if (create) {
                res.status(201).json('Cadastro realizado com sucesso!')
            } else {
                res.status(500).json('Houve algum problema em nosso servidor, o cadastro NÃO foi concluido.')
            }


        } catch (error) {

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editSuperHeroeById = async (req: Request, res: Response) => {

        try {

            const id = req.params.id

            const input: any = {
                name: req.body.name,
                universe: req.body.universe,
                imageUrl: req.body.imageUrl
            }

            const userBusness = new UserBusiness()
            const edited = await userBusness.editSuperHeroeById(input, id)

            if (edited) {
                res.status(201).json("Atualização concluída com sucesso!")
            } else {
                res.status(500)
                throw new Error('Tivemos um problema para fazer a atualiação.')
            }



        } catch (error) {

            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteSuperHeroeById = async (req: Request, res: Response) => {

        try {
            const id = req.params.id
            const userBusness = new UserBusiness()
            const deleted = await userBusness.deleteSuperHeroeById(id)

            if (deleted) {
                res.status(200).json("Super-heroe deletado com sucesso!")
            } else {
                res.status(500)
                throw new Error('Tivemos um problema em nosso servidor, não conseguimos concluir sua solicitação!')
            }

        } catch (error) {
            if (req.statusCode === 200) {
                res.status(500)
            }

            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}