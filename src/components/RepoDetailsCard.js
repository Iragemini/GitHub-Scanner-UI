

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * Display details of a single repository
 */
const SingleRepoCard = ({ repo }) => (
  <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
    <Typography variant="h5" gutterBottom>
      {repo.name}
    </Typography>

    <List>
      <ListItem>
        <ListItemText primary="Owner" secondary={repo.owner} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Size" secondary={`${repo.size.toLocaleString()} KB`} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="File Count" secondary={repo.fileCount} />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary="Visibility"
          secondary={repo.isPrivate ? 'Private' : 'Public'}
        />
      </ListItem>
    </List>

    <Accordion sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>YML File Content</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="pre"
          sx={{
            backgroundColor: '#f5f5f5',
            p: 2,
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            fontSize: '0.875rem',
          }}
        >
          {repo.ymlContent}
        </Box>
      </AccordionDetails>
    </Accordion>

    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">Active Webhooks:</Typography>
      {repo.activeHooks.map((hook) => (
        <Paper key={hook.id} variant="outlined" sx={{ p: 2, my: 1 }}>
          <Typography variant="body2">
            <strong>URL:</strong> {hook.url}
          </Typography>
          <Box sx={{ mt: 1 }}>
            {hook.events.map((event) => (
              <Chip
                key={event}
                label={event}
                color="primary"
                size="small"
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  </Paper>
);

/**
 * Card to display repository details
 */
const RepoDetailsCard = ({ repo }) => {
  if (!repo) return null;

  if (Array.isArray(repo)) {
    return (
      <>
        {repo.map((item, index) => (
          <SingleRepoCard key={index} repo={item} />
        ))}
      </>
    );
  }

  return <SingleRepoCard repo={repo} />;
};

export default RepoDetailsCard;