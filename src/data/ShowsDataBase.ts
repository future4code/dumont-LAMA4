import { Shows, ShowOutputDTO, WeekDay } from "../business/entities/Shows"
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "../data/BaseDatabase";

export class ShowsDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_SHOWS"

    public async createShow(show: Shows): Promise<void> {

        try {

            await BaseDatabase.connection
                .insert({
                    id: show.getId(),
                    week_day: show.getWeekDay(),
                    start_time: show.getStartTime(),
                    end_time: show.getEndTime(),
                    band_id: show.getBandId()
                })
                .into(ShowsDatabase.TABLE_NAME)

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "An unexpected error ocurred")

        }
    }


    public async getShowByTimes(
        week_day: WeekDay,
        start_time: number,
        end_time: number
    ): Promise<ShowOutputDTO[]> {

        try {

            const shows = await BaseDatabase.getShowById()
                .select("*")
                .where("end_time", ">", `${start_time}`)
                .andWhere("start_time", "<", `${end_time}`)
                .from(ShowsDatabase.TABLE_NAME)


            return shows.map((show: any) => {
                return {
                    id: show.id,
                    week_day: show.week_day,
                    start_time: show.start_time,
                    end_time: show.end_time,
                    band_id: show.band_id,

                }
            })

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "An unexpected error ocurred")

        }
    }

}
