import axios from 'axios';

export const fetchProblems = async () => {
    const response = await axios.get('http://localhost:8080/problems');
    return response.data;
};

export const fetchProblemDetails = async (titleSlug: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/submissions/question/${titleSlug}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch problem details");
    }
};
