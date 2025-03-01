import axios from 'axios';
export const fetchProblems = async () => {
    const response = await axios.get('http://localhost:8080/problems');
    return response.data;
};