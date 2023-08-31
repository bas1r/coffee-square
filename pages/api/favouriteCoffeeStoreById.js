import { table, findRecordByFilter, getMinifiedRecords } from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {

    if (req.method === "PUT") {
        const {id} = req.body;

        try {
            if (id) {
                const records = await findRecordByFilter(id)

                if (records.length !== 0) {
                    const record = records[0];
                    const calculateVoting = parseInt(record.voting) + 1;

                    console.log({ calculateVoting})

                    const updateRecord = await table.update([
                        {
                            id: record.recordId,
                            fields: {
                                voting: calculateVoting,
                            },
                        },
                    ]);

                    if (updateRecord) {
                        const minifiedRecords = getMinifiedRecords(updateRecord);
                        res.json(minifiedRecords);
                    }
                } else {
                    res.json({ message: `Coffee Store id does not exist ${id}` })
                }
            } else {
                res.json({ message: "Id is missing"})
            }
        } catch (error) {
            console.log("Something Went Wrong: ", error)
            res.status(500)
            res.json({ message: "Error upvoting coffee store", error })
        }

    }
}

export default favouriteCoffeeStoreById;