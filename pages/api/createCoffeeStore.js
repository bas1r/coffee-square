const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores');

console.log({table})

const createCoffeeStore = (req, res) => {
    return res.json({message: table.name})
};

export default createCoffeeStore;