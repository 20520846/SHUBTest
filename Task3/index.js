const fetch = require('node-fetch');

const inputURL = 'https://share.shub.edu.vn/api/intern-test/input';
const outputURL = 'https://share.shub.edu.vn/api/intern-test/output';

async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

async function postData(url, token, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error pushing data: ${response.statusText}`);
        }
        const result = await response.json();
        console.log('Data pushed successfully:', result);
    } catch (error) {
        console.error('Error pushing data:', error.message);
    }
}

async function processData() {

    // Lấy dữ liệu từ URL input
    const inputData = await getData(inputURL);
    const {token, data, query} = inputData;

    const result = [];
    for (let i = 0; i < query.length; i++){
        const {type, range} = query[i];
        const [l,r] = range;

        // Tính toán result dựa theo type
        let queryResult = 0;
        if (type === '1'){    
            for (let j = l; j <= r; j++){
                queryResult += data[j];
            }
            result.push(queryResult);
        }
        else if (type === '2'){
            for (let j = l; j <= r; j++){            
                if (j % 2 === 0){
                    queryResult += data[j];
                }
                else if (j % 2 !== 0){
                    queryResult -= data[j];
                }
            }
            result.push(queryResult);
        }
    }

    // Gửi kết quả lên URL với phương thức POST
    await postData(outputURL, token, result);
}

processData();

