const result = { Labels:
   [ { Name: 'Canine',
       Confidence: 99.93119812011719,
       Instances: [],
       Parents: [Array] },
     { Name: 'Animal',
       Confidence: 99.93119812011719,
       Instances: [],
       Parents: [] },
     { Name: 'Golden Retriever',
       Confidence: 99.93119812011719,
       Instances: [],
       Parents: [Array] },
     { Name: 'Dog',
       Confidence: 99.93119812011719,
       Instances: [Array],
       Parents: [Array] },
     { Name: 'Pet',
       Confidence: 99.93119812011719,
       Instances: [],
       Parents: [Array] } ],
  LabelModelVersion: '2.0' }

const filteredResult = result.Labels.filter(function(item){
  if (item.Name === 'Dog' || item.Name === 'Cat') return item
})

if (filteredResult.length > 0) {
  if (filteredResult[0].Name === 'Dog') console.log ('Dog')
  if (filteredResult[0].Name === 'Cat') return 'Cat'
}

return 'Unknown'
