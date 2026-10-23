import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadResumePdf = async (
  elementId: string = "resume-document",
  fileName: string = "Rabin_Glan.pdf"
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // Dedicated ATS print styles for the cloned document
  const printStyles = `
    * {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #111827;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.45;
    }
    #${elementId} {
      width: 800px !important;
      max-width: 800px !important;
      margin: 0 auto !important;
      padding: 36px 44px !important;
      background-color: #ffffff !important;
      color: #111827 !important;
      box-shadow: none !important;
      border: none !important;
    }
    h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 0.05em;
      margin: 0 0 4px 0;
      color: #111827;
      text-transform: uppercase;
    }
    .resume-subtitle {
      font-size: 13px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 8px;
      letter-spacing: 0.02em;
    }
    .resume-contact {
      font-size: 11px;
      color: #4b5563;
      margin-bottom: 18px;
      padding-bottom: 12px;
      border-bottom: 1.5px solid #d1d5db;
    }
    .resume-contact a {
      color: #2563eb;
      text-decoration: none;
    }
    h2.section-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #111827;
      margin: 16px 0 8px 0;
      padding-bottom: 3px;
      border-bottom: 1.5px solid #111827;
    }
    p {
      font-size: 11px;
      color: #1f2937;
      margin: 0 0 6px 0;
      line-height: 1.45;
    }
    .skill-category {
      font-size: 11px;
      margin-bottom: 4px;
      line-height: 1.4;
    }
    .skill-category strong {
      color: #111827;
      font-weight: 700;
    }
    .experience-item, .project-item {
      margin-bottom: 12px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .item-title {
      font-size: 12px;
      font-weight: 700;
      color: #111827;
    }
    .item-period {
      font-size: 10.5px;
      font-weight: 600;
      color: #4b5563;
    }
    .item-role {
      font-size: 11px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 3px;
    }
    ul.bullet-list {
      margin: 3px 0 6px 18px;
      padding: 0;
      list-style-type: disc;
    }
    ul.bullet-list li {
      font-size: 10.5px;
      color: #374151;
      margin-bottom: 2px;
      line-height: 1.4;
    }
  `;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    onclone: (clonedDoc) => {
      // 1. Remove all existing styles and links to avoid unsupported modern CSS (lab(), oklch())
      const styles = Array.from(clonedDoc.getElementsByTagName("style"));
      styles.forEach((s) => s.remove());

      const links = Array.from(
        clonedDoc.querySelectorAll('link[rel="stylesheet"]')
      );
      links.forEach((l) => l.remove());

      // 2. Inject clean, self-contained standard CSS for the resume
      const cleanStyle = clonedDoc.createElement("style");
      cleanStyle.innerHTML = printStyles;
      clonedDoc.head.appendChild(cleanStyle);

      // 3. Clear body and isolate only the resume element
      const clonedTarget = clonedDoc.getElementById(elementId);
      if (clonedTarget) {
        clonedDoc.body.innerHTML = "";
        clonedDoc.body.appendChild(clonedTarget);
      }
    },
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfPageHeight = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);
  const totalPdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  let heightLeft = totalPdfHeight;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, totalPdfHeight);
  heightLeft -= pdfPageHeight;

  // Add subsequent pages if content exceeds 1 page
  while (heightLeft > 5) {
    position = -(totalPdfHeight - heightLeft);
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, totalPdfHeight);
    heightLeft -= pdfPageHeight;
  }

  pdf.save(fileName);
};
