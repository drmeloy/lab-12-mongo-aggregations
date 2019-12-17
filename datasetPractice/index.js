const mongoose = require('mongoose');
const csv = require('csvtojson');

mongoose.connect('mongodb://localhost:27017/tunisia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const schema = new mongoose.Schema({
  year: Number,
  importExport: String,
  oilRefining: Number,
  oilAndNaturalGas: Number
})

const Tunisia = mongoose.model('Tunisia', schema);

return csv({ delimiter: ',' })
  .fromFile(`./Tunisia_importexport.csv`)
  .then(jsonfile => {
    const tuni = jsonfile
    .map(item => ({
      year: item.Calendar,
      importExport: item['import/export'],
      oilRefining: item['Oil refining'],
      oilAndNaturalGas: item['Oil and natural gas']
    }))

    return Tunisia.create(tuni);
  })
  .then(() => console.log('done'));