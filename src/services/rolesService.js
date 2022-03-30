import { get } from '../helpers/Fetch';

export const getRoles = async () => {
    return await get(`roles/get`);
} 