import { Schema, model } from "mongoose";

const schema = new Schema(
	{
		text: { type: String, required: true },
	},
	{ timestamps: true }
);

schema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.__v;
	delete obj.updatedAt;
	delete obj.createdAt;
	return JSON.parse(JSON.stringify(obj).replace(/_id/g, "id"));
};

export default model("Text", schema);
