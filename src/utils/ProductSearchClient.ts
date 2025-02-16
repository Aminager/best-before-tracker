import { Product, ProductSearchResponse } from '../types/Product';

class ProductSearchClient {
    private readonly API_URL = 'https://best-before-tracker.onrender.com';

    async wakeUp(): Promise<void> {
        await fetch(this.API_URL);
    }
  
    async getProducts(barcode: string): Promise<Product[]> {
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ barcode, sortDirection: 1, sortby: 0 })
        };
        const response = await fetch(`${this.API_URL}/search`, options);
        const data: ProductSearchResponse = await response.json();
 
        const detailedProducts: Product[] = await Promise.all(
            data.results.map(async (result) => fetch(`${this.API_URL}/details`, {
                method: 'POST', 
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ barcode: result.id })
            })
            .then(response => response.json()))
        );

        return detailedProducts;
    }
}

const productSearchClient = new ProductSearchClient();
export { productSearchClient };
