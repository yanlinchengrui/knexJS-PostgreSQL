const db = require('./connection_knex');
const [first_name, last_name, birthdate] = process.argv.slice(2);

db('famous_people').insert({ first_name, last_name, birthdate })
                   .asCallback((err) => {
                    if(err) {
                      return console.error("error running query", err);
                    }
                    console.log('Added new person!');
                    db.destroy();
                   });