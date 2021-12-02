import React from 'react';
import {
	Button,
	Alert,
	TextField,
	CssBaseline,
	Link,
	Grid,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://scet.ac.in/'>
				Scet
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: 1,
		backgroundColor: 'white',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: 3,
	},
}));

export default function EventAttendedByStaff() {
	const classes = useStyles();

	const [FacultyName, setFacultyName] = React.useState('');
	const [FacultyDesignation, setFacultyDesignation] = React.useState('');
	const [TypeOfEvent, setTypeOfEvent] = React.useState('');
	const [Title, setTitle] = React.useState('');
	const [SponsoringBody, setSponsoringBody] = React.useState('');
	const [Faculty_Part_No, setFaculty_Part_No] = React.useState('');
	const [EventDate, setEventDate] = React.useState(new Date());
	const [EventDuration, setEventDuration] = React.useState('');
	const [HostInstitute, setHostInstitute] = React.useState('');
	const [Certificate, setCertificate] = React.useState('');
	const [Outcomes, setOutcomes] = React.useState('');
	const [Remarks, setRemarks] = React.useState('');

	const [alertmsg, setAlertmsg] = React.useState('');
	const [alert, setAlert] = React.useState(false);
	const [success, setSuccess] = React.useState(false);

	const history = useHistory();

	React.useEffect(() => {
		setTimeout(() => {
			setAlert(false);
		}, 5000);
	}, [alert, success]);

	async function onSubmitHandler(e) {
		e.preventDefault();

		if (
			FacultyName === '' ||
			FacultyDesignation === '' ||
			Faculty_Part_No === '' ||
			TypeOfEvent === '' ||
			Title === '' ||
			SponsoringBody === '' ||
			EventDuration === '' ||
			HostInstitute === '' ||
			Certificate === '' ||
			Outcomes === '' ||
			Remarks === ''
		) {
			setAlert(true);
			setAlertmsg('Fill required details.');
			return;
		} else if (isNaN(Faculty_Part_No)) {
			setAlert(true);
			setAlertmsg('Enter faculty participants number in Integer');
			return;
		} else if (isNaN(EventDuration)) {
			setAlert(true);
			setAlertmsg('Enter event duration in digit');
			return;
		}

		let formData = {
			FacultyName: FacultyName,
			FacultyDesignation: FacultyDesignation,
			TypeOfEvent: TypeOfEvent,
			Title: Title,
			SponsoringBody: SponsoringBody,
			Faculty_Part_No: Faculty_Part_No,
			EventDate: EventDate,
			EventDuration: EventDuration,
			HostInstitute: HostInstitute,
			Certificate: Certificate,
			Outcomes: Outcomes,
			Remarks: Remarks,
		};

		try {
			// form submission request is done here
		} catch {
			setAlert(true);
			setAlertmsg('Oops! Something went wrong.');
		}
		console.log(formData);
	}

	console.log(Certificate);

	const faculty = [
		'prof. (Dr.) Keyur Rana',
		'prof. (Dr.) Pariza Kamboj',
		'prof. (Dr.) Mayuri Mehta',
		'prof. Dipali Kasat',
		'prof. Snehal Gandhi',
		'prof. Bintu Kadhiwala',
		'prof. Urmi Desai',
		'prof. Bhumika Shah',
		'prof. Jaydeep Gheewala',
		'prof. Jayesh Chaudhari',
		'prof. Rakesh Patel',
		'prof. Dhatri Pandya',
		'prof. Bhavesh Patel',
		'prof. Purvi Rekh',
		'prof. Vasundhara Uchhala',
		'prof. Jaydeep Barad',
		'prof. Fagun Vankawala',
		'prof. (Dr.) Nirali Nanavati',
		'prof. Vandana Joshi',
		'Ms. Urvashi Mistry',
		'Ms. Karuna Patel',
		'Ms. Mitisha Patel',
	];

	const faculty_dasignation = [
		'Professor',
		'Associate Professor',
		'Assistant Professor',
		'Adhoc Assistant Professor',
		'Lab Assistant',
		'Adhoc Lab Assistant',
	];

	return (
		<Container
			component='main'
			maxWidth='xs'
			style={{ backgroundColor: 'white', borderRadius: '10px' }}
		>
			<div
				style={{ position: 'fixed', top: '10px', zIndex: 10, width: '20rem' }}
			>
				{alert && <Alert severity='error'>{alertmsg}</Alert>}
				{success && <Alert severity='success'>{alertmsg}</Alert>}
			</div>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Events Attended by Staff Entry
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='faculty-label'>
										Name of The Faculty Member
									</InputLabel>
									<Select
										labelId='faculty-label'
										id='faculty'
										value={FacultyName}
										label='Name of The Faculty Member'
										onChange={(event) => {
											setFacultyName(event.target.value);
										}}
									>
										{faculty.map((val) => {
											return <MenuItem value={val}>{val}</MenuItem>;
										})}
									</Select>
								</FormControl>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='faculty-designation-label'>
										Designation of the Faculty Member
									</InputLabel>
									<Select
										labelId='faculty-designation-label'
										id='faculty-designation'
										value={FacultyDesignation}
										label='Designation of the Faculty Member'
										onChange={(event) => {
											setFacultyDesignation(event.target.value);
										}}
									>
										{faculty_dasignation.map((val) => {
											return <MenuItem value={val}>{val}</MenuItem>;
										})}
									</Select>
								</FormControl>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='type-of-event-label'>
										Type of the Event
									</InputLabel>
									<Select
										labelId='type-of-event-label'
										id='type-of-event'
										value={TypeOfEvent}
										label='Type of the Event'
										onChange={(event) => {
											setTypeOfEvent(event.target.value);
										}}
									>
										<MenuItem value={'Expert Talk / Guest Lecture'}>
											Expert Talk / Guest Lecture
										</MenuItem>
										<MenuItem value={'Workshop'}>Workshop</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='Title'
								label='Title of the Event'
								name='Title'
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='sponsoring-body-label'>
										Sponsoring Body
									</InputLabel>
									<Select
										labelId='sponsoring-body-label'
										id='sponsoring-body'
										value={SponsoringBody}
										label='Sponsoring Body'
										onChange={(event) => {
											setSponsoringBody(event.target.value);
										}}
									>
										<MenuItem value={'Expert Talk / Guest Lecture'}>
											CSI Student Chapter
										</MenuItem>
										<MenuItem value={'ISTE'}>ISTE</MenuItem>
										<MenuItem value={'AICTE'}>AICTE</MenuItem>
										<MenuItem value={'MHRD'}>MHRD</MenuItem>
										<MenuItem value={'GUJCOST'}>GUJCOST</MenuItem>
										<MenuItem value={'SCETAA'}>SCETAA</MenuItem>
										<MenuItem value={'SCET'}>SCET</MenuItem>
										<MenuItem value={'Computer Engineering Department'}>
											Computer Engineering Department
										</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='Faculty_Part_No'
								label='Total Number Of Faculty Participants'
								id='Faculty_Part_No'
								onChange={(e) => setFaculty_Part_No(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
								<DesktopDatePicker
									label='Date of Event'
									fullWidth
									value={EventDate}
									minDate={new Date('2017-01-01')}
									onChange={(newValue) => {
										setEventDate(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='EventDuration'
								label='Duration of Event'
								name='EventDuration'
								onChange={(e) => setEventDuration(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='HostInstitute'
								label='Name of the Host Institute'
								name='HostInstitute'
								onChange={(e) => setHostInstitute(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<input
								accept='image/*,.pdf'
								style={{ display: 'none' }}
								id='Certificate'
								onChange={(e) => {
									setCertificate(e.target.files[0]);
								}}
								type='file'
							/>
							<InputLabel
								htmlFor='Certificate'
								style={{
									height: '55px',
									border: 'solid',
									borderColor: 'rgb(179 175 175 / 60%)',
									borderRadius: '4px',
									borderWidth: 'thin',
								}}
							>
								<IconButton
									color='primary'
									component='span'
									style={{ marginTop: '7px' }}
								>
									<UploadIcon />
									{Certificate === '' ? (
										<span style={{ fontSize: '16px', marginLeft: '10px' }}>
											Certificate of Event
										</span>
									) : (
										<span
											style={{
												fontSize: '16px',
												marginLeft: '10px',
												border: 'solid',
												borderColor: '#1550c0',
												borderRadius: '4px',
												borderWidth: 'medium',
												color: 'red',
												padding: '1px 5px',
											}}
										>
											{Certificate.name}
										</span>
									)}
								</IconButton>
							</InputLabel>
							<p
								style={{
									color: 'red',
									marginTop: '0px',
									fontSize: '12px',
									marginLeft: '10px',
								}}
							>
								Files Should in .jpg/.jpeg/.pdf format
							</p>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								multiline
								maxRows={5}
								required
								fullWidth
								id='Outcomes'
								label='Outcome of the Event'
								name='Outcomes'
								onChange={(e) => setOutcomes(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								multiline
								maxRows={5}
								required
								fullWidth
								id='Remarks'
								label='Other Important Remarks'
								name='Remarks'
								onChange={(e) => setRemarks(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						onClick={(e) => onSubmitHandler(e)}
						variant='contained'
						color='primary'
						style={{ marginTop: '10px' }}
					>
						Submit
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<NavLink to='/signup' variant='body2'>
								Any query than contact
							</NavLink>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
