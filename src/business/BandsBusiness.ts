import { UserDatabase } from "../data/UserDatabase"
import { IdGenerator } from "./services/IdGenerator"
import { HashManager } from "./services/HashManager"
import { Authenticator } from "./services/Authenticator"
import { CustomError } from "./error/CustomError"
import { BandsDatabase } from "../data/BandsDataBase"
import { BandsInputDTO } from "./entities/Bands"

export class BandsBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private bandsDatabase: BandsDatabase,
    ) { }

    async createBands(band: BandsInputDTO) {

        const id = this.idGenerator.generate();

        await this.bandsDatabase.createBands(
            id,
            band.name,
            band.music_genre,
            band.responsible
        );

        const accessToken = this.authenticator.generateToken({
            id
        });

        return accessToken;
    }

    public async getBandById(id: string) {

        const bandResult = await this.bandsDatabase.getBandById(id)

        if (!bandResult) {
            throw new CustomError(404, "Band not found")
        }

        const band = {
            id: bandResult.id,
            name: bandResult.name,
            music_genre: bandResult.music_genre,
            responsible: bandResult.responsible
        }

        const result = (band)

        return result
    }
}