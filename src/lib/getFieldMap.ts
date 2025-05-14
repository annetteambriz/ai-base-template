// Backend helper to load field map
export interface FieldMapEntry {
    answerKey: string;
    type?: 'text' | 'email' | 'textarea' | 'date' | 'number';
    format?: string;
    maxLength?: number;
}

export async function getFieldMap(formId: string): Promise<Record<string, FieldMapEntry>> {
    const filename = `${formId}_fieldmap.json`;

    try {
        const map = await import(`@/lib/pdfmaps/${filename}`);
        return map.default as Record<string, FieldMapEntry>;
    } catch (err) {
        console.error(`Field map for formId "${formId}" not found at: ${filename}`);
        throw new Error('Unable to load field map.');
    }
}
