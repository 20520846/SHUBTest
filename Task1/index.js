const axios = require('axios');
const XLSX = require('xlsx');

const sheetURL = 'https://go.microsoft.com/fwlink/?LinkID=521962';

// Gửi yêu cầu để lấy file Excel
axios.get(sheetURL, { responseType: 'arraybuffer' })
    .then(res => {
        const data = res.data;

        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Lọc dữ liệu có giá trị của cột "Sales" > 50000
        const filteredData = jsonData.filter(row => {
            return row['  Sales '] > 50000;
        });

        // Tạo workbook mới và sheet từ dữ liệu đã lọc
        const newWorkbook = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Filtered Data');

        // Xuất workbook thành file Excel mới
        XLSX.writeFile(newWorkbook, 'filtered_data.xlsx');
        console.log('Filtered data saved successfully.');
    })
    .catch(error => {
        console.error('Error fetching or processing data:', error);
    });


