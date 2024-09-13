import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

function Quiz({ quizQuestion, showSnackbar, fetchQuizQuestion }) {
    return (
        <div>
            {quizQuestion && (
                <Card sx={{ p: 3, mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>{quizQuestion.question}</Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            {quizQuestion.options.map((option, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => {
                                            if (option === quizQuestion.correct_answer) {
                                                showSnackbar('Correct! Well done!');
                                            } else {
                                                showSnackbar('Incorrect. Try again!');
                                            }
                                            fetchQuizQuestion();
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
