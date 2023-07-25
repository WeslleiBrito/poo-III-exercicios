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

    public editSuperHeroeById = async (req: Request, res: Response) => {

        try {

            const id = req.params.id
            const { name, universe, imageUrl } = req.body
            const superHeroesDatabase = new SuperHeroesDatabase()

            const datas = await superHeroesDatabase.findSuperHeroes()

            const idExist = await superHeroesDatabase.findSuperHeroeByParameter(id, 'id')
            if (!idExist) {
                res.status(400)
                throw new Error('O id informado não existe.')
            }

            Object.entries({ name, universe, imageUrl }).map((property) => {

                const [key, value] = property

                if (typeof (value) !== "undefined") {
                    if (typeof (value) !== "string") {
                        res.status(422)
                        throw new Error(`A propriedade '${key}' espera receber uma 'string'.`)
                    } else if (value.length === 0) {
                        res.status(422)
                        throw new Error(`A propriedade '${key}' não pode ser vazia.`)
                    }

                    if (key !== "universe") {


                        const search = datas.find((superHeroe) => {

                            if (key === "name") {
                                return superHeroe.name === name && superHeroe.id !== id
                            }

                            return superHeroe.image_url === imageUrl && superHeroe.id !== id
                        })

                        if (search) {
                            res.status(409)
                            throw new Error(`O valor da propriedade '${key}' já existe em outro cadastro.`)
                        }
                    }
                }

            })


            const newSuperHeroe = new SuperHeroes(
                id,
                name ? name : idExist.name,
                universe ? universe : idExist.universe,
                imageUrl ? imageUrl : idExist.image_url,
                idExist.created_at
            )


            const edited = await superHeroesDatabase.editSuperHeroeById(id, {
                name: newSuperHeroe.getName(),
                universe: newSuperHeroe.getUniverse(),
                image_url: newSuperHeroe.getImageUrl()
            })

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
            const superHeroesDatabase = new SuperHeroesDatabase()

            const idExist = await superHeroesDatabase.findSuperHeroeByParameter(id, 'id')

            if (!idExist) {
                res.status(400)
                throw new Error('O id informado não existe.')
            }

            const deleted = await superHeroesDatabase.deleteSuperHeroeById(id)

            if(deleted){
                res.status(200).json("Super-heroe deletado com sucesso!")
            }else{
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