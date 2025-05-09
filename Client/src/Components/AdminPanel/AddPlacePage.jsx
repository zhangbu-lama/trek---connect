import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { fetchPlaces, addPlace, updatePlace, deletePlace } from '../api/Place';
import { useCategories } from '../Hooks/useCategory';
import usePlaceStore from '../Store/placeStore';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
  Box,
  Grid,
} from '@mui/material';
import Layout from './Layout';

const AdminPlaces = () => {
  const queryClient = useQueryClient();
  const { filter, setFilter, selectedCategory, setSelectedCategory } = usePlaceStore();

  const { data: places = [], isLoading: placesLoading, error: placesError } = useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaces,
  });
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
    console.log(categories)

  const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      location: '',
      description: '',
      category: '',
      related_name: '',
      time_to_travel: '',
     image: null,
    },
  });

  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingPlace, setEditingPlace] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);

  useEffect(() => {
    console.log('Categories:', categories);
    console.log('Places:', places);
  }, [categories, places]);

  // Mutations
  const addMutation = useMutation({
    mutationFn: addPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
      reset();
      setOpenDialog(false);
      setImagePreview(null);
    },
    onError: (error) => {
      console.error('Add error:', error.response?.data || error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updatePlace(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
      reset();
      setOpenDialog(false);
      setEditingPlace(null);
      setImagePreview(null);
    },
    onError: (error) => {
      console.error('Update error:', error.response?.data || error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });
    },
    onError: (error) => {
      console.error('Delete error:', error.response?.data || error.message);
    },
  });

  
  const onSubmit = (data) => {
    console.log('Form data:', data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('location', data.location);
    formData.append('description', data.description);
    formData.append('category', data.category || '');
    formData.append('related_name', data.related_name || '');
    formData.append('time_to_travel', data.time_to_travel);
    if (data.image && data.image[0]) {
      formData.append('place_image', data.image[0]);
    }

    if (editingPlace) {
      updateMutation.mutate({ id: editingPlace._id, data: formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  // Open dialog for adding/editing
  const handleOpenDialog = (place = null) => {
    if (place) {
      setEditingPlace(place);
      setValue('name', place.name);
      setValue('location', place.location);
      setValue('description', place.description);
      setValue('category', place.category?._id || '');
      setValue('related_name', place.related_name || '');
      setValue('time_to_travel', place.time_to_travel);
      setImagePreview(place.image || null);
    } else {
      setEditingPlace(null);
      reset();
      setImagePreview(null);
    }
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const filteredPlaces = Array.isArray(places)
    ? places.filter((place) => {
        const matchesFilter = place.name.toLowerCase().includes(filter.toLowerCase());
        const matchesCategory = selectedCategory ? place.category?._id === selectedCategory : true;
        return matchesFilter && matchesCategory;
      })
    : [];

  if (placesLoading || categoriesLoading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (placesError) {
    return <Alert severity="error">Error loading places: {placesError.message}</Alert>;
  }

  if (categoriesError) {
    return <Alert severity="error">Error loading categories: {categoriesError.message}</Alert>;
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manage Places
        </Typography>

        {addMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error adding place: {addMutation.error.response?.data?.message || addMutation.error.message}
          </Alert>
        )}
        {updateMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error updating place: {updateMutation.error.response?.data?.message || updateMutation.error.message}
          </Alert>
        )}
        {deleteMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error deleting place: {deleteMutation.error.response?.data?.message || deleteMutation.error.message}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search by Name"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.length > 0 ? (
                  categories.map((cat, index) => (
                    <MenuItem key={cat._id ?? `cat-${index}`} value={cat._id ?? ''}>
                      {cat.name ?? 'Unnamed Category'}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No categories available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
          sx={{ mb: 3 }}
        >
          Add Place
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Related Name</TableCell>
                <TableCell>Time to Travel</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                  <TableRow key={place._id}>
                    <TableCell>{place.name}</TableCell>
                    <TableCell>{place.location}</TableCell>
                    <TableCell>{place.category?.name || 'No Category'}</TableCell>
                    <TableCell>{place.related_name || 'N/A'}</TableCell>
                    <TableCell>{place.time_to_travel}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleOpenDialog(place)}
                        sx={{ mr: 1 }}
                        disabled={addMutation.isLoading || updateMutation.isLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        onClick={() => handleDelete(place._id)}
                        disabled={deleteMutation.isLoading}
                      >
                        {deleteMutation.isLoading && deleteMutation.variables === place._id
                          ? <CircularProgress size={20} />
                          : 'Delete'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No places found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{editingPlace ? 'Edit Place' : 'Add Place'}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Name"
                {...register('name', {
                  required: 'Name is required',
                  maxLength: { value: 100, message: 'Name must be 100 characters or less' },
                })}
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Location"
                {...register('location', {
                  required: 'Location is required',
                  maxLength: { value: 100, message: 'Location must be 100 characters or less' },
                })}
                fullWidth
                margin="normal"
                error={!!errors.location}
                helperText={errors.location?.message}
              />
              <TextField
                label="Description"
                {...register('description', {
                  required: 'Description is required',
                })}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <FormControl fullWidth margin="normal" error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={value || ''}
                      onChange={(e) => {
                        console.log('Selected category:', e.target.value);
                        onChange(e.target.value);
                      }}
                      label="Category"
                    >
                      <MenuItem value="">None</MenuItem>
                      {categories.length > 0 ? (
                        categories.map((cat, index) => (
                          <MenuItem key={cat._id ?? `cat-${index}`} value={cat._id ?? ''}>
                            {cat.name ?? 'Unnamed Category'}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No categories available</MenuItem>
                      )}
                    </Select>
                  )}
                />
                {errors.category && (
                  <Typography color="error" variant="caption">
                    {errors.category.message}
                  </Typography>
                )}
              </FormControl>
              <TextField
                label="Related Name"
                {...register('related_name', {
                  maxLength: { value: 100, message: 'Related name must be 100 characters or less' },
                })}
                fullWidth
                margin="normal"
                error={!!errors.related_name}
                helperText={errors.related_name?.message}
              />
              <TextField
                label="Time to Travel"
                {...register('time_to_travel', {
                  required: 'Time to travel is required',
                  maxLength: { value: 50, message: 'Time to travel must be 50 characters or less' },
                })}
                fullWidth
                margin="normal"
                error={!!errors.time_to_travel}
                helperText={errors.time_to_travel?.message}
              />
              <Box sx={{ mt: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  {...register('image', {
                    required: editingPlace ? false : 'Image is required',
                  })}
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <Typography color="error" variant="caption">
                    {errors.image.message}
                  </Typography>
                )}
                {imagePreview && (
                  <Box mt={2}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '4px' }}
                    />
                  </Box>
                )}
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} disabled={addMutation.isLoading || updateMutation.isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              color="primary"
              disabled={addMutation.isLoading || updateMutation.isLoading}
            >
              {addMutation.isLoading || updateMutation.isLoading ? (
                <CircularProgress size={20} />
              ) : editingPlace ? (
                'Update'
              ) : (
                'Add'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default AdminPlaces;
