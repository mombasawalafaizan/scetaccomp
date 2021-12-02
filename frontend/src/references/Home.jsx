import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: 3,
	},
	submit: {
		// margin: theme.spacing(3, 0, 2),
		margin: '4px',
	},
}));

const filter = createFilterOptions();

const Home = () => {
	const classes = useStyles();

	const [Lavel, setLavel] = React.useState(null);
	const [Description, setDescription] = React.useState('');
	const [EventDate, setEventDate] = React.useState(new Date('2017-01-01'));
	const [Catagory, setCatagory] = React.useState('');

	const handleChangeCatagory = (event) => {
		setCatagory(event.target.value);
	};
	const handleChangeDate = (newValue) => {
		setEventDate(newValue);
	};
	const handleChangeDescription = (event) => {
		setDescription(event.target.value);
	};
	const SubmitHandler = () => {
		console.log(Information);
	};

	const Information = {
		eventlavel: Lavel,
		eventdescription: Description,
		eventdate: EventDate,
		eventcatagory: Catagory,
	};

	// total 5 lavels
	const levels = [
		'Zonal',
		'Inter collage',
		'State',
		'National',
		'Inter National',
	];

	return (
		<>
			<Container
				component='main'
				maxWidth='xs'
				style={{ backgroundColor: 'white', borderRadius: '10px' }}
			>
				<div
					style={{ position: 'fixed', top: '10px', zIndex: 10, width: '20rem' }}
				></div>
				<div className={classes.paper}>
					<Typography component='h1' variant='h5'>
						Event Form
					</Typography>
					<form className={classes.form} noValidate>
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>Catagory</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={Catagory}
									label='Catagory'
									onChange={handleChangeCatagory}
								>
									<MenuItem value={'Technical'}>Technical</MenuItem>
									<MenuItem value={'NonTechnical'}>NonTechnical</MenuItem>
									<MenuItem value={'Sport'}>Sport</MenuItem>
								</Select>
							</FormControl>
						</Box>

						<br />
						<br />
						<Autocomplete
							value={Lavel}
							onChange={(event, newValue) => {
								if (typeof newValue === 'string') {
									setLavel(newValue);
								} else if (newValue && newValue.inputValue) {
									// Create a new value from the user input
									setLavel(newValue.inputValue);
								} else {
									setLavel(newValue);
								}
							}}
							filterOptions={(options, params) => {
								const filtered = filter(options, params);

								const { inputValue } = params;
								// Suggest the creation of a new value
								const isExisting = options.some(
									(option) => inputValue === option.title
								);
								if (inputValue !== '' && !isExisting) {
									filtered.push({
										inputValue,
										title: `Add "${inputValue}"`,
									});
								}

								return filtered;
							}}
							selectOnFocus
							clearOnBlur
							handleHomeEndKeys
							id='Level'
							options={levels}
							getOptionLabel={(option) => {
								// Value selected with enter, right from the input
								if (typeof option === 'string') {
									return option;
								}
								// Add "xxx" option created dynamically
								if (option.inputValue) {
									return option.inputValue;
								}
								// Regular option
								return option.title;
							}}
							renderOption={(props, option) => <li {...props}>{option}</li>}
							freeSolo
							renderInput={(params) => <TextField {...params} label='Level' />}
						/>

						<br />
						<br />

						<TextField
							id='outlined-multiline-flexible'
							label='Description'
							multiline
							rows={4}
							value={Description}
							onChange={handleChangeDescription}
							style={{ width: '100%' }}
						/>

						<br />
						<br />

						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								label='Event Date'
								value={EventDate}
								minDate={new Date('2017-01-01')}
								onChange={handleChangeDate}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						<br />
						<Button
							type='submit'
							fullWidth
							onClick={(e) => SubmitHandler(e)}
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							Submit
						</Button>
						<a href='http://localhost:1337/auth/google'>Login</a>
					</form>
				</div>
			</Container>
		</>
	);
};

export default Home;
