const initialState = {
    comments: [
        {
            user: {
                imgUrl: 'https://cdn.culturagenial.com/imagens/livro-a-viuvinha-54s.jpg',
                name: 'Alberta',
                age: 23,
            },
            briefComment: 'Eu gostei para um caramba vei',
        },
        {
            user: {
                imgUrl: 'https://cdn.culturagenial.com/imagens/livro-a-viuvinha-54s.jpg',
                name: 'Alejandro',
                age: 31,
            },
            briefComment: 'Cê loko, bom demais meu parça!',
        },
        {
            user: {
                imgUrl: 'https://cdn.culturagenial.com/imagens/livro-a-viuvinha-54s.jpg',
                name: 'Rodrigão',
                age: 19,
            },
            briefComment: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur, doloremque? Nemo minima, labore, dicta enim vero expedita debitis provident exercitationem fugit ducimus non reprehenderit. A et voluptatem veniam ea vel!',
        },
    ],
};

export const commentReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {
        SET_COMMENTS() {
            return {
                ...state,
                comments: action.comments,
            }
        },
    }

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};