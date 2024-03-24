document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('download-btn');
    const zippitBtn = document.getElementById('zippit-btn');
    const urlInput = document.getElementById('url-input');
    const container = document.querySelector('.container');

    downloadBtn.addEventListener('click', function () {
        const urls = urlInput.value.trim().split('\n').filter(url => url.trim() !== '');
        if (urls.length === 0) {
            alert('Please enter at least one valid URL.');
            return;
        }
        if (urls.length === 1) {
            initiateDownload(urls[0], 'geddit_image.jpg');
        } else {
            showZippitButton();
        }
    });

    zippitBtn.addEventListener('click', function () {
        const urls = urlInput.value.trim().split('\n').filter(url => url.trim() !== '');
        const zip = new JSZip();
        const promises = [];
        urls.forEach((url, index) => {
            const filename = `geddit_image_${index + 1}.jpg`;
            promises.push(fetchImage(url).then(blob => {
                zip.file(filename, blob);
            }));
        });
        Promise.all(promises).then(() => {
            zip.generateAsync({ type: "blob" }).then(blob => {
                initiateDownload(URL.createObjectURL(blob), 'geddit.zip');
            });
        });
    });

    function fetchImage(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            });
    }

    function initiateDownload(url, filename) {
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename;
        downloadLink.target = '_blank';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    function showZippitButton() {
        if (!zippitBtn.classList.contains('visible')) {
            zippitBtn.classList.add('visible');
            downloadBtn.style.width = '50%';
        }
    }

    function hideZippitButton() {
        if (zippitBtn.classList.contains('visible')) {
            zippitBtn.classList.remove('visible');
            downloadBtn.style.width = '100%';
        }
    }

    urlInput.addEventListener('input', function () {
        const urls = urlInput.value.trim().split('\n').filter(url => url.trim() !== '');
        if (urls.length <= 1) {
            hideZippitButton();
        }
    });
});
