document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('download-btn');
    const urlInput = document.getElementById('url-input');

    downloadBtn.addEventListener('click', function () {
        const urls = urlInput.value.trim().split('\n').filter(url => url.trim() !== '');
        if (urls.length === 0) {
            alert('Please enter at least one valid URL.');
            return;
        }
        urls.forEach(url => initiateDownload(url));
    });

    function initiateDownload(url) {
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'geddit_image.jpg';
        downloadLink.target = '_blank';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
});
