const fs = require('fs');
const europe = new Set(['Albania','Andorra','Austria','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Finland','France','Germany','Greece','Hungary','Iceland','Ireland','Italy','Kosovo','Latvia','Liechtenstein','Lithuania','Luxembourg','Malta','Moldova','Monaco','Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal','Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Ukraine','United Kingdom','Vatican']);
const data = JSON.parse(fs.readFileSync('states-provinces.geojson','utf8'));
data.features = data.features.filter(f => europe.has(f.properties && f.properties.admin)).map(f => {
  if (!f.geometry) return f;
  const round = coords => coords.map(c => Array.isArray(c[0]) ? round(c) : [Math.round(c[0]*10)/10, Math.round(c[1]*10)/10]);
  f.geometry.coordinates = round(f.geometry.coordinates);
  return f;
});
fs.writeFileSync('states-provinces.geojson', JSON.stringify(data));
console.log('Done:', Math.round(fs.statSync('states-provinces.geojson').size/1024), 'KB');
