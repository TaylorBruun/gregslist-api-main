import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";



export class HousesController extends BaseController {
constructor(){
    super('api/houses')
    this.router
    .get('', this.getHouses)
    .get('/:id', this.getByID)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .put('/:id', this.update)
    .delete('/:id', this.delete)
}
async getByID(req, res, next) {
    try {
        const house = await housesService.getHouseById(req.params.id)
        return res.send(house)
    } catch (error) {
        next(error)
    }
}
async getHouses(req, res, next) {
    try {
        const houses = await housesService.getHouses(req.query)
        return res.send(houses)
    } catch (error) {
        next(error)
    }
}
async create(req, res, next) {
    try {
        req.body.creatorId = req.userInfo.id
        const house = await housesService.create(req.body)
        return res.send(house)
    } catch (error) {
        next(error)
    }
}
async update(req, res, next) {
    try {
        req.body.id = req.params.id
        req.body.creatorId = req.userInfo.id
        const updatedHouse = await housesService.update(req.body)
        return res.send(updatedHouse)
    } catch (error) {
     next(error)   
    }
}
async delete(req, res, next) {
    try {
        await housesService.delete(req.params.id, req.userInfo.id)
        return res.send('deleted')
    } catch (error) {
        next(error)
    }
}



}