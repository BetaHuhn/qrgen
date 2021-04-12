export default function(url) {
	if (!url.startsWith('http') && !url.startsWith('file') && !url.startsWith('ftp')) {
		return 'https://' + url
	}
	return url
}