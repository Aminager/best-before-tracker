export interface Product {
    brandName: string;
    consumerStorageInstructions: string;
    countryOfOriginCodes: {code: string; name: string}[];
    descriptionShort: string;
    descriptiveSize: string;
    gpcCategoryCode: { code: string; name: string };
    grossWeight: { value: string; measurementUnitCode: { code: string; name: string } };
    gtin: string;
    id: string;
    image: string;
    informationProviderGln: string;
    informationProviderName: string;
    ingredientStatement: string;
    isTradeItemAVariableUnit: boolean;
    lastChangeDateTime: string;
    maximumTemperature: { value: string; measurementUnitCode: { code: string; name: string } };
    minimumTemperature: { value: string; measurementUnitCode: { code: string; name: string } };
    minimumTradeItemLifespanFromTimeOfProduction: number;
    netContent: { value: string; measurementUnitCode: { code: string; name: string } }[];
    nutrientHeaders: { nutrientBasisQuantity: { value: string; measurementUnitCode: { code: string; name: string }}}[];
    relatedSupplierArticleNumbers: string[];
    thumbnail: string;
    tradeItemDescription: string;
}

export interface ProductPreview {
    brandName: string;
    countryOfOriginCodes: { code: string; name: string }[];
    descriptionShort: string;
    gtin: string;
    id: string;
    informationProviderGln: string;
    informationProviderName: string;
    lastChangeDateTime: string;
}

export interface ProductSearchResponse {
    results: ProductPreview[];
    count: number;
}
