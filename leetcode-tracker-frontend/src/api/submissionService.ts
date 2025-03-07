import axios from 'axios';

export const fetchUserSubmissions = async (username: string) => {
    const response = await axios.get(`http://localhost:8080/submissions/${username}`);
    return response.data;
};

export const submitProblem = async (submission: any) => {
    const response = await axios.post('http://localhost:8080/submissions/add', submission);
    return response.data;
};