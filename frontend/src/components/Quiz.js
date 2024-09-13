import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';

function Quiz({ quizQuestion, showSnackbar, handleQuizAnswer, score, questionCount, onQuizComplete }) {
    const [username, setUsername] = useState('');
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (questionCount >= 10) {
            setQuizCompleted(true);
        }
    }, [questionCount]);

    const handleSubmitScore = () => {
        if (!username.trim()) {
            showSnackbar('Please enter a username');
            return;
        }
        if (submitted) {
            showSnackbar('Score already submitted');
            return;
        }
        onQuizComplete(score, username);
        setSubmitted(true);
        showSnackbar('Score submitted successfully!');
    };

    const handleStartNewQuiz = () => {
        setQuizCompleted(false);
        setSubmitted(false);
        setUsername('');
        onQuizComplete(0, ''); // Reset the quiz in the parent component
    };

    if (!quizQuestion && !quizCompleted) {
        return <Typography>Loading question...</Typography>;
    }

    if (quizCompleted) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Quiz Completed!</Typography>
                    <Typography variant="h6" gutterBottom>Your score: {score} out of 10</Typography>
                    {!submitted ? (
                        <>
                            <TextField
                                label="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Button onClick={handleSubmitScore} variant="contained" color="primary">
                                Submit Score
                            </Button>
                        </>
                    ) : (
                        <Button onClick={handleStartNewQuiz} variant="contained" color="primary">
                            Start New Quiz
                        </Button>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>{quizQuestion.question}</Typography>
                <Box>
                    {quizQuestion.options.map((option, index) => (
                        <Button
                            key={index}
                            onClick={() => handleQuizAnswer(option === quizQuestion.correct_answer)}
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '10px' }}
                        >
                            {option}
                        </Button>
                    ))}
                </Box>
                <Typography variant="body2" style={{ marginTop: '20px' }}>
                    Question {questionCount + 1} of 10
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Quiz;
