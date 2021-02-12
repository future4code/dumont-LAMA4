import { CustomError } from "../error/CustomError"

export class Shows {

    constructor(
        public readonly id: string,
        public readonly week_day: WeekDay,
        public readonly start_time: number,
        public readonly end_time: number,
        public readonly band_id: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getWeekDay(): WeekDay {
        return this.week_day
    }

    public getBandId(): string {
        return this.band_id
    }

    public getStartTime(): number {
        return this.start_time
    }

    public getEndTime(): number {
        return this.end_time
    }

 

    public static toWeekDayEnum(data?: any): WeekDay {

        switch (data) {
            case "FRIDAY":
                return WeekDay.FRIDAY;
            case "SATURDAY":
                return WeekDay.SATURDAY;
            case "SUNDAY":
                return WeekDay.SUNDAY;
            default:
                throw new CustomError(422, "Invalid weekDay")
        }
    }

    public static toShow(data?: any) {

        return (
            data &&
            new Shows(
                data.id,
                Shows.toWeekDayEnum(data.week_day),
                data.start_time,
                data.end_time,
                data.band_id
            )
        )
    }
}

export enum WeekDay {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

export interface ShowInputDTO {
    week_day: string;
    start_time: number;
    end_time: number;
    band_id: string;
}

export interface ShowOutputDTO {
    id: string
    week_day: string;
    start_time: number;
    end_time: number;
    band_id: string;
}

