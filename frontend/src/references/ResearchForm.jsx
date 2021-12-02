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
		marginTop: 10,
	},
}));

const filter = createFilterOptions();

const ResearchForm = () => {
	const classes = useStyles();

	const [Publisher, setPublisher] = React.useState(null);
	const [ImpactFactor, setImpactFactor] = React.useState('');
	const [PublicationYear, setPublicationYear] = React.useState(new Date());
	const [PublishedIn, setPublishedIn] = React.useState('');
	const [Department, setDepartment] = React.useState('');
	const [Title, setTitle] = React.useState('');
	const [Conference, setConference] = React.useState('');
	const [ISSN, setISSN] = React.useState('');
	const [VolumeNo, setVolumeNo] = React.useState('');
	const [IssueNo, setIssueNo] = React.useState('');
	const [Formvalidate, setFormvalidate] = React.useState(true);

	const handleChangePublishedIn = (event) => {
		setPublishedIn(event.target.value);
	};
	const handleChangeDepartment = (event) => {
		setDepartment(event.target.value);
	};
	const handleChangePublicationYear = (newValue) => {
		setPublicationYear(newValue);
	};
	const handleChangeImpactFactor = (event) => {
		setImpactFactor(event.target.value);
	};
	const handleChangeTitle = (event) => {
		setTitle(event.target.value);
	};
	const handleChangeConference = (event) => {
		setConference(event.target.value);
	};
	const handleChangeISSN = (event) => {
		setISSN(event.target.value);
	};
	const handleChangeVolumeNo = (event) => {
		setVolumeNo(event.target.value);
	};
	const handleChangeIssueNo = (event) => {
		setIssueNo(event.target.value);
	};

	const validateForm = () => {
		if (Publisher === '') {
			setFormvalidate(false);
		}
		if (PublishedIn === '') {
			setFormvalidate(false);
		}
		if (Title === '') {
			setFormvalidate(false);
		}
		if (Department === null) {
			setFormvalidate(false);
		}
		if (Conference === null) {
			setFormvalidate(false);
		}
		if (ISSN === null) {
			setFormvalidate(false);
		}
		if (PublishedIn === 'Journal') {
			if (ImpactFactor === null) {
				setFormvalidate(false);
			}
			if (VolumeNo === null) {
				setFormvalidate(false);
			}
			if (IssueNo === null) {
				setFormvalidate(false);
			}
		}
		return Formvalidate;
	};

	const SubmitHandler = (event) => {
		event.preventDefault();
		if (validateForm()) {
			alert('form is submitted');
			console.log(Information);
		} else {
			alert('please fill all required fields');
		}
		setPublishedIn('');
		setDepartment('');
		setPublicationYear(new Date());
		setImpactFactor('');
		setTitle('');
		setConference('');
		setISSN('');
		setVolumeNo('');
		setIssueNo('');
	};

	const Information = {
		paperpublishedin: PublishedIn,
		publisher: Publisher,
		impactFactor: ImpactFactor,
		publicationyear: PublicationYear,
		papertitle: Title,
		department: Department,
		conferencename: Conference,
		volumenumber: VolumeNo,
		issnnumber: ISSN,
		issuenumber: IssueNo,
	};

	// total 5 lavels
	const publishers = ['National', 'Inter National'];

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
						Reaserch data Form
					</Typography>
					<form className={classes.form} noValidate>
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>
									Published in
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={PublishedIn}
									label='PublishedIn'
									onChange={handleChangePublishedIn}
								>
									<MenuItem value={'Journal'}>Journal</MenuItem>
									<MenuItem value={'Conference'}>Conference</MenuItem>
								</Select>
							</FormControl>
						</Box>

						<br />
						<br />
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>
									Department
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={Department}
									label='Department'
									onChange={handleChangeDepartment}
								>
									<MenuItem value={'CO'}>CO</MenuItem>
									<MenuItem value={'IT'}>IT</MenuItem>
									<MenuItem value={'EC'}>EC</MenuItem>
									<MenuItem value={'IC'}>IC</MenuItem>
									<MenuItem value={'ENVIRONMENT'}>ENVIRONMENT</MenuItem>
									<MenuItem value={'TT'}>TT</MenuItem>
									<MenuItem value={'MECHANICAL'}>MECHANICAL</MenuItem>
									<MenuItem value={'MCA'}>MCA</MenuItem>
									<MenuItem value={'CIVIL'}>CIVIL</MenuItem>
									<MenuItem value={'ARCHITECTURE'}>ARCHITECTURE</MenuItem>
								</Select>
							</FormControl>
						</Box>

						<br />
						<br />
						<TextField
							required='true'
							id='title'
							label='Title Of Reasearch Paper'
							multiline
							rows={2}
							value={Title}
							onChange={handleChangeTitle}
							style={{ width: '100%' }}
						/>

						<br />
						<br />
						<TextField
							required
							id='Conference'
							label='Conference Name'
							value={Conference}
							onChange={handleChangeConference}
							style={{ width: '100%' }}
						/>

						<br />
						<br />

						<Autocomplete
							value={Publisher}
							onChange={(event, newValue) => {
								if (typeof newValue === 'string') {
									setPublisher(newValue);
								} else if (newValue && newValue.inputValue) {
									// Create a new value from the user input
									setPublisher(newValue.inputValue);
								} else {
									setPublisher(newValue);
								}
							}}
							filterOptions={(options, params) => {
								console.log(params);
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
							id='Publisher'
							options={publishers}
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
							renderInput={(params) => (
								<TextField {...params} label='Publisher' />
							)}
						/>

						<br />
						<br />
						<TextField
							required
							id='ISSN'
							label='ISSN Number'
							value={ISSN}
							onChange={handleChangeISSN}
							style={{ width: '100%' }}
						/>

						<br />
						<br />
						{PublishedIn === 'Journal' && (
							<div>
								<TextField
									required
									id='ImpactFactor'
									label='Impact Factor'
									value={ImpactFactor}
									onChange={handleChangeImpactFactor}
									style={{ width: '100%' }}
								/>
								<br />
								<br />
								<TextField
									required
									id='VolumeNo'
									label='Volume No'
									value={VolumeNo}
									onChange={handleChangeVolumeNo}
									style={{ width: '100%' }}
								/>
								<br />
								<br />
								<TextField
									required
									id='IssueNo'
									label='Issue No'
									value={IssueNo}
									onChange={handleChangeIssueNo}
									style={{ width: '100%' }}
								/>
								<br />
								<br />
							</div>
						)}

						<LocalizationProvider dateAdapter={AdapterDateFns}>
							{/* <DatePicker
          disableFuture
          label="Responsive"
          openTo="year"
          views={['year']}
          value={PublicationYear}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
        /> */}
							<DesktopDatePicker
								label='Event Date'
								value={PublicationYear}
								minDate={new Date('2017-01-01')}
								onChange={handleChangePublicationYear}
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
					</form>
				</div>
			</Container>
		</>
	);
};

export default ResearchForm;
