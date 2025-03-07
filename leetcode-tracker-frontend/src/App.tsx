import { useState } from 'react';
import ProblemTable from './components/ProblemTable';

const App = () => {
    const [username, setUsername] = useState<string | null>(null);

    return (
        <div>
            {username ? (
                <>
                    <h1>Welcome back, {username}!</h1>
                    <ProblemTable username={username} />
                </>
            ) : (
                <div>
                    <input type="text" placeholder="Enter your LeetCode username" onChange={(e) => setUsername(e.target.value)} />
                    <button onClick={() => setUsername(username)}>Fetch Submissions</button>
                </div>
            )}
        </div>
    );
};

export default App;