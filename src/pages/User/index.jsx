import Page from '../../Component/Page';
import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import userAPI from '../../API/userAPI';
import { DataGrid } from '@mui/x-data-grid';
import { Icon } from '@iconify/react';
import SearchToolbar from './SearchToolbar';

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default function User() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilterData] = useState(data);

  const requestSearch = (searchValue) => {
    if (searchValue === '') {
      setSearchText(searchValue);
      return setFilterData(data);
    }
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    return setFilterData(filteredRows);
  };

  useEffect(() => {
    (async () => {
      const res = await userAPI.getAll();
      setData(res);
      setFilterData(res);
    })();
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'ho',
      headerName: 'Họ',
      width: 120,
    },
    {
      field: 'ten',
      headerName: 'Tên',
      width: 120,
    },
    {
      field: 'sdt',
      headerName: 'Số điện thoại',
      width: 150,
    },
    {
      field: 'diachi',
      headerName: 'Địa chỉ',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            onClick={() => console.log(params.row.ten)}
            startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444" />}
            size="small"
          >
            Xóa
          </Button>
        </strong>
      ),
    },
  ];
  const rows = [];
  filterData?.forEach((e) => {
    rows.push({
      id: e.id,
      email: e.email,
      ho: e.ho,
      ten: e.ten,
      sdt: e.sdt,
      diachi: e.diachi,
      action: e.id,
    });
  });
  return (
    <Page title="User">
      <Typography color="primary" variant="h4" gutterBottom>
        User
      </Typography>
      <Box>
        <div style={{ height: 400, width: '100%' }}>
          <div style={{ height: 350, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{ Toolbar: SearchToolbar }}
              componentsProps={{
                toolbar: {
                  value: searchText,
                  onChange: (event) => requestSearch(event.target.value),
                  clearSearch: () => requestSearch(''),
                },
              }}
            />
          </div>
        </div>
      </Box>
    </Page>
  );
}
