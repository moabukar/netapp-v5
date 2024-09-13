import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

function Quiz({ quizQuestion, showSnackbar, fetchQuizQuestion }) {
    return (
        <div>
            {quizQuestion && (
                <Card sx={{
                    p: 3,
                    mt: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
                }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                            {quizQuestion.question}
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            {quizQuestion.options.map((option, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={() => {
                                            if (option === quizQuestion.correct_answer) {
                                                showSnackbar('Correct! Well done!');
                                            } else {
                                                showSnackbar('Incorrect. Try again!');
                                            }
                                            fetchQuizQuestion();
                                        }}
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            color: '#ffffff',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                            },
                                            fontWeight: 'bold',
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                                            fontSize: '1rem',
                                            padding: '10px'
                                        }}
                                    >
                                        {option}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default Quiz;
