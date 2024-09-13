import React from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';

function Simulator({ command, setCommand, handleSubmit, output }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="secondary" size="large">
                    Execute
                </Button>
            </form>
            <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom>
                    Output:
                </Typography>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                    {output}
                </pre>
            </Paper>
        </div>
    );
}

export default Simulator;
