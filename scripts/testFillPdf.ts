import fs from 'fs';
import path from 'path';
import { fillPdfFromJson } from '../src/lib/pdfFill'; // your existing logic

const testData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../testdata/form_1-3_sample_response.json'), 'utf-8')
);
const fieldMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/lib/pdfmaps/tokyo_startup_visa_form_1-3_short_fieldmap.json'), 'utf-8')
);

async function run() {
  const resultPath = path.join(__dirname, '../output/test_filled.pdf');
  await fillPdfFromJson({
    inputPdfPath: path.join(__dirname, '../pdfs/startup_visa_template.pdf'),
    outputPdfPath: resultPath,
    formData: testData,
    fieldMap: fieldMap
  });

  console.log('Test PDF filled and saved to:', resultPath);
}

run().catch(console.error);