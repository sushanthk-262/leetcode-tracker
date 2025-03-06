import { useState } from 'react';
import Login from './components/Login';

const App = () => {
    const [username, setUsername] = useState<string | null>(null);

    return (
        <div>
            {(
                <Login setUsername={setUsername} />
            )}
        </div>
    );
};

export default App;