import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

function Leaderboard({ leaderboard }) {
    return (
        <Card sx={{
            p: 4,
            mt: 3,
            backgroundColor: '#1a2035',
            color: '#ffffff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}>
            <CardContent>
                <Typography variant="h4" gutterBottom sx={{ color: '#4fc3f7', fontWeight: 'bold' }}>
                    Leaderboard
                </Typography>
                <List>
                    {leaderboard.map((entry, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`#${index + 1} - ${entry.username || 'Anonymous'}`}
                                secondary={`Score: ${entry.score}`}
                                primaryTypographyProps={{ style: { color: '#ffffff' } }}
                                secondaryTypographyProps={{ style: { color: '#b0bec5' } }}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

export default Leaderboard;
