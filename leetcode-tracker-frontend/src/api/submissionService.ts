import axios from 'axios';

export const fetchUserSubmissions = async (userId: number) => {
    const response = await axios.get(`http://localhost:8080/submissions/${userId}`);
    return response.data;
};

export const submitProblem = async (submission: any) => {
    const response = await axios.post('http://localhost:8080/submissions/add', submission);
    return response.data;
};