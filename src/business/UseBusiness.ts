import { SuperHeroesDatabase } from "../database/SuperHeroesDatabase"
import { SuperHeroes } from "../models/SuperHeroes"
import { superHeroesDB } from "../types/types"

export class UserBusiness {

    public findSuperHeroes = async (): Promise<SuperHeroes[]> => {

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

        return superHeroes
    }
}