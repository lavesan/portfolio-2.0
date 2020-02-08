import cartType from './cartActionTypes';

export const addProduct = product => ({
    type: cartType.addProduct,
    product,
});

export const removeProduct = id => ({
    type: cartType.removeProduct,
    id,
});

// Se eu for alterar o store dentro do próprio redux:
// export const getUsers = () => async dispatch => {
//     const users = await axios.get("/users");
//     return dispatch({ type: actions.GET_USERS, users: users.data });
//   };
