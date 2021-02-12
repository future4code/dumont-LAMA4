import { Request, Response } from "express"
import { BandsBusiness } from "../business/BandsBusiness"
import { BandsInputDTO } from "../business/entities/Bands"
import { Authenticator } from "../business/services/Authenticator"
import { HashManager } from "../business/services/HashManager"
import { IdGenerator } from "../business/services/IdGenerator"
import { BandsDatabase } from "../data/BandsDataBase"


const bandsBusiness = new BandsBusiness(
   new IdGenerator(),
   new HashManager,
   new Authenticator(),
   new BandsDatabase()
);

export class BandsController {

   async createBands(req: Request, res: Response) {

      try {

         const input: BandsInputDTO = {
            name: req.body.name,
            music_genre: req.body.music_genre,
            responsible: req.body.responsible
         }

         const token = await bandsBusiness.createBands(input);

         res.status(200).send({ token });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }


   public async getBandById(req: Request, res: Response) {

      try {
         
         const { id } = req.params

         const band = await bandsBusiness.getBandById(id)

         res.status(200).send(band)

      } catch (error) {
         res.status(error.statusCode || 400).send(error.message)
      }
   }
}
