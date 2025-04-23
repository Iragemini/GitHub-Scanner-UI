import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import MUIDataTable from './common/MUIDataTable';
import DetailsTwoToneIcon from '@mui/icons-material/DetailsTwoTone';
import RepoDetailsModal from './RepoDetailsModal';
import { useRepositories } from '../hooks/useRepositories';
import config from '../config';

/**
 * Displays list of repositories
 */
function RepositoriesTable() {
  const { repositories, loading, error, setError } = useRepositories();
  const [selected, setSelected] = useState([]);
  const [repoDetails, setRepoDetails] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (repoDetails) {
      handleOpenModal()
    }
  }, [repoDetails]);

  /**
   * Handle modal window opening
   */
  const handleOpenModal = () => {
    setOpen(true);
  };

  /**
   * Handles selecting or deselecting all repository rows in the table.
   * If the checkbox is checked, it selects all repositories; otherwise, it clears the selection.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = repositories.map((repo) => ({
        id: repo.id,
        name: repo.name,
      }));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  /**
   * Toggles the selection state of a single repository row.
   * If the repository is not already selected, it adds it to the selection.
   * If it is already selected, it removes it.
   *
   * @param {React.SyntheticEvent} event - The event triggered by the row interaction.
   * @param {{ id: string | number, name: string }} row - The repository row object.
   */
  const handleSelect = (event, row) => {
    const { id, name } = row;
    const selectedIndex = selected.findIndex((item) => item.id === id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, { id, name }];
    } else {
      newSelected = [
        ...selected.slice(0, selectedIndex),
        ...selected.slice(selectedIndex + 1),
      ];
    }
    setSelected(newSelected);
  };

  /**
   * Get repo details
   */
  const getDetails = async () => {
    setRepoDetails([]);
    setOpen(true);
    const repos = selected.map((item) => item.name).join();

    try {
      let url = `${config.api.baseUrl}/${repos}/details`;

      if (selected.length > 1) {
        url = `${config.api.baseUrl}${config.api.endpoints.reposBatch}?repos=${repos}`
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Repo not found');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        for (const item of data) {
          setRepoDetails((prev) => [...prev, item]);
        }
      } else {
        setRepoDetails([data]);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  /**
   * Check if the row is selected
   * @param {number} id 
   * @returns {Boolean}
   */
  const checkSelected = (id) => {
    return Boolean(selected.find((item) => item.id === id));
  }

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Repository Name',
    },
    {
      id: 'owner',
      numeric: false,
      disablePadding: true,
      label: 'Owner',
    },
    {
      id: 'size',
      numeric: true,
      disablePadding: true,
      label: 'Files',
    },
  ];

  const columns = [
    {
      field: 'name',
      renderCell: (row) => (
        <Typography variant="body1" fontWeight="bold">
          {row.name}
        </Typography>
      ),
    },
    {
      field: 'owner',
    },
    {
      field: 'size',
      align: 'right',
      renderCell: (row) => row.size.toLocaleString(),
    },
  ];

  return (
    <Paper sx={{ width: '100%', m: 3, p: 3 }}>
      {!!selected.length
        &&
        <>
          <Button
            startIcon={<DetailsTwoToneIcon></DetailsTwoToneIcon>}
            variant="contained"
            color="success"
            sx={{ m: 2 }}
            onClick={getDetails}
          >
            Show Details
          </Button>
          <RepoDetailsModal
            open={open}
            onClose={() => setOpen(false)}
            repoDetails={repoDetails}
            error={error}
          />
        </>}
      <MUIDataTable
        rows={repositories}
        columns={columns}
        headCells={headCells}
        loading={loading}
        error={error}
        tableName='Repositories'
        selected={selected}
        setSelected={setSelected}
        handleSelectAll={handleSelectAll}
        handleSelect={handleSelect}
        checkSelected={checkSelected}
      />
    </Paper>
  );
}

export default RepositoriesTable; 