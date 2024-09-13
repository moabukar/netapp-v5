import React from 'react';
import { Card, CardContent, Typography, Grid, Button, CircularProgress, Box } from '@mui/material';

function Quiz({ quizQuestion, showSnackbar, handleQuizAnswer, score, questionCount }) {
    if (!quizQuestion) {
        console.log("No quiz question available, showing loading state");
        return (
            <Card sx={{
                p: 4,
                mt: 3,
                backgroundColor: '#1a2035',
                color: '#ffffff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px'
            }}>
                <CircularProgress color="secondary" />
            </Card>
        );
    }

    return (
        <Card sx={{
            p: 4,
            mt: 3,
            backgroundColor: '#1a2035',
            color: '#ffffff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" sx={{ color: '#4fc3f7', fontWeight: 'bold' }}>
                        {quizQuestion.question}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#4fc3f7' }}>
                        Score: {score}/{questionCount}
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    {quizQuestion.options && quizQuestion.options.map((option, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => handleQuizAnswer(option === quizQuestion.correct_answer)}
                                sx={{
                                    backgroundColor: '#2196f3',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                    },
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    padding: '12px',
                                    textTransform: 'none'
                                }}
                            >
                                {option}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="body2" sx={{ mt: 2, color: '#bdbdbd' }}>
                    Question {questionCount + 1} of 10
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Quiz;
