
interface downloadCSVProps {
    header: string[];
    body: string[][];
    filename: string;
}



export default function  downloadCSV({ header, body, filename }: downloadCSVProps) {
    // Convert the data array into a CSV string

    // Escape quotes in the header and body
    header = header.map(item => item.includes('"') ? item.replace(/"/g, '""') : item);
    body = body.map(row => row.map(item => item.includes('"') ? item.replace(/"/g, '""') : item));

    // Enclose all items with quotes. 
    // This will ensure that commas and newlines within the data do not break the CSV format.
    header = header.map(item => `"${item}"`);
    body = body.map(row => row.map(item => `"${item}"`));

    const csvString = [
        header,
        ...body,
    ]
    .map(row => row.join(","))
    .join("\n");

    if (!filename.endsWith('.csv')) {
        filename += '.csv'
    }

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Generate a download link and initiate the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};