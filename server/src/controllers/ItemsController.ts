import { Request, Response } from 'express';
import knex from './../database/connection';
// import path from 'path';  path.resolve(__dirname, '..', 'uploads', image)

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*');
    
        const serializedItems = items.map( ({id, title, image}) => {
            return {
                id: id,
                title: title,
                image_url: `http://192.168.0.130:3333/uploads/${image}`,
            };
        })
        return response.json(serializedItems)
    }
}

export default ItemsController;
