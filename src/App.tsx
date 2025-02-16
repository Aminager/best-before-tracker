import { useEffect, useState } from 'react';
import { UploadFile } from './components/UploadFile';
import { productSearchClient } from './utils/ProductSearchClient';
import { Product } from './types/Product';
import { AllCommunityModule, ICellRendererParams, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);



function App() {
  const [newProducts, setNewProducts] = useState<Product[]>();
  const [products, setProducts] = useState<Product[]>([]);

  const onSubmit = async () => {
    const res = await productSearchClient.getProducts('8005110004766')
    setNewProducts(res);
    console.log(res)
  }

  useEffect(() => {
    productSearchClient.wakeUp() // Wake up the server as the free tier of Render sleeps after 30 minutes of inactivity
  }, []);

  return (
    <div>
      <UploadFile onUpload={(barcode) => console.log(barcode)} />
      <button onClick={onSubmit}>Click me</button>
      <div className='h-64 w-full'>
        <AgGridReact 
          rowData={newProducts}
          columnDefs={[
            { field: 'brandName' }, 
            { field: 'descriptionShort' }, 
            { field: 'image', cellRenderer: (params: ICellRendererParams) => <img src={params.value} alt='product' style={{height: '50px', width: '50px'}} /> }
          ]}
          />
      </div>
      <div className='h-64 w-full'>
        <AgGridReact 
          rowData={products}
          columnDefs={[{ field: 'brandName' }, { field: 'descriptionShort' }]}
          />
      </div>
    </div>
  )
}

export default App
