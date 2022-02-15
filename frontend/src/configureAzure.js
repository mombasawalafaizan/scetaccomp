import { BlobServiceClient } from '@azure/storage-blob';

const containerName = process.env.REACT_APP_CONTAINERNAME;
const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;

export const isStorageConfigured = () => {
	return !storageAccountName || !sasToken ? false : true;
};

// Not a main feature for now
// const getBlobsInContainer = async (containerClient) => {
// 	const returnedBlobUrls = [];

// 	// get list of blobs in container
// 	// eslint-disable-next-line
// 	for await (const blob of containerClient.listBlobsFlat()) {
// 		// if image is public, just construct URL
// 		returnedBlobUrls.push(
// 			`https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
// 		);
// 	}

// 	return returnedBlobUrls;
// };

const getContainerClient = () => {
	// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
	const blobService = new BlobServiceClient(
		`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
	);

	// get Container - full public read access
	const containerClient = blobService.getContainerClient(containerName);

	return containerClient;
};

const createBlobInContainer = async (containerClient, file) => {
	// create blobClient for container
	const blob_name = new Date().getTime() + '_' + file.name;
	const blobClient = containerClient.getBlockBlobClient(blob_name);

	// set mimetype as determined from browser with file upload control
	const options = { blobHTTPHeaders: { blobContentType: file.type } };

	// upload file
	await blobClient.uploadData(file, options);

	return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob_name}`;
};

export const deleteBlob = async (url = '') => {
	const blob_name = url.substr(url.lastIndexOf('/') + 1);
	if (!blob_name) return false;
	const containerClient = getContainerClient();
	try {
		await containerClient.deleteBlob(blob_name);
		return true;
	} catch (error) {
		// console.log('from here', error);
		return false;
	}
};

export const uploadFileToBlob = async (file) => {
	if (!file) return null;

	const containerClient = getContainerClient();
	// upload file and get its url
	const file_url = await createBlobInContainer(containerClient, file);

	// return the url for the blob
	return file_url;
};
