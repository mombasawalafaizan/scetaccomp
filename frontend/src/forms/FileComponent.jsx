import { InputLabel, IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const FileComponent = ({
	accept = '',
	id = '',
	name = '',
	file,
	setFile,
	onChange = null,
	customStyles = {},
}) => {
	return (
		<div className='custom-file-component' style={customStyles}>
			<input
				accept={accept}
				style={{ display: 'none' }}
				id={id}
				onChange={
					onChange
						? (e) => onChange(e)
						: (e) => {
								setFile(e.target.files[0]);
						  }
				}
				type='file'
			/>
			<InputLabel
				htmlFor={id}
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
					style={{ marginTop: '5px' }}
				>
					<UploadIcon />
					{!file ? (
						<span
							style={{
								fontSize: '16px',
								marginLeft: '10px',
								marginBottom: '3px',
							}}
						>
							Attach {name ? name : 'file'}
						</span>
					) : (
						<span
							style={{
								fontSize: '16px',
								marginLeft: '10px',
								marginBottom: '3px',
								border: 'solid',
								borderColor: '#1550c0',
								borderRadius: '4px',
								borderWidth: 'thin',
								color: 'blue',
								padding: '1px 5px',
							}}
						>
							{file.name}
						</span>
					)}
				</IconButton>
			</InputLabel>
			{/* <p
				style={{
					color: 'red',
					marginTop: '0px',
					fontSize: '12px',
					marginLeft: '10px',
				}}
			>
				Files Should in .pdf format
			</p> */}
		</div>
	);
};

export default FileComponent;
