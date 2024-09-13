import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function NetworkInfo({ networkInfo }) {
    return (
        <Grid container spacing={3}>
            {networkInfo.map((topic, index) => (
                <Grid item xs={12} md={6} key={index}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>{topic.title}</Typography>
                            <Typography variant="body2">{topic.description}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default NetworkInfo;
