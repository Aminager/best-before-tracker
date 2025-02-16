import Quagga from '@ericblade/quagga2'
import { ChangeEvent, useState } from 'react';

interface UploadFileProps {
    onUpload: (barcode: string) => void;
}

export const UploadFile = (props: UploadFileProps) => {
  const { onUpload } = props;
  const [barcode, setBarcode] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageSrc = event.target?.result;
        Quagga.decodeSingle({
          src: imageSrc,
          numOfWorkers: 0, // Needs to be 0 when used with decodeSingle
          inputStream: {
            size: 800, // Set the size to ensure the image is properly processed
          },
          decoder: {
            readers: ['code_128_reader', 'ean_reader'], // Add the barcode formats you need
          },
        }, (result) => {
          if (result && result.codeResult.code) {
            onUpload(result.codeResult.code);
            setBarcode(result.codeResult.code);
          } else {
            setBarcode('Barcode not found');
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {barcode && <p>Barcode: {barcode}</p>}
    </div>
  )
}
