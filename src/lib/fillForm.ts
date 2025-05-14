/*
	PDF-lib logic to inject data
	•   Loads a fillable PDF template
	•	Injects answers based on a field map
	•	Returns the filled PDF as a Uint8Array (ready for download or upload)
 */

import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import { getFieldMap, FieldMapEntry } from './getFieldMap';

export async function fillForm(formId: string, answers: Record<string, any>): Promise<Uint8Array> {
    // Load field map
    const fieldMap: Record<string, FieldMapEntry> = await getFieldMap(formId);

    // Load PDF template path from your form schema (can also be passed in)
    const templatePath = path.resolve(`./public/pdfs/${formId}_template.pdf`);
    const pdfBytes = await fs.readFile(templatePath);

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    // Fill each field
    for (const [pdfField, { answerKey, type }] of Object.entries(fieldMap)) {
        const value = answers[answerKey];
        if (!value) continue;

        const text = type === 'date'
            ? new Date(value).toLocaleDateString('ja-JP')
            : String(value);

        try {
            form.getTextField(pdfField).setText(text);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            console.warn(`PDF field not found or failed to set: ${pdfField}`);
        }
    }

    return await pdfDoc.save();
}
