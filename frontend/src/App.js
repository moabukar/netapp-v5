import React, { useState, useEffect } from 'react';
import { Container, Box, Menu, MenuItem, Tabs, Tab, Fade, Snackbar, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CodeIcon from '@mui/icons-material/Code';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import Header from './components/Header';
import Simulator from './components/Simulator';
import Quiz from './components/Quiz';
import NetworkInfo from './components/NetworkInfo';
import CommandReference from './components/CommandReference';
import Leaderboard from './components/Leaderboard';



// const API_URL = 'http://localhost:5000';
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API_URL = process.env.REACT_APP_API_URL || 'https://netapp-backend-bee075ee9b00.herokuapp.com';

const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#4fc3f7',
    },
    background: {
      default: '#0a1929',
      paper: '#1a2035',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a2035',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});

const tools = [
  { name: 'Ping', command: 'ping', icon: '🔔' },
  { name: 'NSLookup', command: 'nslookup', icon: '🔍' },
  { name: 'Dig', command: 'dig', icon: '⛏️' },
  { name: 'Traceroute', command: 'traceroute', icon: '🛤️' },
];

function App() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [networkInfo, setNetworkInfo] = useState([]);
  const [commandReference, setCommandReference] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [quizState, setQuizState] = useState({
    quizQuestion: null,
    score: 0,
    questionCount: 0,
  });

  useEffect(() => {
    fetchQuizQuestion();
    fetchNetworkInfo();
    fetchCommandReference();
    fetchLeaderboard();
  }, []);

  const fetchQuizQuestion = async () => {
    try {
      const response = await fetch(`${API_URL}/api/quiz`);
      const data = await response.json();
      setQuizState(prevState => ({ ...prevState, quizQuestion: data }));
    } catch (error) {
      console.error('Error fetching quiz question:', error);
      setQuizState(prevState => ({ ...prevState, quizQuestion: null }));
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_URL}/api/leaderboard`);
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleQuizAnswer = (isCorrect) => {
    setQuizState(prevState => {
      const newScore = isCorrect ? prevState.score + 1 : prevState.score;
      const newQuestionCount = prevState.questionCount + 1;

      if (newQuestionCount >= 10) {
        // Quiz completed
        showSnackbar(`Quiz completed! Your score: ${newScore} out of 10`);
      } else {
        fetchQuizQuestion();
      }

      return {
        ...prevState,
        score: newScore,
        questionCount: newQuestionCount,
      };
    });

    showSnackbar(isCorrect ? 'Correct! Well done!' : 'Incorrect. Try again!');
  };

  const submitScore = async (finalScore, username) => {
    try {
      const response = await fetch(`${API_URL}/api/submit_score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: finalScore, username: username }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit score');
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      throw error;
    }
  };

  const handleQuizComplete = async (finalScore, username) => {
    try {
      await submitScore(finalScore, username);
      showSnackbar('Score submitted successfully!');
      fetchLeaderboard();
      // Reset quiz state
      setQuizState({
        quizQuestion: null,
        score: 0,
        questionCount: 0,
      });
      fetchQuizQuestion();
    } catch (error) {
      showSnackbar('Failed to submit score. Please try again.');
    }
  };

  const fetchNetworkInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/api/network_info`);
      const data = await response.json();
      setNetworkInfo(data);
    } catch (error) {
      console.error('Error fetching network info:', error);
      setNetworkInfo({ topics: [] });
    }
  };

  const fetchCommandReference = async () => {
    try {
      const response = await fetch(`${API_URL}/api/command_reference`);
      const data = await response.json();
      setCommandReference(data);
    } catch (error) {
      console.error('Error fetching command reference:', error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToolSelect = (tool) => {
    setCommand(tool.command + ' ');
    handleMenuClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput('Error: Failed to execute command');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <CssBaseline />
      <Header handleMenuClick={handleMenuClick} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {tools.map((tool) => (
          <MenuItem key={tool.name} onClick={() => handleToolSelect(tool)}>
            <span style={{ marginRight: '8px' }}>{tool.icon}</span>
            {tool.name}
          </MenuItem>
        ))}
      </Menu>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered variant="fullWidth">
            <Tab icon={<CodeIcon />} label="Simulator" />
            <Tab icon={<QuizIcon />} label="Quiz" />
            <Tab icon={<InfoIcon />} label="Network Info" />
            <Tab icon={<MenuBookIcon />} label="Command Reference" />
            <Tab icon={<span role="img" aria-label="trophy">🏆</span>} label="Leaderboard" />
          </Tabs>
          <Box sx={{ mt: 4 }}>
            <Fade in={tabValue === 0}>
              <div hidden={tabValue !== 0}>
                <Simulator
                  command={command}
                  setCommand={setCommand}
                  handleSubmit={handleSubmit}
                  output={output}
                />
              </div>
            </Fade>
            <Fade in={tabValue === 1}>
              <div hidden={tabValue !== 1}>
                <Quiz
                  quizQuestion={quizState.quizQuestion}
                  showSnackbar={showSnackbar}
                  handleQuizAnswer={handleQuizAnswer}
                  score={quizState.score}
                  questionCount={quizState.questionCount}
                  onQuizComplete={handleQuizComplete}
                />
              </div>
            </Fade>
            <Fade in={tabValue === 2}>
              <div hidden={tabValue !== 2}>
                <NetworkInfo networkInfo={networkInfo} />
              </div>
            </Fade>
            <Fade in={tabValue === 3}>
              <div hidden={tabValue !== 3}>
                <CommandReference commandReference={commandReference} />
              </div>
            </Fade>
            <Fade in={tabValue === 4}>
              <div hidden={tabValue !== 4}>
                <Leaderboard leaderboard={leaderboard} />
              </div>
            </Fade>
          </Box>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
}

export default App;
