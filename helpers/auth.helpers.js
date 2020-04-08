import jwt from 'jsonwebtoken';
import environment from '../public/static/env.json';

export const encode = data => {
    return jwt.sign(data, environment.DECODE_ENCODE_DATA_SECRET_KEY);
}
