import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, CircularProgress } from '@mui/material';

function Simulator({ command, setCommand, handleSubmit, output }) {
    const [isLoading, setIsLoading] = useState(false);
    const [progressOutput, setProgressOutput] = useState('');

    useEffect(() => {
        if (output) {
            setIsLoading(false);
            setProgressOutput(output);
        }
    }, [output]);

    const handleExecute = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setProgressOutput('Executing command...');
        await handleSubmit(e);
    };

    return (
        <div>
            <form onSubmit={handleExecute}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    sx={{ mb: 2, input: { color: 'text.primary' } }}
                />
                <Button type="submit" variant="contained" color="secondary" size="large" disabled={isLoading}>
                    {isLoading ? 'Executing...' : 'Execute'}
                </Button>
            </form>
            <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.paper', color: 'text.primary' }}>
                <Typography variant="h6" gutterBottom>
                    Output:
                </Typography>
                {isLoading && <CircularProgress size={24} sx={{ mr: 2 }} />}
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                    {progressOutput}
                </pre>
            </Paper>
        </div>
    );
}

export default Simulator;
