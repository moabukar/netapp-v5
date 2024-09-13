import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function CommandReference({ commandReference }) {
    return (
        <Grid container spacing={3}>
            {Object.entries(commandReference).map(([command, description], index) => (
                <Grid item xs={12} md={6} key={index}>
                    <Card sx={{
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: 'text.primary'
                    }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>{command}</Typography>
                            <Typography variant="body2">{description}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default CommandReference;
