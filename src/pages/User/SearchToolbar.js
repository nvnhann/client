import { Icon } from '@iconify/react';
import { TextField, IconButton, Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

SearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

function SearchToolbar(props) {
  return (
    <Box sx={{ my: 3 }}>
      <TextField
        value={props.value}
        onChange={props.onChange}
        sx={{ width: '40ch' }}
        variant="standard"
        placeholder="Tìm kiếm ..."
        InputProps={{
          startAdornment: (
            <IconButton>
              <Icon icon="bi:search" color="#6b7280" />
            </IconButton>
          ),
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <Icon icon="ic:outline-clear" color="#6b7280" />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}

export default SearchToolbar;
