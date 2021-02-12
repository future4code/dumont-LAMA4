import { BaseDatabase } from "./BaseDatabase";
import { Bands } from "../business/entities/Bands"
import { CustomError } from "../business/error/CustomError";

export class BandsDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_BANDAS";

    private static toBandsModel(band: any): Bands {
        return new Bands(
            band.id,
            band.name,
            band.music_genre,
            band.responsible
        );
    }

    public async createBands(
        id: string,
        name: string,
        music_genre: string,
        responsible: string
    ): Promise<void> {
        try {
            await BaseDatabase.connection
                .insert({
                    id,
                    name,
                    music_genre,
                    responsible
                })
                .into(BandsDatabase.TABLE_NAME);
                
        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred");
        }
    }

    public async getBandById(id: string): Promise<any> {

        try {

            const result = await BandsDatabase.connection
                .select("*")
                .from(BandsDatabase.TABLE_NAME)
                .where({ id })

            return result[0]

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred");
        }
    }
}