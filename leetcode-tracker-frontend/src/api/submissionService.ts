import axios from 'axios';

export const fetchUserSubmissions = async (username: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/submissions/${username}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch submissions");
    }
};

export const fetchSubmissionDetail = async (submissionId: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/submissions/submission-detail/${submissionId}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch submission detail");
    }
};
