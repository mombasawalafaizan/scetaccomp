import { useState, useEffect } from 'react';
import {
	Button,
	Alert,
	TextField,
	CssBaseline,
	Link,
	Grid,
	Typography,
} from '@mui/material';
import { uploadFileToBlob, deleteBlob } from '../configureAzure';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

import CustomAutocomplete from './Autocomplete';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import FileComponent from './FileComponent';

import { type_of_article } from '../utils/autocomplete_lists';

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

export default function Conference(props) {
	const { create = true } = props;
	const classes = useStyles();

	const [articleType, setTypeOfArticle] = useState('');
	const [title, setTitle] = useState('');
	const [coauthor, setCoauthor] = useState('');
	const [status, setStatus] = useState('');
	const [publishedIn, setPublishedIn] = useState('');
	const [level, setLevel] = useState('');
	const [indexedAt, setIndexedAt] = useState('');
	const [ISBN, setISBN] = useState('');
	const [impactFactor, setImpactFactor] = useState('');
	const [publicationDate, setPublicationDate] = useState(new Date());
	const [conferenceName, setConferenceName] = useState('');
	const [researchPaper, setResearchPaper] = useState();
	const [certificate, setCertificate] = useState();
	const [outcomes, setOutcomes] = useState('');
	const [remarks, setRemarks] = useState('');
	const [pageRange, setPageRange] = useState('');
	const [volume, setVolume] = useState('');
	const [publisher, setPublisher] = useState('');

	const [alertmsg, setAlertmsg] = useState('');
	const [alert, setAlert] = useState(false);
	const [success, setSuccess] = useState(false);

	const history = useHistory();

	useEffect(() => {
		setTimeout(() => {
			setAlert(false);
		}, 5000);
	}, [alert, success]);

	async function onSubmitHandler(e) {
		// if (
		// 	articleType === '' ||
		// 	title === '' ||
		// 	coauthor === '' ||
		// 	status === '' ||
		// 	publishedIn === '' ||
		// 	level === '' ||
		// 	indexedAt === '' ||
		// 	ISBN === '' ||
		// 	impactFactor === '' ||
		// 	conferenceName === '' ||
		// 	researchPaper === '' ||
		// 	certificate === '' ||
		// 	outcomes === '' ||
		// 	remarks === ''
		// ) {
		// 	setAlert(true);
		// 	setAlertmsg('Fill required details.');
		// 	return;
		// } else if (isNaN(ISBN)) {
		// 	setAlert(true);
		// 	setAlertmsg('Enter valid ISBN Number');
		// 	return;
		// } else if (isNaN(indexedAt)) {
		// 	setAlert(true);
		// 	setAlertmsg('indexed at should be in integer');
		// 	return;
		// } else if (isNaN(impactFactor)) {
		// 	setAlert(true);
		// 	setAlertmsg('impact factor should be Integer');
		// 	return;
		// }

		let formData = {
			email: '180420107033.co18s1@scet.ac.in',
			type: articleType,
			title: title,
			coauthor: coauthor,
			status: status,
			published_in: publishedIn,
			publisher: publisher,
			level: level,
			indexed_at: indexedAt,
			isbn: ISBN,
			impact: impactFactor,
			date: publicationDate,
			name: conferenceName,
			research_paper: researchPaper,
			certificate: certificate,
			outcome: outcomes,
			remarks: remarks,
			volume: volume,
			page_no: pageRange,
		};
		console.log('form data', formData);
		try {
			// form submission request is done here
		} catch {
			setAlert(true);
			setAlertmsg('Oops! Something went wrong.');
		}
		console.log(formData);
	}

	return (
		<Container
			component='main'
			// maxWidth='xs'
			style={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
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
					Conference Attended by Staff/ Paper Publication Details Entry Form
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='title'
								label='Title of the article'
								name='title'
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='conferenceName'
								label='Name of Conference/Journal'
								name='conferenceName'
								onChange={(e) => setConferenceName(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='coauthor'
								label='Name of Co-author/s'
								name='coauthor'
								onChange={(e) => setCoauthor(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='indexedAt'
								label='Indexed at'
								id='indexedAt'
								onChange={(e) => setIndexedAt(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CustomAutocomplete
								id='articleType'
								options={type_of_article}
								label={'Article Type'}
								setValue={setTypeOfArticle}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='Status-of-Article-label'>
										Status of Article
									</InputLabel>
									<Select
										labelId='status'
										id='status'
										value={status}
										label='Status of the Article'
										onChange={(event) => {
											setStatus(event.target.value);
										}}
									>
										<MenuItem value='Published'>Published</MenuItem>
										<MenuItem value='Presented'>Presented</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='Article-Published-In-label'>
										Published In
									</InputLabel>
									<Select
										labelId='Article-Published-In-label'
										id='Article-Published-In'
										value={publishedIn}
										label='Published In'
										onChange={(event) => {
											setPublishedIn(event.target.value);
										}}
									>
										<MenuItem value='Conference'>Conference</MenuItem>
										<MenuItem value='Journal'>Journal</MenuItem>
										<MenuItem value='Symposium'>Symposium</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<Box>
								<FormControl fullWidth required>
									<InputLabel id='Level-of-Article-label'>
										Level of an Article
									</InputLabel>
									<Select
										labelId='Level-of-Article-label'
										id='Level-of-Article'
										value={level}
										label='Level of an Article'
										onChange={(event) => {
											setLevel(event.target.value);
										}}
									>
										<MenuItem value='Published'>National</MenuItem>
										<MenuItem value='Presented'>International</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='ISBN'
								label='ISBN Number'
								id='ISBN'
								onChange={(e) => setISBN(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='impactFactor'
								label='Impact Factor'
								id='impactFactor'
								onChange={(e) => setImpactFactor(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='volume'
								label='Volume/Issue'
								id='volume'
								onChange={(e) => setVolume(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='pageRange'
								label='Page Range'
								id='pageRange'
								onChange={(e) => setPageRange(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12} sm={8} md={8} lg={8}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='publisher'
								label='Publisher'
								id='publisher'
								onChange={(e) => setPublisher(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12} sm={4} md={4} lg={4}>
							<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
								<DesktopDatePicker
									label='Date of Publication'
									fullWidth
									value={publicationDate}
									minDate={new Date('2017-01-01')}
									onChange={(newValue) => {
										setPublicationDate(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>

						<Grid item sm={12} md={6}>
							<FileComponent
								accept='.pdf'
								id='researchPaper'
								name='Research Paper'
								file={researchPaper}
								setFile={setResearchPaper}
							/>
						</Grid>

						<Grid item sm={12} md={6}>
							<FileComponent
								accept='image/*, .pdf'
								id='certificate'
								name='Certificate'
								file={certificate}
								setFile={setCertificate}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								multiline
								maxRows={5}
								required
								fullWidth
								id='outcomes'
								label='Outcome of the Event'
								name='outcomes'
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
								id='remarks'
								label='Other Important remarks'
								name='remarks'
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
