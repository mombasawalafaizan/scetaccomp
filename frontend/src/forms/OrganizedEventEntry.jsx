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
	submit: {
		marginTop: 10,
	},
}));

export default function OrganizedEventEntry() {
	const classes = useStyles();

	const [TypeOfEvent, setTypeOfEvent] = React.useState('');
	const [Title, setTitle] = React.useState('');
	const [SponsoringBody, setSponsoringBody] = React.useState('');
	const [Student_Part_No, setStudent_Part_No] = React.useState('');
	const [Faculty_Part_No, setFaculty_Part_No] = React.useState('');
	const [ExpertName, setExpertName] = React.useState('');
	const [ExpertAffiliation, setExpertAffiliation] = React.useState('');
	const [ExpertEmail, setExpertEmail] = React.useState('');
	const [ExpertContact, setExpertContact] = React.useState('');
	const [VanueOfEvent, setVanueOfEvent] = React.useState('');
	const [EventDuration, setEventDuration] = React.useState('');
	const [FacultyCoordinator, setFacultyCoordinator] = React.useState('');
	const [EventReport, setEventReport] = React.useState('');
	const [EventPicture, setEventPicture] = React.useState('');
	const [Outcomes, setOutcomes] = React.useState('');
	const [Remarks, setRemarks] = React.useState('');

	const [alertmsg, setAlertmsg] = React.useState('');
	const [alert, setAlert] = React.useState(false);
	const [success, setSuccess] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setAlert(false);
		}, 5000);
	}, [alert, success]);

	async function onSubmitHandler(e) {
		e.preventDefault();

		if (
			TypeOfEvent === '' ||
			Title === '' ||
			SponsoringBody === '' ||
			ExpertName === '' ||
			ExpertAffiliation === '' ||
			ExpertEmail === '' ||
			ExpertContact === '' ||
			VanueOfEvent === '' ||
			EventDuration === '' ||
			FacultyCoordinator === '' ||
			EventReport === '' ||
			EventPicture === '' ||
			Outcomes === '' ||
			Remarks === ''
		) {
			setAlert(true);
			setAlertmsg('Fill required details.');
			return;
		} else if (isNaN(Student_Part_No)) {
			setAlert(true);
			setAlertmsg('Enter student participants number in Integer');
			return;
		} else if (isNaN(Faculty_Part_No)) {
			setAlert(true);
			setAlertmsg('Enter faculty participants number in Integer');
			return;
		} else if (isNaN(ExpertContact) || ExpertContact.length !== 10) {
			setAlert(true);
			setAlertmsg('Enter valid mobile number');
			return;
		} else if (isNaN(EventDuration)) {
			setAlert(true);
			setAlertmsg('Enter event duration in digit');
			return;
		}

		let formData = {
			TypeOfEvent: TypeOfEvent,
			Title: Title,
			SponsoringBody: SponsoringBody,
			Student_Part_No: Student_Part_No,
			Faculty_Part_No: Faculty_Part_No,
			ExpertName: ExpertName,
			ExpertAffiliation: ExpertAffiliation,
			ExpertEmail: ExpertEmail,
			ExpertContact: ExpertContact,
			VanueOfEvent: VanueOfEvent,
			EventDuration: EventDuration,
			FacultyCoordinator: FacultyCoordinator,
			EventReport: EventReport,
			EventPicture: EventPicture,
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
					Organized Event Entry
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
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
								name='Student_Part_No'
								label='Total Number Of Student Participants'
								id='Student_Part_No'
								onChange={(e) => setStudent_Part_No(e.target.value)}
							/>
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
							<TextField
								variant='outlined'
								required
								fullWidth
								id='ExpertName'
								label='Name of the Expert'
								name='ExpertName'
								onChange={(e) => setExpertName(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='ExpertAffiliation'
								label='Affiliation of the Expert'
								name='ExpertAffiliation'
								onChange={(e) => setExpertAffiliation(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='ExpertEmail'
								label='Email Id of the Expert'
								name='ExpertEmail'
								onChange={(e) => setExpertEmail(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='ExpertContact'
								label='Contact number of the Expert'
								name='ExpertContact'
								onChange={(e) => setExpertContact(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='Vanue-of-event-label'>
										Vanue of Event
									</InputLabel>
									<Select
										labelId='Vanue-of-event-label'
										id='Vanue-of-event'
										value={VanueOfEvent}
										label='Vanue of the Event'
										onChange={(event) => {
											setVanueOfEvent(event.target.value);
										}}
									>
										<MenuItem value={'Expert Talk / Guest Lecture'}>
											Class Rooms
										</MenuItem>
										<MenuItem value={'NJ Seminar Hall'}>
											NJ Seminar Hall
										</MenuItem>
										<MenuItem value={'EC Multimedia Room'}>
											EC Multimedia Room
										</MenuItem>
										<MenuItem value={'IC Multimedia Room'}>
											IC Multimedia Room
										</MenuItem>
										<MenuItem value={'Tifac Seminar Hall'}>
											Tifac Seminar Hall
										</MenuItem>
										<MenuItem value={'Taramoti Hall'}>Taramoti Hall</MenuItem>
									</Select>
								</FormControl>
							</Box>
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
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='faculty-coordinator-label'>
										Name of The Faculty Co-ordinator
									</InputLabel>
									<Select
										labelId='faculty-coordinator-label'
										id='faculty-coordinator'
										value={FacultyCoordinator}
										label='Name of The Faculty Co-ordinator'
										onChange={(event) => {
											setFacultyCoordinator(event.target.value);
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
							<input
								accept='.pdf'
								style={{ display: 'none' }}
								id='EventReport'
								onChange={(e) => {
									setEventReport(e.target.files[0]);
								}}
								type='file'
							/>
							<InputLabel
								htmlFor='EventReport'
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
									{EventReport === '' ? (
										<span style={{ fontSize: '16px', marginLeft: '10px' }}>
											Report of the Event
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
											{EventReport.name}
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
								Files Should in .pdf format
							</p>
						</Grid>

						<Grid item xs={12}>
							<input
								accept='image/*'
								style={{ display: 'none' }}
								id='EventPicture'
								onChange={(e) => {
									setEventPicture(e.target.files[0]);
								}}
								type='file'
							/>
							<InputLabel
								htmlFor='EventPicture'
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
									{EventPicture === '' ? (
										<span style={{ fontSize: '16px', marginLeft: '10px' }}>
											Picture of the Event
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
											{EventPicture.name}
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
								Files Should in .jpg/.jpeg format
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
						className={classes.submit}
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
