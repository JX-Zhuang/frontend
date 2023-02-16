const js1 = {
    start: () => {
        document.addEventListener('DOMContentLoaded', function () {
            const startDiv = document.createElement('div');
            startDiv.innerText = '开始';
            document.body.appendChild(startDiv);
        });
    }
}