import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { StyledFilterProducts } from './filter-products.styles';
import { setSelectedFilter, toogleProductFilter } from '../../../store/actions/productActions';

const FilterProductsComponent = ({ openFilter, selectedFilters, dispatch, className }) => {

    const addFilter = (filter) => {
        // console.log('filter: ', filter);
        dispatch(setSelectedFilter(filter));
    }

    const toogleFilter = (e) => {
        e.stopPropagation();
        dispatch(toogleProductFilter());
    }

    useEffect(() => {
        console.log('selectedFilters: ', selectedFilters);
    }, [selectedFilters])

    return (
        <StyledFilterProducts show={openFilter} className={className}>
            <p className="title"><b>Filtrar por:</b></p>
            <div className="filter-row">
                <p className="filter-title">Preço</p>
                <div className="filter-container">
                    <button
                        type="button"
                        className={selectedFilters.price.active && selectedFilters.price.type === 'lessThanOrEqual' ? 'active' : ''}
                        onClick={() => addFilter({
                            name: 'price',
                            active: true,
                            compare: 'lessThanOrEqual',
                            id: 1,
                            label: 'Menor preço',
                        })}
                        >Menor preço</button>
                    <button
                        type="button"
                        className={selectedFilters.price.active && selectedFilters.price.type === 'moreThan' ? 'active' : ''}
                        onClick={() => addFilter({
                            name: 'price',
                            active: true,
                            compare: 'moreThan',
                            id: 1,
                            label: 'Maior preço',
                        })}
                        >Maior preço</button>
                </div>
            </div>
            <div className="filter-row">
                <p className="filter-title">Quantidade no estoque</p>
                <div className="filter-container">
                    <button
                        type="button"
                        className={selectedFilters.quantityOnStock.active && selectedFilters.quantityOnStock.type === 'lessThanOrEqual' ? 'active' : ''}
                        onClick={() => addFilter({
                            name: 'quantityOnStock',
                            active: true,
                            compare: 'lessThanOrEqual',
                            id: 2,
                            label: 'Acabando',
                        })}
                        >
                            Acabando
                    </button>
                    <button
                        type="button"
                        className={selectedFilters.quantityOnStock.active && selectedFilters.quantityOnStock.type === 'moreThan' ? 'active' : ''}
                        onClick={() => addFilter({
                            name: 'quantityOnStock',
                            active: true,
                            compare: 'moreThan',
                            id: 2,
                            label: 'Normal',
                        })}
                        >
                            Normal
                    </button>
                </div>
            </div>
            <div className="close-filter">
                <button type="button" onClick={toogleFilter}>CANCELAR</button>
            </div>
        </StyledFilterProducts>
    )

}

const mapStateToProps = store => ({
    openFilter: store.productState.openFilter,
    filters: store.productState.filters,
    selectedFilters: store.productState.selectedFilters,
});

export default connect(mapStateToProps)(FilterProductsComponent);
