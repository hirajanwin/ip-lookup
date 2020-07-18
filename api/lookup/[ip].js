const maxmind = require('maxmind');
const geolite2 = require('geolite2-redist');

export default async (req, res) => {
  const {
    query: { ip },
  } = req;

  const lookup = await geolite2.open('GeoLite2-City', path => {
    return maxmind.open(path);
  });

  const result = lookup.get(ip);

  lookup.close();

  res.status(200).json(result);
};