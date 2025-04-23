import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RepoDetailsCard from './RepoDetailsCard';

/**
 * Dialog window to display repository details
 */
const RepoDetailsModal = ({ open, onClose, repoDetails, error }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Repository Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {
          error
            ? <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
            : <RepoDetailsCard repo={repoDetails} />
        }
      </DialogContent>
    </Dialog>
  );
};

export default RepoDetailsModal;