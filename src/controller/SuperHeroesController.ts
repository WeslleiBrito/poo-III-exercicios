import { Request, Response } from "express";
import { SuperHeroesDatabase } from "../database/SuperHeroesDatabase";
import { superHeroesDB } from "../types/types";
import { SuperHeroes } from "../models/SuperHeroes";


export class SuperHeroesController {

    public findSuperHeroes = async (req: Request, res: Response) => {

        try {

            const superHeroesDatabase = new SuperHeroesDatabase()
            const superHeroesDB: superHeroesDB[] = await superHeroesDatabase.findSuperHeroes()

            const superHeroes = superHeroesDB.map((superHeroe) => {

                return new SuperHeroes(
                    superHeroe.id,
                    superHeroe.name,
                    superHeroe.universe,
                    superHeroe.image_url,
                    superHeroe.created_at
                )
            })

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

            const { id, name, universe, imageUrl } = req.body

            const superHeroesDatabase = new SuperHeroesDatabase()

            Object.entries({ id, name, universe, imageUrl }).forEach((property) => {
                const [key, value] = property

                if (typeof (value) !== "string") {
                    res.status(422)
                    throw new Error(`A propriedade '${key}' espera receber uma 'string'.`)
                } else if (value.length === 0) {
                    res.status(422)
                    throw new Error(`A propriedade '${key}' não pode ser vazia.`)
                }
            })

            const idExist = await superHeroesDatabase.findSuperHeroeByParameter(id, 'id')

            if (idExist) {
                res.status(409)
                throw new Error(`O id '${id}' já existe.`)
            }

            const nameExist = await superHeroesDatabase.findSuperHeroeByParameter(name, 'name')

            if (nameExist) {
                res.status(409)
                throw new Error(`O nome '${name}' já existe.`)
            }

            const imageUrlExist = await superHeroesDatabase.findSuperHeroeByParameter(imageUrl, 'image_url')

            if (imageUrlExist) {
                res.status(409)
                throw new Error(`A imagem já é usada em outro personagem.`)
            }

            const superHeroe = new SuperHeroes(
                id,
                name,
                universe,
                imageUrl,
                new Date().toISOString()
            )

            const create = await superHeroesDatabase.createSuperHeroe({
                id: superHeroe.getId(),
                name: superHeroe.getName(),
                universe: superHeroe.getUniverse(),
                image_url: superHeroe.getImageUrl(),
                created_at: superHeroe.getCreateAt()
            })

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
}