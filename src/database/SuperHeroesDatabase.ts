import { superHeroesDB } from "../types/types";
import { DatabaseConnect } from "./DatabaseConnect";


export class SuperHeroesDatabase extends DatabaseConnect {

    public static TABLE_SUPER_HEROES = "super_heroes"

    public findSuperHeroes = async () => {
        const superHeroesDB: superHeroesDB[] = await DatabaseConnect
            .connection(SuperHeroesDatabase.TABLE_SUPER_HEROES)

        return superHeroesDB
    }

    public findSuperHeroeByParameter = async (search: string, column: string): Promise<superHeroesDB | undefined> => {

        const [result]: superHeroesDB[] | undefined = await DatabaseConnect
            .connection(SuperHeroesDatabase.TABLE_SUPER_HEROES).where(`${column}`, `${search}`)

        return result
    }

    public createSuperHeroe = async (superHeroe: superHeroesDB): Promise<boolean> => {

        const created = await DatabaseConnect
            .connection(SuperHeroesDatabase.TABLE_SUPER_HEROES).returning('id').insert(superHeroe)

        if (created) {
            return true
        }

        return false
    }

    public editSuperHeroeById = async (id: string, values: { name: string, universe: string, image_url: string }): Promise<boolean> => {

        const edited = await DatabaseConnect
            .connection(SuperHeroesDatabase.TABLE_SUPER_HEROES).returning("id").update(values).where({ id: id })

        if (edited) {
            return true
        }

        return false
    }

    public deleteSuperHeroeById = async (id: string): Promise<number> => {
        
        const deleted = await DatabaseConnect.connection(SuperHeroesDatabase.TABLE_SUPER_HEROES).del().where({id: id})
        
        return deleted
    }

}