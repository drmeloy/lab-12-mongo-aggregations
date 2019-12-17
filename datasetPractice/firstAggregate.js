[
  {
    '$group': {
      '_id': {
        'type': '$importExport', 
        'year': '$year'
      }, 
      'oilRefiningTotal': {
        '$sum': '$oilRefining'
      }, 
      'oilAndNaturalGasTotal': {
        '$sum': '$oilAndNaturalGas'
      }
    }
  }, {
    '$group': {
      '_id': '$_id.year', 
      'importExport': {
        '$push': {
          'type': '$_id.type', 
          'oilRefiningTotal': '$oilRefiningTotal', 
          'oilAndNaturalGasTotal': '$oilAndNaturalGasTotal'
        }
      }
    }
  }
]