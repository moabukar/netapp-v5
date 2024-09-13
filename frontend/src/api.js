const API_BASE_URL = 'http://localhost:5000';

export const executeCommand = async (command) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.output;
    } catch (error) {
        console.error('Error:', error);
        return `Error: Unable to execute command. Details: ${error.message}`;
    }
};

// You can add other API functions here as well, for example:
export const getQuizQuestion = async () => {
    const response = await fetch(`${API_BASE_URL}/api/quiz`);
    return response.json();
};

export const getNetworkInfo = async () => {
    const response = await fetch(`${API_BASE_URL}/api/network_info`);
    return response.json();
};
