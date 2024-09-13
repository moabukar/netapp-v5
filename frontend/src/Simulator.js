import React, { useState } from 'react';
import { executeCommand } from '../api';

function Simulator() {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState('');

    const handleExecute = async () => {
        const result = await executeCommand(command);
        setOutput(result);
    };

    return (
        <div>
            <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Enter command"
            />
            <button onClick={handleExecute}>Execute</button>
            <pre>{output}</pre>
        </div>
    );
}

export default Simulator;
