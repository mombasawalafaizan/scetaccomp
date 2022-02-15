import { useState, useEffect } from 'react';
import {
	Button,
	Alert,
	TextField,
	CssBaseline,
	Link,
	Grid,
	Container,
	Typography,
} from '@mui/material';

// import { uploadFileToBlob, deleteBlob } from '../configureAzure';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { NavLink, useHistory } from 'react-router-dom';

import CustomAutocomplete from './Autocomplete';
import CustomDatePicker from './CustomDatePicker';
import FileComponent from './FileComponent';

import {
	type_of_article,
	article_status,
	published_in,
	article_level,
} from '../utils/autocomplete_lists';

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
	const {
		create = true,
		editable1,
		setEditable1,
		data = {
			title: 'faizan',
			date: '30/01/2015',
			type: 'Book Chapter',
			coauthor: 'Mehul Khatiwala',
			status: 'Published',
			published_in: 'Conference',
			publisher: 'IEEE',
			level: 'International',
			indexed_at: 'gorakhpur',
			isbn: 'E-323342',
			impact: '3.2342',
			date: '12/05/2020',
			name: 'aalu ki shaadi',
			research_paper: 'how to chheel aalu',
			certificate: 'abddd',
			outcome: 'kuchh bhi ni timepass hua',
			remarks: 'koi bhi mat jaaiyo',
			volume: 'Vol 69, issue 0',
			page_no: '3-43',
		},
	} = props;
	const classes = useStyles();

	const [articleType, setTypeOfArticle] = useState(data.type || '');
	const [title, setTitle] = useState(data.title || '');
	const [coauthor, setCoauthor] = useState(data.coauthor || '');
	const [status, setStatus] = useState(data.status || '');
	const [publishedIn, setPublishedIn] = useState(data.published_in || '');
	const [level, setLevel] = useState(data.level || '');
	const [indexedAt, setIndexedAt] = useState(data.indexed_at || '');
	const [ISBN, setISBN] = useState(data.isbn || '');
	const [impactFactor, setImpactFactor] = useState(data.impact || '');
	const [publicationDate, setPublicationDate] = useState(
		new Date(data.date) || null
	);
	const [conferenceName, setConferenceName] = useState(data.name || '');
	const [researchPaper, setResearchPaper] = useState();
	const [certificate, setCertificate] = useState();
	const [outcomes, setOutcomes] = useState(data.outcome || '');
	const [remarks, setRemarks] = useState(data.remarks || '');
	const [pageRange, setPageRange] = useState(data.page_no || '');
	const [volume, setVolume] = useState(data.volume || '');
	const [publisher, setPublisher] = useState(data.publisher || '');

	const [alertmsg, setAlertmsg] = useState('');
	const [alert, setAlert] = useState(false);
	const [success, setSuccess] = useState(false);

	const history = useHistory();
	const [editable, setEditable] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAlert(false);
		}, 5000);
	}, [alert, success]);
	async function onSubmitHandler(e) {
		e.preventDefault();
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
		let dd = publicationDate.getDate();
		let mm = publicationDate.getMonth() + 1;
		let yyyy = publicationDate.getFullYear();

		dd = dd < 10 ? '0' + dd : dd;
		mm = mm < 10 ? '0' + mm : mm;
		let date = dd + '/' + mm + '/' + yyyy;
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
			<button onClick={() => setEditable((e) => !e)}>Toggle</button>
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
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								disabled={!editable}
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
								value={conferenceName}
								onChange={(e) => setConferenceName(e.target.value)}
								disabled={!editable}
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
								value={coauthor}
								onChange={(e) => setCoauthor(e.target.value)}
								disabled={!editable}
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
								value={indexedAt}
								onChange={(e) => setIndexedAt(e.target.value)}
								disabled={!editable}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CustomAutocomplete
								id='articleType'
								options={type_of_article}
								label={'Article Type'}
								value={articleType}
								setValue={setTypeOfArticle}
								disabled={!editable}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CustomAutocomplete
								id='status'
								options={article_status}
								label={'Status of the article'}
								value={status}
								setValue={setStatus}
								disabled={!editable}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CustomAutocomplete
								id='published_in'
								options={published_in}
								label={'Published In'}
								value={publishedIn}
								setValue={setPublishedIn}
								disabled={!editable}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CustomAutocomplete
								id='article-level'
								options={article_level}
								label={'Level of Article'}
								value={level}
								setValue={setLevel}
								disabled={!editable}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4} lg={3}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='ISBN'
								label='ISBN Number'
								id='ISBN'
								value={ISBN}
								onChange={(e) => setISBN(e.target.value)}
								disabled={!editable}
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
								value={impactFactor}
								onChange={(e) => setImpactFactor(e.target.value)}
								disabled={!editable}
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
								value={volume}
								onChange={(e) => setVolume(e.target.value)}
								disabled={!editable}
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
								value={pageRange}
								onChange={(e) => setPageRange(e.target.value)}
								disabled={!editable}
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
								value={publisher}
								onChange={(e) => setPublisher(e.target.value)}
								disabled={!editable}
							/>
						</Grid>

						<Grid item xs={12} sm={4} md={4} lg={4}>
							<CustomDatePicker
								value={publicationDate}
								setValue={setPublicationDate}
								label={'Date of Publication'}
								disabled={!editable}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<FileComponent
								accept='.pdf'
								id='researchPaper'
								name='Research Paper'
								file={researchPaper}
								setFile={setResearchPaper}
								disabled={!editable}
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<FileComponent
								accept='image/*, .pdf'
								id='certificate'
								name='Certificate'
								file={certificate}
								setFile={setCertificate}
								disabled={!editable}
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
								value={outcomes}
								label='Outcome of the Event'
								name='outcomes'
								onChange={(e) => setOutcomes(e.target.value)}
								disabled={!editable}
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
								value={remarks}
								onChange={(e) => setRemarks(e.target.value)}
								disabled={!editable}
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
