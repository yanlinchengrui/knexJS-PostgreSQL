const db = require('./connection_knex');

const name = process.argv.slice(2)[0];

db.select('*').from('famous_people')
  .where('first_name', '=', name)
  .orWhere('last_name', '=', name)
  .asCallback((err, rows) => {
    if(err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    console.log(`Found ${rows.length} person(s) by the name '${name}':`);
    rows.forEach( (row, index) => {
      console.log(`- ${index + 1}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toLocaleDateString()}'`);
    });
    db.destroy();
  });