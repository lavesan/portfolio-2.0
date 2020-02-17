const initialState = {
    comments: [
        {
            userImgUrl: 'https://cdn.culturagenial.com/imagens/livro-a-viuvinha-54s.jpg',
            name: 'Alberta',
            age: 23,
            comment: 'Eu gostei para um caramba vei',
        },
        {
            userImgUrl: 'https://cdn.culturagenial.com/imagens/livro-a-viuvinha-54s.jpg',
            name: 'Rodrigão',
            age: 23,
            comment: 'Cê loko, bom demais meu parça!',
        },
        {
            userImgUrl: 'https://cdn.culturagenial.com/imagens/livro-a-viuvinha-54s.jpg',
            name: 'Lorem',
            age: 23,
            comment: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, doloremque? Nemo minima, labore, dicta enim vero expedita debitis provident exercitationem fugit ducimus non reprehenderit. A et voluptatem veniam ea vel!',
        },
    ],
};

export const commentReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        comments() {
            return {
                ...state,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};