export async function accessBackend(path, data) {
    const response = await fetch(`https://ql3qasxkua6jg2qpalpq74n6xi0mqftx.lambda-url.ap-southeast-1.on.aws/${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': '42069'
        },
        body: JSON.stringify({
            data
        })
    });

    if (response.status == 200) {
        const data = await response.json();
        console.log('Success accessing backend. Data:', data);
        return data?.data;
    } else {
        console.error('Error accessing backend. Response:', response);
        return null;
    }
}
