import { useMediaQuery, TextField } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DesktopDatePicker, MobileDatePicker } from '@mui/lab';
import inLocale from 'date-fns/locale/en-IN';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const CustomDatePicker = ({ value, setValue, label, disabled }) => {
	const mobileDevice = useMediaQuery('(max-width:576px)');
	return (
		<LocalizationProvider
			fullWidth
			dateAdapter={AdapterDateFns}
			locale={inLocale}
		>
			{mobileDevice ? (
				<MobileDatePicker
					label={label}
					disableFuture
					fullWidth
					value={value}
					minDate={new Date('2017-01-01')}
					onChange={(newValue) => {
						setValue(newValue);
					}}
					renderInput={(params) => (
						<TextField {...params} sx={{ width: '100%' }} />
					)}
					disabled={disabled}
				/>
			) : (
				<DesktopDatePicker
					label={label}
					disableFuture
					value={value}
					minDate={new Date('2017-01-01')}
					onChange={(newValue) => {
						setValue(newValue);
					}}
					renderInput={(params) => (
						<TextField {...params} sx={{ width: '100%' }} />
					)}
					disabled={disabled}
				/>
			)}
		</LocalizationProvider>
	);
};
export default CustomDatePicker;
