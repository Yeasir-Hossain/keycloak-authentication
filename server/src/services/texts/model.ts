/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from "mongoose";

const schema = new Schema(
	{
		text: { type: String, required: true },
		wordCount: { type: Number },
		characterCount: { type: Number },
		sentenceCount: { type: Number },
		paragraphCount: { type: Number },
		longestWords: { type: [String] },
	},

	{ timestamps: true }
);

function getLongestWords(text: string): string[] {
	const words = text.split(/\s+/).filter(Boolean);
	const maxLength = Math.max(...words.map(word => word.length));
	const longestWordsSet = new Set(words.filter(word => word.length === maxLength));
	return Array.from(longestWordsSet);
}

// Middleware to calculate fields on save
schema.pre("save", function () {
	const content = this.text || "";
	this.wordCount = content.split(/\s+/).filter(Boolean).length;
	this.characterCount = content.replace(/\s+/g, "").length;
	this.sentenceCount = (content.match(/[.!?]/g) || []).length;
	this.paragraphCount = content.split(/\n+/).filter(Boolean).length;
	this.longestWords = getLongestWords(content);
});

// Middleware to calculate fields on update
schema.pre("findOneAndUpdate", async function (next) {
	const update = this.getUpdate();
	if (update && typeof update === "object" && "text" in update) {
		const content = update.text as string;
		(update as any).wordCount = content.split(/\s+/).filter(Boolean).length;
		(update as any).characterCount = content.replace(/\s+/g, "").length;
		(update as any).sentenceCount = (content.match(/[.!?]/g) || []).length;
		(update as any).paragraphCount = content.split(/\n+/).filter(Boolean).length;
		(update as any).longestWords = getLongestWords(content);
	}
	next();
});

schema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.__v;
	delete obj.updatedAt;
	delete obj.createdAt;
	return JSON.parse(JSON.stringify(obj).replace(/_id/g, "id"));
};

export default model("Text", schema);
