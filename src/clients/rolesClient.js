import { get } from '../helpers/Fetch';

export const getRolesClient = async () => {
    return await get(`roles/get`);
}
