
   
//    When debugging, set APP_FOLDER as "src" to point typeorm to the source folder, otherwise build to use the build folder
const app = process.env.APP_FOLDER;

module.exports = {
    type: "postgres",
    url: process.env.DATABASE,
    logging: false,
    entities: [`${ app }/entity/**/*.*`],
    migrations: [`${ app }/migration/**/*.*`],
    subscribers: [`$ { app }/subscriber/**/*.*`],
    cli: { entitiesDir:`${ app }/entity`,
    migrationsDir: `${ app }/migration`,
    subscribersDir: `${ app }/subscriber`},
    // ssl: false Enable these key value pairs to use SSL secured database ie. Heroku PG
    // extra: { 
    // ssl: {
    //     rejectUnauthorized: false,
     //   },
    // },
}
                