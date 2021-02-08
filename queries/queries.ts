export const launchesDataQuery = `
  {
    launchesPast (limit:100) {
      launch_date_local,
      id,
      rocket {
        second_stage {
          payloads {
            payload_mass_kg
          }
        }
      }
    }
  }
`