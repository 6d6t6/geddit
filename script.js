document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('download-btn');
    const urlInput = document.getElementById('url-input');

    downloadBtn.addEventListener('click', async function () {
        const urls = urlInput.value.trim().split('\n').filter(url => url.trim() !== '');
        if (urls.length === 0) {
            alert('Please enter at least one valid URL.');
            return;
        }
        if (urls.length === 1) {
            const parsedUrl = parseUrl(urls[0]);
            await downloadImage(parsedUrl);
        } else {
            const zipFileName = 'geddit.zip';
            const zip = new JSZip();
            for (let i = 0; i < urls.length; i++) {
                const parsedUrl = parseUrl(urls[i]);
                const blob = await fetchImage(parsedUrl);
                zip.file(`image${i+1}.jpg`, blob);
            }
            zip.generateAsync({type:"blob"}).then(function(content) {
                saveAs(content, zipFileName);
            });
        }
    });

    function parseUrl(url) {
        const questionMarkIndex = url.indexOf('?');
        return questionMarkIndex !== -1 ? url.slice(0, questionMarkIndex) : url;
    }

    async function fetchImage(url) {
        const response = await fetch(url);
        return await response.blob();
    }

    async function downloadImage(url) {
        try {
            const blob = await fetchImage(url);
            const filename = 'geddit_image.jpg';
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
