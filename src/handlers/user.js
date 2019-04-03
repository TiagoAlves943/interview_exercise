import {
    createUser,
    selectUser,
    updateUser
} from '../dbservice/user';


export const createUserHandler = async (givenName, familyName, email) => {
    const newUser = await createUser(givenName, familyName, email);
    return await selectUser({
        id: newUser
    });
};

export const selectUserHandler = async queryParam => await selectUser(queryParam);

export const updateUserHandler = async (givenName, familyName, email, id) => {
    const listUsers = await selectUser({
        id: id
    });
    if (listUsers.length === 0) {
        return [];
    }
    await updateUser(givenName, familyName, email, id);
    return await selectUser({
        id: id
    });
};
