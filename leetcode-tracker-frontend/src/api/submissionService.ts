import axios from 'axios';

export const loginToLeetCode = async (username: string, password: string) => {
    await axios.post('http://localhost:8080/submissions/login', null, { params: { username, password } });
};

export const fetchUserSubmissions = async (username: string) => {
    const response = await axios.get(`http://localhost:8080/submissions/${username}`);
    return response.data.data;
};
