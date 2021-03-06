import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema({
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    levels: {type: Number, required: true},
    imgUrl: {type: String, default: ""},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String, default: "No description provided, seems legit"},
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account'}
}, {timestamps: true, toJSON: {virtuals: true}})

HouseSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})