import { superHeroesDB } from "../types/types";
import { DatabaseConnect } from "./DatabaseConnect";


export class SuperHeroesDatabase extends DatabaseConnect {

    public static TABLE_SUPER_HEROES = "super_heroes"

    public findSuperHeroes = async () => {
        const superHeroesDB: superHeroesDB[] = await DatabaseConnect
            .connection(SuperHeroesDatabase.TABLE_SUPER_HEROES)

        return superHeroesDB
    }

}