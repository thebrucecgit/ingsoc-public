# INGSOC

## Installation
* Install mitmproxy from package index: https://docs.mitmproxy.org/stable/overview-installation/#installation-from-the-python-package-index-pypi
* Install any extra dependencies via `pipx inject mitmproxy <your-package-name>`


## Running
* Run `mitmproxy -s main.py`
* To access on own computer, change your browser to proxy via "http://localhost:8080"
* To access on different device, configure the host computer to accept incoming connections and forward them to "localhost:8080"
* On the user device check that the proxy is configured properly by visiting mitm.it
* Install certificates as appropriate from mitm.it