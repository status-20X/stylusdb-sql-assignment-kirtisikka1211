const parseQuery = require('./queryParser');
const readCSV = require('./csvReader');

async function executeSELECTQuery(query) {
    try {
        const { fields, table, whereClause } = parseQuery(query);

     
        const filePath = `${table}.csv`;
        const data = await readCSV(filePath);

        let filteredData = data;

        if (whereClause) {
            const [field, value] = whereClause.split('=').map(item => item.trim());
            filteredData = data.filter(row => row[field] === value);
        }

        if (fields.includes('*')) {
            return filteredData;
        } else {
            return filteredData.map(row => {
                const filteredRow = {};
                fields.forEach(field => {
                    filteredRow[field] = row[field];
                });
                return filteredRow;
            });
        }
    } catch (error) {
        throw error;
    }
}


module.exports = executeSELECTQuery;
