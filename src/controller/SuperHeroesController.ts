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
                    superHeroe.create_at
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
}