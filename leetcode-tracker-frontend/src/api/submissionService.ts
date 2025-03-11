import axios from 'axios';

export const fetchUserSubmissions = async (username: string) => {
    const response = await axios.get(`http://localhost:8080/submissions/${username}`);
    return response.data;
};