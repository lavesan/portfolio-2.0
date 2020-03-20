import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { ComboService } from '../../services/combo.service';
import { CommentService } from '../../services/comment.service';
import { FilesService } from '../../services/files.service';
import { GetnetService } from '../../services/getnet.service';
import { ProductService } from '../../services/product.service';
import { PromotionService } from '../../services/promotion.service';

const initialState = {
    authService: new AuthService(),
    categoryService: new CategoryService(),
    comboService: new ComboService(),
    commentService: new CommentService(),
    filesService: new FilesService(),
    getnetService: new GetnetService(),
    productService: new ProductService(),
    promotionService: new PromotionService(),
};

export const servicesReducer = (state = initialState, action) => {
    // Este 'state' é o state total passado
    // O 'action' é o valor alterado
    const handleReducer = {}

    return handleReducer[action.type] ?
        handleReducer[action.type]() :
        state;
};