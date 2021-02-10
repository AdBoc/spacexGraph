export type LaunchesData = {
  date: Date;
  mass: number;
  id: string;
}[]

export type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;

export type LaunchesDataRequest = {
  launchesPast: [{
    launch_date_local: Date,
    id: string,
    rocket: {
      second_stage: {
        payloads: [{
          payload_mass_kg: number
        }]
      }
    }
  }
  ]
}