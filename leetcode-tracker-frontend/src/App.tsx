import { useState } from 'react';
import ProblemTable from './components/ProblemTable';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
    const [username, setUsername] = useState("");
    const [searchUsername, setSearchUsername] = useState<string | null>(null);
    const queryClient = useQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <input type="text" placeholder="Enter your LeetCode username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button onClick={() => setSearchUsername(username)}>Fetch Submissions</button>
                {searchUsername && <ProblemTable username={searchUsername} />}
            </div>
        </QueryClientProvider>
    );
};

export default App;