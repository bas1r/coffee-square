import { table, getMinifiedRecords } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {

    if (req.method === 'POST') {
        const { id, name, categories, distance, imgUrl, address, geoCode, voting } = req.body;

        try {
            if (id) {
                // find store record
                const findCoffeeStoreRecords = await table.select({ filterByFormula: `{id}="${id}"`, }).firstPage();
                console.log('FIND', { findCoffeeStoreRecords })

                if (findCoffeeStoreRecords.length !== 0) {
                    const records = getMinifiedRecords(findCoffeeStoreRecords);
                    res.json(records);

                } else {
                    // create a record 
                    if (name) {
                        const createRecords = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    categories,
                                    distance,
                                    imgUrl,
                                    address,
                                    geoCode,
                                    voting
                                },
                            },
                        ]);
                        const records = getMinifiedRecords(createRecords);
                        res.json(records);

                    } else {
                        res.status(400)
                        res.json({message: 'Id or Name is missing'})
                    }
                }
            } else {
                    res.status(400)
                    res.json({message: 'Id is missing'}) 
            }

        } catch (err) {
            console.error("Error creating or finding a store", err);
            res.status(500);
            res.json({ message: 'Error creating or finding a store'})
        }
    }
};

export default createCoffeeStore;