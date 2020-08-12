import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import db from './../database/connection';

export default class LoginController {
  async create(request: Request, response: Response) {

    bcrypt.compare(password, hash, function(err, result) {
      console.log('result 1', result)
    });

    bcrypt.compare('ava', hash, function(err, result) {
      console.log('result 2', result)
    });

    return response.json({msg: 'nothing done'})
  }
}