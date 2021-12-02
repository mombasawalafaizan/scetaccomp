import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/lab/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import { NavLink, useHistory } from 'react-router-dom';

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
		marginTop: '20px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: '20px',
		backgroundColor: 'aqua',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: '20px',
	},
	submit: {
		margin: 3,
	},
}));

export default function Login() {
	const classes = useStyles();
	const [enrollment, setEnrollment] = React.useState('');
	const [password, setPassword] = React.useState('');
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

		if (password === '' || enrollment === '') {
			setAlert(true);
			setAlertmsg('Fill required details.');
			return;
		} else if (isNaN(enrollment)) {
			setAlert(true);
			setAlertmsg('Enter valid Enrollment');
			return;
		}

		let formData = {
			enrollment: enrollment,
			password: password,
		};

		try {
			var response = await fetch(
				'https://updates2k21-node.herokuapp.com/login',
				{
					method: 'POST',
					headers: {
						Accept: '*/*',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				}
			).then((res) => res.json());

			if (response.message === 'USER_NOT_EXIST') {
				setAlert(true);
				setAlertmsg('Seems like you are new. please sign up and try again.');
			} else if (response.message === 'LOGIN_SUCCESSFUL') {
				sessionStorage.setItem('token', response.token);
				setSuccess(true);
				setAlertmsg('Congrats! you are logged in.');
				setTimeout(() => {
					setSuccess(false);
				}, 3000);
				history.push('/');
			} else if (response.message === 'INVALID_PASSWORD') {
				setAlert(true);
				setAlertmsg('Invalid password');
			} else {
				setAlert(true);
				setAlertmsg('Please try again later. or Contact Co-ordinators');
			}
		} catch {
			setAlert(true);
			setAlertmsg('Oops! Something went wrong.');
		}
		console.log(response);
	}

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
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Login
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='enrollment'
								label='Enrollment'
								name='enrollment'
								onChange={(e) => setEnrollment(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								type='password'
								required
								fullWidth
								name='password'
								label='Password'
								id='Password'
								onChange={(e) => setPassword(e.target.value)}
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
						Login
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<NavLink to='/signup' variant='body2'>
								Don't have an account? Sign up
							</NavLink>
						</Grid>
					</Grid>
					<Grid className='my-3' container justifyContent='flex-end'>
						<Grid item>
							<NavLink to='/Contact' variant='body2'>
								In Trouble? Then Contact Us
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
