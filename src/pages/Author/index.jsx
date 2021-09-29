import React, { useEffect, useState } from 'react';
import tacGiaApi from 'src/API/tacGiaApi';
import Page from 'src/Component/Page';
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  IconButton,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { DataGrid } from '@mui/x-data-grid';
import { escapeRegExp } from 'src/ultils/escapRegExp';
import { useForm } from 'react-hook-form';
import InputText from 'src/Component/Form-control/InputText';
import { useSnackbar } from 'notistack';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Author() {
  const [data, setData] = useState([]);
  const [idtg, setIdtg] = useState('');
  const [filterData, setFilterData] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [count, setCount] = useState(0);
  const [hotentg, setHotentg] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm({
    defaultValues: {
      hotentg: '',
      diachi: '',
    },
  });

  const formEdit = useForm({
    defaultValues: {
      idtg: '',
      hotentg: '',
      diachi: '',
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e, r) => {
    if (r === 'backdropClick' || r === 'escapeKeyDown') return;
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = (e, r) => {
    if (r === 'backdropClick' || r === 'escapeKeyDown') return;
    setOpenDelete(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = (e, r) => {
    if (r === 'backdropClick' || r === 'escapeKeyDown') return;
    setOpenEdit(false);
  };

  useEffect(() => {
    (async () => {
      const res = await tacGiaApi.get();
      setData(res);
      setFilterData(res);
    })();
  }, [count]);

  const handleSubmit = async (value) => {
    try {
      await tacGiaApi.create(value);
      form.reset();
      enqueueSnackbar('Thêm thành công', { variant: 'success', autoHideDuration: 2000 });
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  const submitDelete = async () => {
    try {
      await tacGiaApi.delete(idtg);
      enqueueSnackbar('Xóa tác giả ' + hotentg + ' thành công', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      handleCloseDelete();
      setCount((e) => e + 1);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  const handleSubmitEdit = async (value) => {
    console.log(value);
  };
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

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },
    {
      field: 'hotentg',
      headerName: 'Họ và tên tác giả',
      width: 200,
    },

    {
      field: 'diachi',
      headerName: 'Địa chỉ',
      width: 300,
    },
    {
      field: 'action',
      headerName: 'Hành động',
      width: 200,
      renderCell: (params) => (
        <>
          <strong>
            <Button
              onClick={() => {
                handleClickOpenDelete();
                setHotentg(params.row.hotentg);
                setIdtg(params.row.id);
              }}
              startIcon={<Icon icon="fluent:delete-24-filled" color="#ff4444" />}
              size="small"
            >
              Xóa
            </Button>
            <Dialog open={openDelete} onClose={handleCloseDelete} TransitionComponent={Transition}>
              <DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleCloseDelete}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <Icon icon="majesticons:close" color="#6b7280" />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ m: 2, width: '26rem' }} textAlign="center">
                  <Typography variant="h5">Bạn muốn xóa: {hotentg}</Typography>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitDelete} variant="contained" sx={{ textTransform: 'none' }}>
                  Đồng ý
                </Button>
                <Button onClick={handleCloseDelete} sx={{ textTransform: 'none' }}>
                  Đóng
                </Button>
              </DialogActions>
            </Dialog>
          </strong>

          <strong>
            <Button
              onClick={() => {
                setTimeout(() => {
                  formEdit.setValue('hotentg', params.row.hotentg);
                  formEdit.setValue('diachi', params.row.diachi);
                }, 10);
                setIdtg(params.row.id);
                handleClickOpenEdit();
              }}
              startIcon={<Icon icon="eva:edit-2-fill" color="#33b5e5" />}
              size="small"
            >
              Sửa
            </Button>
          </strong>
        </>
      ),
    },
  ];

  const rows = [];

  filterData?.forEach((e) => {
    rows.push({
      id: e.idtg,
      hotentg: e.hotentg,
      diachi: e.dia_chi,
      action: e.id,
    });
  });

  return (
    <div>
      <Page title="Tác giả">
        <Typography color="primary" variant="h4" gutterBottom>
          Tác giả
        </Typography>

        <Box sx={{ my: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <TextField
              value={searchText}
              onChange={(e) => requestSearch(e.target.value)}
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
                    style={{ visibility: searchText ? 'visible' : 'hidden' }}
                    onClick={() => requestSearch('')}
                  >
                    <Icon icon="ic:outline-clear" color="#6b7280" />
                  </IconButton>
                ),
              }}
            />
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="primary"
              startIcon={<Icon icon="bi:plus-square-fill" color="#ffffff" />}
            >
              Thêm tác giả
            </Button>
          </Stack>
        </Box>
        <Box>
          <div style={{ height: 400, width: '100%' }}>
            <div style={{ height: 350, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </div>
          </div>
        </Box>
      </Page>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Icon icon="majesticons:close" color="#6b7280" />
          </IconButton>
        </DialogTitle>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogContent>
            <Stack sx={{ m: 2, width: '26rem' }}>
              <InputText fullWidth label="Họ và tên tác giả" name="hotentg" form={form} />
              <InputText fullWidth label="Địa chỉ" form={form} name="diachi" />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" sx={{ textTransform: 'none' }}>
              Thêm
            </Button>
            <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
              Đóng
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit} TransitionComponent={Transition}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseEdit}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Icon icon="majesticons:close" color="#6b7280" />
          </IconButton>
        </DialogTitle>
        <form onSubmit={formEdit.handleSubmit(handleSubmitEdit)}>
          <DialogContent>
            <Stack sx={{ m: 2, width: '26rem' }}>
              <InputText fullWidth label="Họ và tên tác giả" name="hotentg" form={formEdit} />
              <InputText fullWidth label="Địa chỉ" form={formEdit} name="diachi" />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" sx={{ textTransform: 'none' }}>
              Thêm
            </Button>
            <Button onClick={handleCloseEdit} sx={{ textTransform: 'none' }}>
              Đóng
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Author;
