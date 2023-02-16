const scriptLoadError = (context) => {
    // context.src = "./error.js";
    const newScript = document.createElement('script');
    newScript.src = context.src.replace('cdn1', 'cdn2');
    document.write(`<script src="file:///Users/jx-zhuang/code/frontend/reload/cdn2/1.js"></script>`);
};
const imgLoadError = (context) => {
    context.src = "./dog.png";
};
const cssLoadError = (context) => {
    context.href = "./style.css";
};

// information of assets
var assetsRetryStatistics = window.assetsRetry({
    // domain list, only resources in the domain list will be retried.
    domain: ['file:///Users/jx-zhuang/code/frontend/reload/cdn1', 'file:///Users/jx-zhuang/code/frontend/reload/cdn2'],
    // maximum retry count for each asset, default is 3
    maxRetryCount: 3,
    // onRetry hook is how you can customize retry logic with, default is x => x
    onRetry: function (currentUrl, originalUrl, statistics) {
        return currentUrl
    },
    // for a given resource (except background-images in css),
    // either onSuccess or onFail will be eventually called to
    // indicate whether the resource has been successfully loaded
    onSuccess: function (currentUrl) {
        console.log(currentUrl, assetsRetryStatistics[currentUrl])
    },
    onFail: function (currentUrl) {
        console.log(currentUrl, assetsRetryStatistics[currentUrl])
    }
})