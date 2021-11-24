import { BlobServiceClient } from '@azure/storage-blob';

const containerName = process.env.REACT_APP_CONTAINERNAME;
const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;

export const isStorageConfigured = () => {
	return !storageAccountName || !sasToken ? false : true;
};

// Not a main feature for now
const getBlobsInContainer = async (containerClient) => {
	const returnedBlobUrls = [];

	// get list of blobs in container
	// eslint-disable-next-line
	for await (const blob of containerClient.listBlobsFlat()) {
		// if image is public, just construct URL
		returnedBlobUrls.push(
			`https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
		);
	}

	return returnedBlobUrls;
};

const createBlobInContainer = async (containerClient, file) => {
	// create blobClient for container
	const blobClient = containerClient.getBlockBlobClient(file.name);

	// set mimetype as determined from browser with file upload control
	const options = { blobHTTPHeaders: { blobContentType: file.type } };

	// upload file
	await blobClient.uploadData(file, options);
};

const uploadFileToBlob = async (file) => {
	if (!file) return [];

	// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
	const blobService = new BlobServiceClient(
		`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
	);

	// get Container - full public read access
	const containerClient = blobService.getContainerClient(containerName);

	// upload file
	await createBlobInContainer(containerClient, file);

	// get list of blobs in container
	return getBlobsInContainer(containerClient);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;
