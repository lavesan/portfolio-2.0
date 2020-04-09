export const productSuffixes = {
    UNITY: '1x',
    KILOGRAM: '1kg',
    TO_GRAM_100: '100g',
    TO_GRAM_500: '500g',
}

const handleAddAmount = {
    [productSuffixes.TO_GRAM_100](quantity) {
        return quantity + 0.1;
    },
    [productSuffixes.TO_GRAM_500](quantity) {
        return quantity + 0.5;
    },
    [productSuffixes.UNITY](quantity) {
        return quantity + 1;
    },
}

const handleRemoveAmount = {
    [productSuffixes.TO_GRAM_100](quantity) {
        return quantity - 0.1;
    },
    [productSuffixes.TO_GRAM_500](quantity) {
        return quantity - 0.5;
    },
    [productSuffixes.UNITY](quantity) {
        return quantity - 1;
    },
}

const handleDeactivateCondition = {
    [productSuffixes.TO_GRAM_100](quantity, quantityOnStock) {
        return {
            canRemove: quantity > 0.1,
            canAdd: quantity < quantityOnStock,
        }
    },
    [productSuffixes.TO_GRAM_500](quantity, quantityOnStock) {
        return {
            canRemove: quantity > 0.5,
            canAdd: quantity < quantityOnStock,
        }
    },
    [productSuffixes.UNITY](quantity, quantityOnStock) {
        return {
            canRemove: quantity > 1,
            canAdd: quantity < quantityOnStock,
        }
    },
}

export const addAmountFromSuffix = ({ quantitySuffix, quantity }) => {
    if(handleAddAmount[quantitySuffix]) {
        return Number(handleAddAmount[quantitySuffix](quantity).toFixed(3));
    }
    return 0
}

export const removeAmountFromSuffix = ({ quantitySuffix, quantity }) => {
    if (handleRemoveAmount[quantitySuffix]) {
        return Number(handleRemoveAmount[quantitySuffix](quantity).toFixed(3));
    }
    return 0;
}

export const deactivateCondition = ({ quantitySuffix, quantity, quantityOnStock }) => {
    if (handleDeactivateCondition[quantitySuffix]) {
        return handleDeactivateCondition[quantitySuffix](quantity, quantityOnStock);
    }
    return {};
}

export const translateQuantitySuffixToUser = quantitySuffix => {
    if (productSuffixes.UNITY === quantitySuffix) {
        return 'x';
    } else {
        return 'kg';
    }
}
