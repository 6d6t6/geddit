document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('download-btn');
    const urlInput = document.getElementById('url-input');

    downloadBtn.addEventListener('click', async function () {
        const urls = urlInput.value.trim().split('\n').filter(url => url.trim() !== '');
        if (urls.length === 0) {
            alert('Please enter at least one valid URL.');
            return;
        }
        for (const url of urls) {
            const parsedUrl = parseUrl(url);
            await downloadImage(parsedUrl);
        }
    });

    function parseUrl(url) {
        const questionMarkIndex = url.indexOf('?');
        return questionMarkIndex !== -1 ? url.slice(0, questionMarkIndex) : url;
    }

    async function downloadImage(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const filename = 'geddit.jpg';
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = filename;
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    }
});
