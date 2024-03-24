document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('download-btn');
    const urlInput = document.getElementById('url-input');

    downloadBtn.addEventListener('click', function () {
        const url = urlInput.value.trim();

        if (url === '') {
            alert('Please enter a valid URL.');
            return;
        }

        const questionMarkIndex = url.indexOf('?');
        const parsedUrl = questionMarkIndex !== -1 ? url.slice(0, questionMarkIndex) : url;

        initiateDownload(parsedUrl);
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
