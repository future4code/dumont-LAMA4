import { ShowsDatabase } from "../data/ShowsDataBase"
import { ShowInputDTO, Shows } from "../business/entities/Shows"
import { UserRole } from "./entities/User"
import { CustomError } from "./error/CustomError"
import { Authenticator } from "./services/Authenticator"
import { IdGenerator } from "./services/IdGenerator"
import { BandsDatabase } from "../data/BandsDataBase"

export class ShowsBusiness {

    constructor(
        private showDatabase: ShowsDatabase,
        private bandDatabase: BandsDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createShow(input: ShowInputDTO, token: string) {

        const tokenData = this.authenticator.getData(token)

        if (tokenData.role !== UserRole.ADMIN) {
            throw new CustomError(401, "Only admins can access this feature")
        }

        if (!input.week_day || !input.start_time || !input.end_time) {
            throw new CustomError(401, "Invalid input to createShow")
        }

        if (input.start_time < 8 || input.end_time > 23 || input.start_time >= input.end_time) {
            throw new CustomError(401, "Invalid times to createShow");
        }

        if (!Number.isInteger(input.start_time) || !Number.isInteger(input.end_time)) {
            throw new CustomError(401, "Times should be integer to createShow")
        }

        const band = await this.bandDatabase.getBandById(input.band_id)

        if(!band) {
            throw new CustomError(404, "Band not found")
        }

        const registeredShows = await this.showDatabase.getShowByTimes(input.week_day, input.start_time, input.end_time)
        
        if(registeredShows.length) {
            throw new CustomError(401, "No more shows can created at this times")
        }

        await this.showDatabase.createShow(
            Shows.toShow({
                ...input, 
                id: this.idGenerator.generate()
            }))
    }

}