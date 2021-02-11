import { BaseDatabase } from "../data/BaseDatabase"


class Setup extends BaseDatabase {

    public async createTables() {
    
        try {

            await BaseDatabase.connection.raw(`
                CREATE TABLE  NOME_TABELA_BANDAS (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) UNIQUE NOT NULL,
                    music_genre VARCHAR(255) NOT NULL,
                    responsible VARCHAR(255) UNIQUE NOT NULL 
                )
            `)

            await BaseDatabase.connection.raw(`
                CREATE TABLE NOME_TABELA_SHOWS (
                    id VARCHAR(255) PRIMARY KEY,
                    week_day VARCHAR(255) NOT NULL,
                    start_time INT NOT NULL,
                    end_time INT NOT NULL,
                    band_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
                )
            `)

            await BaseDatabase.connection.raw(`
                CREATE TABLE  NOME_TABELAS_USUÁRIOS (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
                )
            `)

            console.log("MySql setup completed!")

        } catch (error) {

            console.log(error)
        }
    }
}
new Setup().createTables()