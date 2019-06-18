const db = require('./connection');

db.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  const name = process.argv.slice(2)[0];
  db.query("SELECT * FROM famous_people where first_name = $1 or last_name = $1;", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    console.log(`Found ${result.rows.length} person(s) by the name '${name}':`);
    result.rows.forEach( (row, index) => {
      console.log(`- ${index + 1}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toLocaleDateString()}'`);
    });
    db.end();
  });
});