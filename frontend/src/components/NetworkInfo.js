import React from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function NetworkInfo({ networkInfo }) {
    // Check if networkInfo and networkInfo.topics exist and are an array
    if (!networkInfo || !networkInfo.topics || !Array.isArray(networkInfo.topics) || networkInfo.topics.length === 0) {
        return <Typography>No network information available.</Typography>;
    }

    return (
        <Grid container spacing={3}>
            {networkInfo.topics.map((topic, index) => (
                <Grid item xs={12} key={index}>
                    <Accordion sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography variant="h6">{topic.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2">{topic.description || "No description available."}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ))}
        </Grid>
    );
}

export default NetworkInfo;
