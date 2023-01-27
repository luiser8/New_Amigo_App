import { getRolesClient } from "../clients/rolesClient";

export const getRolesService = async () => {
    let roles = [];
    (Promise.all([
        await getRolesClient().then((values) => {
            if (values !== null) {
                roles = [...roles, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return roles;
}
