
export class SuperHeroes {

    constructor(
        private id: string,
        private name: string,
        private universe: string,
        private imageUrl: string,
        private createAt: string,
    ) { }

    public getId = (): string => {
        return this.id
    }
    public getName = (): string => {
        return this.name
    }
    public getUniverse = (): string => {
        return this.universe
    }
    public getImageUrl = (): string => {
        return this.imageUrl
    }
    public getCreateAt = (): string => {
        return this.createAt
    }

    public setName = (newName: string): void => {
        this.name = newName
    }

    public setUniverse = (newUniverse: string): void => {
        this.universe = newUniverse
    }

    public setImageUrl = (newImageUrl: string): void => {
        this.imageUrl = newImageUrl
    }
}