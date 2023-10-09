// pages/api/processFile.js
import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { Formidable } from 'formidable';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const form = new Formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const file = files.file && files.file[0];  
    
    // Check if file and file.path are defined
    if (!file) {
      return res.status(400).json({ error: 'File upload failed' });
    }

    const fileType = file.type || file.mimetype; // Adjust this line, as the type might be under mimetype
    const filePath = file.path || file.filepath; // Adjust this line, as the path might be under filepath

    try {
      const text = await extractText(filePath, fileType);
      res.status(200).json({ text });
    } catch (error) {
      console.error(error);
      res.status(500).end('Error processing file');
    } finally {
      // Delete the uploaded file if it exists
      if (filePath) {
        fs.unlink(filePath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
    }
  });

};

async function extractText(filePath, fileType) {
  if (fileType === 'text/plain') {
    return fs.promises.readFile(filePath, 'utf8');
  } else if (fileType === 'application/pdf') {
    const data = await pdf(fs.readFileSync(filePath));
    return data.text;
  } else if (fileType.includes('application/vnd.openxmlformats-officedocument')) {
    const { value } = await mammoth.extractRawText({ path: filePath });
    return value;
  }
  throw new Error('Unsupported file type');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
