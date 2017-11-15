import traverse from "traverse";
import { ObjectID } from "mongodb";
import propPath from "property-path";
import _ from "lodash";

const isObjectID = (value) => {
	try {
		const objId = new ObjectID(value);

		return (objId.toString() === value) ? objId : null;
	} catch (e) {
		return null;
	}
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

		//
		// Use the native id format
		//
		if (this.key === "id") {
			this.parent["_id"] = item;
			this.delete();
		}
	});

	return json;
};

const substitute = (obj, substitutions) => {
	_.forEach(substitutions, (value, key) => {
		if (propPath.get(obj, key) !== undefined) {
			propPath.set(obj, key, value);
		}
	});

	return obj;
};

const DbUtils = {
	findOrCreate : (model, findCriteria, recordToCreate, substitutions) =>
		new Promise(async (resolve, reject) => {
			try {
				sails.log.debug("DbUtils::findOrCreate");
				const origFind = _.extend({}, findCriteria);

				sails.log.debug(JSON.stringify(origFind));
				substitute(origFind, substitutions);

				substitute(toObjectIDs(findCriteria), substitutions);
				substitute(toObjectIDs(recordToCreate), substitutions);

				const collection = model.getDatastore().manager.collection(model.tableName);

				const obj = await collection.findOneAndUpdate(findCriteria, {
					$setOnInsert: recordToCreate,
				}, {
					returnOriginal: false,
					upsert : true,
				});

				//
				// Use the standard "id" format
				//
				obj.value.id = obj.value._id;
				delete obj.value._id;

				sails.log.debug("DbUtils::findOrCreate::Done");
				sails.log.debug({ record: obj.value, new: obj.lastErrorObject.upserted });
				resolve({ record: obj.value, new: obj.lastErrorObject.upserted });
			} catch (e) {
				reject(e);
			}
		}),

	nativeUpdate : async (model, findCriteria, recordToUpdate, substitutions = {}, upsert = false) =>
		new Promise(async (resolve, reject) => {
			try {
				substitute(toObjectIDs(findCriteria), substitutions);
				substitute(toObjectIDs(recordToUpdate), substitutions);

				const collection = model.getDatastore().manager.collection(model.tableName);
				const options = {
					multi : true,
					upsert,
				};

				let result = await collection.update(findCriteria, recordToUpdate, options);

				if (!result.result.ok) {
					return reject(result.result);
				}

				result = await collection.findOne(findCriteria);

				if (!result) {
					resolve();
				}

				//
				// Use the standard "id" format
				//
				result.id = result._id;
				delete result._id;

				resolve(result);
			} catch (e) {
				reject(e);
			}
		}),

	isObjectID,
	toObjectIDs,
};

export default DbUtils;
