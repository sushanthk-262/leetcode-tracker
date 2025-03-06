import { useState } from 'react';
import Login from './components/Login';
import ProblemTable from './components/ProblemTable';

const App = () => {
    const [username, setUsername] = useState<string | null>(null);

    return (
        <div>
            {username ? (
                <>
                    <h1>Welcome back, {username}!</h1>
                    <ProblemTable />
                </>
            ) : (
                <Login setUsername={setUsername} />
            )}
        </div>
    );
};

export default App;