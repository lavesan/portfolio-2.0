export const PRODUCTS_FILTER = 'PRODUCTS_FILTER';

export function setProductFilter(filters) {
  return { type: PRODUCTS_FILTER, filters }
}
