import axios from 'axios';
import { useState, useEffect } from 'react';

// A custom hook for sending all type of requests
// Params:
// url: String (API url)
// method: HTTP method
// details: (In case of POST/PUT methods, sending object)
// send: Used for sending requests only on certain conditions)
const useApi = (url = '', method = 'GET', details = null, send = true) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (send) {
			const cancelToken = axios.CancelToken;
			const source = cancelToken.source();

			axios({
				method: method,
				url: url,
				data: details,
				cancelToken: source.token,
			})
				.then((response) => {
					if (response.status >= 200 && response.status <= 299) {
						setData(response.data);
					}
					setIsLoading(false);
				})
				.catch((err) => {
					if (!axios.isCancel(err)) {
						setError({
							status: err.response.status,
							message: err.response.data.message,
						});
					}
					setIsLoading(false);
				});

			return () => source.cancel('Axios request cancelled');
		} else {
			// If have to send more than one request then, we have to update states to default
			setIsLoading(true);
			setData(null);
			setError(null);
		}
	}, [url, method, details, send]);

	return { data, isLoading, error };
};

export default useApi;
