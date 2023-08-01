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

    public createSuperHeroe = async (input: any): Promise<boolean> => {

        const { id, name, universe, imageUrl } = input

        const superHeroesDatabase = new SuperHeroesDatabase()

        Object.entries({ id, name, universe, imageUrl }).forEach((property) => {
            const [key, value] = property

            if (typeof (value) !== "string") {
                throw new Error(`A propriedade '${key}' espera receber uma 'string'.`)
            } else if (value.length === 0) {
                throw new Error(`A propriedade '${key}' não pode ser vazia.`)
            }
        })

        const idExist = await superHeroesDatabase.findSuperHeroeByParameter(id, 'id')

        if (idExist) {
            throw new Error(`O id '${id}' já existe.`)
        }

        const nameExist = await superHeroesDatabase.findSuperHeroeByParameter(name, 'name')

        if (nameExist) {
            throw new Error(`O nome '${name}' já existe.`)
        }

        const imageUrlExist = await superHeroesDatabase.findSuperHeroeByParameter(imageUrl, 'image_url')

        if (imageUrlExist) {
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

        return create
    }

    public editSuperHeroeById = async (input: any, id: string): Promise<boolean> => {

        const superHeroesDatabase = new SuperHeroesDatabase()

        const datas = await superHeroesDatabase.findSuperHeroes()

        const idExist = await superHeroesDatabase.findSuperHeroeByParameter(id, 'id')

        if (!idExist) {
            throw new Error('O id informado não existe.')
        }

        Object.entries({ name: input.name, universe: input.universe, imageUrl: input.imageUrl }).map((property) => {

            const [key, value] = property

            if (typeof (value) !== "undefined") {
                if (typeof (value) !== "string") {
                    throw new Error(`A propriedade '${key}' espera receber uma 'string'.`)
                } else if (value.length === 0) {
                    throw new Error(`A propriedade '${key}' não pode ser vazia.`)
                }

                if (key !== "universe") {


                    const search = datas.find((superHeroe) => {

                        if (key === "name") {
                            return superHeroe.name === input.imageUrl && superHeroe.id !== id
                        }

                        return superHeroe.image_url === input.imageUrl && superHeroe.id !== id
                    })

                    if (search) {
                        throw new Error(`O valor da propriedade '${key}' já existe em outro cadastro.`)
                    }
                }
            }

        })


        const newSuperHeroe = new SuperHeroes(
            id,
            input.name || idExist.name,
            input.universe || idExist.universe,
            input.imageUrl || idExist.image_url,
            idExist.created_at
        )


        const edited = await superHeroesDatabase.editSuperHeroeById(id, {
            name: newSuperHeroe.getName(),
            universe: newSuperHeroe.getUniverse(),
            image_url: newSuperHeroe.getImageUrl()
        })

        return edited
    }

    public deleteSuperHeroeById = async (id: string) => {
        const superHeroesDatabase = new SuperHeroesDatabase()

        const idExist = await superHeroesDatabase.findSuperHeroeByParameter(id, 'id')

        if (!idExist) {
            throw new Error('O id informado não existe.')
        }

        const deleted = await superHeroesDatabase.deleteSuperHeroeById(id)

        return deleted
    }
}