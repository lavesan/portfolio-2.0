import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import { StyledProductsRow } from './products-row.styles';
import { ProductCardComponent } from '../../../components/product-card';
import { HorizontalSlideComponent } from '../../../components/horizontal-slide';
import { setCategoryProductsPages } from '../../../store/actions/productActions';

const ProductsRowComponent = ({ category, products, page, dispatch }) => {

    const paginateCategory = ({ plus, categoryId }) => {
        dispatch(setCategoryProductsPages({ plus, categoryId }));
    }

    return (
        <StyledProductsRow>
            <div className="products-category-header">
                <h3>{category.name}</h3>
                {/* <div className="navigate-buttons">
                    <button
                        className={`navigate-left ${page <= 1 ? 'disabled' : ''}`}
                        onClick={() => paginateCategory({
                            categoryId: category.id,
                            plus: false,
                        })}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        onClick={() => paginateCategory({
                            categoryId: category.id,
                            plus: true,
                        })}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div> */}
            </div>
            <HorizontalSlideComponent className="products-container">
                {products.map(product =>
                    <div key={product.id}>
                        <ProductCardComponent {...product} />
                    </div>
                    )
                }
            </HorizontalSlideComponent>
        </StyledProductsRow>
    )

}

export default connect()(ProductsRowComponent);
