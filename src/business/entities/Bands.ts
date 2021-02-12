export class Bands {
    constructor(
       public readonly id: string,
       public readonly name: string,
       public readonly music_genre: string,
       public readonly responsible: string
    ) { }

}

export interface BandsInputDTO {
    name: string;
    music_genre: string;
    responsible: string
}
 