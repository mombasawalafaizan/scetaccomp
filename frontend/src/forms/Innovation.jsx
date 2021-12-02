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

export default function Innovation() {
	const classes = useStyles();

	const [TypeOfEvent, setTypeOfEvent] = React.useState('');
	const [Title, setTitle] = React.useState('');
	const [EventDate, setEventDate] = React.useState(new Date());
	const [SponsoringBody, setSponsoringBody] = React.useState('');
	const [HostOrganization, setHostOrganization] = React.useState('');
	const [EventLavel, setEventLavel] = React.useState('');
	const [EventVanue, setEventVanue] = React.useState('');
	const [AwardDetails, setAwardDetails] = React.useState('');
	const [EventDuration, setEventDuration] = React.useState('');
	const [Outcomes, setOutcomes] = React.useState('');
	const [Remarks, setRemarks] = React.useState('');
	const [Certificate, setCertificate] = React.useState('');
	const [EventPicture, setEventPicture] = React.useState('');

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
			TypeOfEvent === '' ||
			Title === '' ||
			SponsoringBody === '' ||
			HostOrganization === '' ||
			EventLavel === '' ||
			EventVanue === '' ||
			AwardDetails === '' ||
			EventDuration === '' ||
			Outcomes === '' ||
			Remarks === '' ||
			Certificate === '' ||
			EventPicture === ''
		) {
			setAlert(true);
			setAlertmsg('Fill required details.');
			return;
		} else if (isNaN(EventVanue)) {
			setAlert(true);
			setAlertmsg('Enter faculty participants number in Integer');
			return;
		}

		let formData = {
			TypeOfEvent: TypeOfEvent,
			Title: Title,
			EventDate: EventDate,
			SponsoringBody: SponsoringBody,
			HostOrganization: HostOrganization,
			EventLavel: EventLavel,
			EventVanue: EventVanue,
			AwardDetails: AwardDetails,
			EventDuration: EventDuration,
			Outcomes: Outcomes,
			Remarks: Remarks,
			Certificate: Certificate,
			EventPicture: EventPicture,
		};

		try {
			// form submission request is done here
		} catch {
			setAlert(true);
			setAlertmsg('Oops! Something went wrong.');
		}
		console.log(formData);
	}

	const lavel = [
		'National Lavel',
		'Intercollage Lavel',
		'Collage Lavel',
		'Zonal Lavel',
		'State Lavel',
		'Department Lavel',
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
					Innovation/New Initiatives
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
								id='HostOrganization'
								label='Name of the Host Organization'
								name='HostOrganization'
								onChange={(e) => setHostOrganization(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='event-lavel-label'>Lavel of Event</InputLabel>
									<Select
										labelId='event-lavel-label'
										id='event-lavel'
										value={EventLavel}
										label='Lavel of Event'
										onChange={(event) => {
											setEventLavel(event.target.value);
										}}
									>
										{lavel.map((val) => {
											return <MenuItem value={val}>{val}</MenuItem>;
										})}
									</Select>
								</FormControl>
							</Box>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='EventVanue'
								label='Vanue of Event'
								id='EventVanue'
								onChange={(e) => setEventVanue(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								multiline
								maxRows={5}
								required
								fullWidth
								id='AwardDetails'
								label='Award Details'
								name='AwardDetails'
								onChange={(e) => setAwardDetails(e.target.value)}
							/>
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
