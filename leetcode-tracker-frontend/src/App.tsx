import React, { useState } from "react";
import { fetchUserSubmissions } from "./api/submissionService";
import ProblemTable from "./components/ProblemTable";

const App: React.FC = () => {
    const [username, setUsername] = useState("");
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchSubmissions = async () => {
        setLoading(true);
        try {
            const data = await fetchUserSubmissions(username);
            const submissionsList = data.data ? data.data.recentSubmissionList : data.recentSubmissionList;
            setSubmissions(submissionsList || []);
            console.log('Fetched submissions:', submissionsList);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    

    return (
        <div>
            <h1>LeetCode Tracker</h1>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter LeetCode Username" 
            />
            <button onClick={handleFetchSubmissions} disabled={loading}>
                {loading ? "Loading..." : "Fetch Submissions"}
            </button>
            <ProblemTable submissions={submissions} />
        </div>
    );
};

export default App;