import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { Logger } from "sass"

import { dbContext } from "../db/DbContext"
import { logger } from "../utils/Logger"



class HousesService{


    async update(body) {
        let foundHouse = await this.getHouseById(body.id)
        if (foundHouse.creatorId.toString() != body.creatorId){
            throw new Forbidden("This is not your house to edit")
        } 

        //  NOTE This mysteriously does NOT work with nullish coalescing operator (needs || instead). It throws a controller error with nullish coalescing. Must. Find. Out. Why. 
        // foundHouse.bedrooms = body.bedrooms ?? foundHouse.bedrooms
        // foundHouse.bathrooms = body.bathrooms ?? foundHouse.bathrooms
        // foundHouse.levels = body.levels ?? foundHouse.levels
        // foundHouse.imgUrl = body.imgUrl ?? foundHouse.imgUrl
        // foundHouse.year = body.year ?? foundHouse.year
        // foundHouse.price = body.price ?? foundHouse.price
        // foundHouse.description = body.description ?? foundHouse.description

        // logger.log(foundHouse.bedrooms, "foundHouse before");
        // logger.log(body.bedrooms, 'body before');
        foundHouse.bedrooms = body.bedrooms || foundHouse.bedrooms
        // logger.log(foundHouse.bedrooms, 'foundhouse after');
        // logger.log(body.bedrooms, 'body after');
        foundHouse.bathrooms = body.bathrooms || foundHouse.bathrooms
        foundHouse.levels = body.levels || foundHouse.levels
        foundHouse.imgUrl = body.imgUrl || foundHouse.imgUrl
        foundHouse.year = body.year || foundHouse.year
        foundHouse.price = body.price || foundHouse.price
        foundHouse.description = body.description || foundHouse.description


        await foundHouse.save()

        return foundHouse
        
    }
    
    async create(body) {
        const house = await dbContext.Houses.create(body)
        return house
    }
    async getHouseById(id) {
        const house = await dbContext.Houses.findById(id).populate('creator', 'name picture')
    if (!house){
        throw new BadRequest("invalid Car Id Yo!")
    }
    return house
    }
    async getHouses(query = {}) {
        return await dbContext.Houses.find(query).populate('creator', 'name picture')
    }


    async delete(id, userId) {
        const delCandidate = await this.getHouseById(id)
        if (delCandidate.creatorId.toString() != userId){
            throw new Forbidden('this is not your house to delete')
        }
        await delCandidate.remove()
    }

}



export const housesService = new HousesService