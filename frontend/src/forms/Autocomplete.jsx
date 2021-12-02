import { Autocomplete, TextField } from '@mui/material';

const CustomAutocomplete = ({
	id = '',
	label = 'Input',
	options = [],
	setValue,
	onChange,
	...params
}) => {
	return (
		<Autocomplete
			freeSolo
			id={id}
			disableClearable
			{...params}
			options={options}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					onChange={
						onChange ? (e) => onChange(e) : (e) => setValue(e.target.value)
					}
					InputProps={{
						...params.InputProps,
						type: 'search',
					}}
				/>
			)}
		/>
	);
};

export default CustomAutocomplete;
