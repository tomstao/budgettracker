import { ExportData } from "@/types/analytics.types";

export const exportToCSV = (data: any[], filename: string): void => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Escape commas and quotes in CSV
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    ),
  ].join("\n");

  downloadFile(csvContent, `${filename}.csv`, "text/csv");
};

export const exportToJSON = (data: any, filename: string): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, "application/json");
};

export const exportToPDF = async (
  data: ExportData,
  filename: string
): Promise<void> => {
  // This would typically use a library like jsPDF or similar
  // For now, we'll create a simple HTML representation
  const htmlContent = generatePDFHTML(data);
  downloadFile(htmlContent, `${filename}.html`, "text/html");
};

const downloadFile = (
  content: string,
  filename: string,
  mimeType: string
): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const generatePDFHTML = (data: ExportData): string => {
  const { transactions, categories, budgets, analytics } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Expense Tracker Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .summary { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Expense Tracker Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="section">
        <h2>Summary</h2>
        <div class="summary">
          <p><strong>Total Transactions:</strong> ${transactions.length}</p>
          <p><strong>Total Categories:</strong> ${categories.length}</p>
          <p><strong>Total Budgets:</strong> ${budgets.length}</p>
        </div>
      </div>
      
      <div class="section">
        <h2>Recent Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${transactions
              .slice(0, 10)
              .map(
                (t) => `
              <tr>
                <td>${new Date(t.date).toLocaleDateString()}</td>
                <td>${t.title}</td>
                <td>${t.category.name}</td>
                <td>${t.type}</td>
                <td>$${t.amount.toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
      
      <div class="section">
        <h2>Categories</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            ${categories
              .map(
                (c) => `
              <tr>
                <td>${c.name}</td>
                <td>${c.type}</td>
                <td style="background-color: ${c.color}; width: 20px;"></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;
};
