import traverse from "traverse";
import { ObjectID } from "mongodb";


const isObjectID = (value) => {
	const objId = new ObjectID(value);

	return (objId.toString() === value) ? objId : null;
};

const toObjectIDs = (json) => {
	traverse(json).forEach(function (item) {
		if (!this.isLeaf) {
			return;
		}

		//
		// Convert the object into a full ObjectID if it is
		//
		const objId = isObjectID(item);

		if (objId) {
			// NOTE: Do not traverse the new value anymore
			this.update(objId, true);
		}
	});
};

const DbUtils = {
	findOrCreate : (modelObj, findCriteria, recordToCreate, populate = true) =>
		new Promise((resolve, reject) => {
			try {
				modelObj.findOrCreate(findCriteria, recordToCreate)
				.exec(async (err, record, createdOrFound) => {
					if (err) {
						return reject(err);
					}

					if (populate) {
						record = await modelObj.findOne({ id : record.id }).populateAll();
					}

					resolve({ record, new: createdOrFound });
				});
			} catch (e) {
				reject(e);
			}
		}),

	nativeUpdate : async (model, findCriteria, recordToUpdate, upsert = false) =>
		new Promise(async (resolve, reject) => {
			try {
				toObjectIDs(findCriteria);
				toObjectIDs(recordToUpdate);

				const collection = model.getDatastore().manager.collection(model.tableName);
				const options = {
					multi : true,
					upsert,
				};

				collection.update(findCriteria, recordToUpdate, options, (err, result) => {
					if (err) {

						return reject(err);
					}

					return resolve(result);
				});
			} catch (e) {
				reject(e);
			}
		}),

	isObjectID,
	toObjectIDs,
};

export default DbUtils;
