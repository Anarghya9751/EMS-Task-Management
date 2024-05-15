import React from 'react';
import './FullViewPdf.css'

const FullViewPdf = ({ pdfData }) => {
  const openFullScreenPDF = () => {
    // Create a new window with the PDF embedded
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>Full Screen PDF Viewer</title>
          <style>
            body { margin: 0; overflow: hidden; }
            .pdf-container { width: 100%; height: 100vh; }
            .pdf-embed { width: 100%; height: 100%; }
          </style>
        </head>
        <body>
          <div class="pdf-container">
            <embed src="data:application/pdf;base64,${pdfData}" type="application/pdf" class="pdf-embed">
          </div>
        </body>
      </html>
    `);
  };

  return (
    <div className="form-group">
      <label>AttachedFile:</label>
      <button onClick={openFullScreenPDF} className="btn btn-primary">View Full</button>
    </div>
  );
};

export default FullViewPdf;
