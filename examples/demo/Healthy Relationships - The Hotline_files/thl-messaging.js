// JavaScript file
// TheHotline.org and LoveIsRespect.org chat tool.
// project lead: Marty Hand | National Domestic Violence Hotline | TheHotline.org
// author: Chad Cleveland | National Domestic Violence Hotline | TheHotline.org 
// copyright: © Copyright 2024 National Domestic Violence Hotline 

const thlMessagingLastModified = '2024-08-12 08:31';
const consoleTitleStr = "\n\nThe National Domestic Violence Hotline chat widget, powered by Genesys web messaging \n   Last modified on " + thlMessagingLastModified + "\n\n   To integrate The Hotline chat into your app or website, \n   contact us at TheHotline.org\n\n\n"

var thlMsg_debugTimer = 0;
var thlMsg_scriptHost = '';
var thlMsg_deployKey = '';
var thlMsg_autoLoad = '';
var thlMsg_disableJsBtn = '';
var thlMsg_vLanguage = 'en';
var thlMsg_exitBtn = '';
var thlMsg_queueKey = '';
var thlMsg_faviconUrl = '';
var thlMsg_inServiceArea = '';
var thlMsg_approvedDomain = '';

initMessaging();
async function initMessaging() {
    console.log(consoleTitleStr);
    // init globals
    thlMsg_initDebugTimer();
    thlMsg_getRootPath();
    thlMsg_getDeployKey();
    thlMsg_getAutoLoad();

    // options
    thlMsg_getLanguage();
    thlMsg_getDisableJsBtn();
    thlMsg_getExitBtn();

    // load external files
    thlMsg_loadCSS();
    thlMsg_loadFonts();
    thlMsg_loadMoment();
    
    // approve load
    thlMsg_inServiceArea = await thlMsg_getCountry();
    thlMsg_approvedDomain = await thlMsg_getDeployInfo();
    console.log(thlMsg_debugTimer, 'approveChat', thlMsg_inServiceArea, thlMsg_approvedDomain);

    if(thlMsg_inServiceArea == true && thlMsg_approvedDomain == true ) {
        await thlMsg_loadJsGlobals();
        thlMsg_loadJsFunctions();
    } else {
        if(typeof thlMsg_removeChatButtons === 'function') {        
            thlMsg_removeChatButtons();
        }
  
    }

}

function thlMsg_initDebugTimer() {
    const timer = 10;
    setInterval(function() {
        thlMsg_debugTimer = thlMsg_debugTimer + 10;
    }, timer);
}

function thlMsg_getRootPath() {
    const scripts = document.querySelectorAll('script[thl-chat]');
    const thisScript = scripts[scripts.length - 1];
    const sSrc = thisScript.src;
    var sFilePath = sSrc;
    if(sSrc.indexOf('?')) { sFilePath = sSrc.split('?')[0]; }
    const sPathDirs = sFilePath.split('/');
    let vPath = '';
    for (let i = 0; i < sPathDirs.length - 1; i++) {
        vPath = vPath + sPathDirs[i] + '/';        
    }
    thlMsg_scriptHost = vPath;
    // console.log(thlMsg_debugTimer, 'thlMsg_scriptHost', thlMsg_scriptHost);
}

function thlMsg_getDeployKey() {
    const scripts = document.querySelectorAll('script[thl-chat]');
    const thisScript = scripts[scripts.length - 1];
    thlMsg_deployKey = thisScript.src.split('key=')[1];
    if(thlMsg_deployKey.indexOf('&') > -1) {
        thlMsg_deployKey = thlMsg_deployKey.split('&')[0];
    }
}

function thlMsg_getAutoLoad() {
    const scripts = document.querySelectorAll('script[thl-chat]');
    const thisScript = scripts[scripts.length - 1];
    thlMsg_autoLoad = thisScript.src.split('thlautoload=')[1];
    if(thisScript.src.indexOf('thlautoload') > -1) {
        if(thlMsg_autoLoad.indexOf('&') > -1) {
            thlMsg_autoLoad = thlMsg_autoLoad.split('&')[0];
        }
    }
}

function thlMsg_getLanguage() {
    const scripts = document.getElementsByTagName('script');
    const topUrl = top.window.location.href;
    const thisScript = scripts[scripts.length - 1];
    // console.log(thlMsg_debugTimer, 'getLanguage', thisScript, thisScript.src);

    // if there is a query parameter in the script, set language to that
    if(thisScript.src.indexOf('thllanguage=') > -1){
        thlMsg_vLanguage = thisScript.src.split('thllanguage=')[1];
        // console.log(thlMsg_debugTimer, 'thlMsg_vLanguage', thlMsg_vLanguage);
        if(thlMsg_vLanguage.indexOf('&') > -1) {
            thlMsg_vLanguage = thlMsg_vLanguage.split('&')[0];
        }
        thlMsg_vLanguage = thlMsg_vLanguage.toLowerCase();
        console.log(thlMsg_debugTimer, 'Language', thlMsg_vLanguage);
    }

    // if 'espanol' exists in the top url, that takes precidence
    if(topUrl.indexOf('espanol') > -1) {
        thlMsg_vLanguage = 'es';
    }


    // at this time, we only support English and Spanish. Make sure the language parameter is one of the two expected values.
    if(thlMsg_vLanguage !== 'es') {
        thlMsg_vLanguage = 'en';
    }
}

function thlMsg_getDisableJsBtn() {
    const scripts = document.getElementsByTagName('script');
    const thisScript = scripts[scripts.length - 1];
    // console.log(thlMsg_debugTimer, 'getLanguage', thisScript, thisScript.src);
    if(thisScript.src.indexOf('thldisablebtn=') > -1){
        thlMsg_disableJsBtn = thisScript.src.split('thldisablebtn=')[1];
        // console.log(thlMsg_debugTimer, 'thlMsg_disableJsBtn', thlMsg_disableJsBtn);
        if(thlMsg_disableJsBtn.indexOf('&') > -1) {
            thlMsg_disableJsBtn = thlMsg_disableJsBtn.split('&')[0];
        }
        thlMsg_disableJsBtn = thlMsg_disableJsBtn.toLowerCase();
    }
    // console.log(thlMsg_debugTimer, 'Disable JS btn', thlMsg_disableJsBtn);
}

function thlMsg_getExitBtn() {
    const scripts = document.getElementsByTagName('script');
    const thisScript = scripts[scripts.length - 1];
    // console.log(thlMsg_debugTimer, 'getExitBtn', thisScript, thisScript.src);
    if(thisScript.src.indexOf('thldisableexitbtn=') > -1){
        thlMsg_exitBtn = thisScript.src.split('thldisableexitbtn=')[1];
        // console.log(thlMsg_debugTimer, 'thlMsg_exitBtn', thlMsg_exitBtn);
        if(thlMsg_exitBtn.indexOf('&') > -1) {
            thlMsg_exitBtn = thlMsg_exitBtn.split('&')[0];
        }
    }
    // console.log(thlMsg_debugTimer, 'ExitBtn', thlMsg_exitBtn);
}

async function thlMsg_getCountry() {
    return new Promise(function (resolve, reject) {
        let ipCtryXhr = new XMLHttpRequest();
        const qMethod = 'GET';
        const qUrl = 'https://browser-info.api.thehotline.us/country';
        ipCtryXhr.open(qMethod, qUrl);
        ipCtryXhr.send();
        ipCtryXhr.onload = function() {

            const thlMsg_country = ipCtryXhr.responseText.toLowerCase();
            console.log(thlMsg_debugTimer, 'Country', thlMsg_country);
            if (thlMsg_country != 'us' && thlMsg_country != 'pr' && thlMsg_country != 'gu' && thlMsg_country != 'vi' && thlMsg_country != 'mp' && thlMsg_country != 'as') {
                console.log(thlMsg_debugTimer, 'not in the US or approved country');
                
                // this is specific to TheHotline.org
                const contactBlock2 = document.querySelectorAll('.contact1-block')[1];
                if(contactBlock2) {
                    contactBlock2.remove();
                }
                // TheHotline.org specific
                resolve(false);

            } else {
                resolve(true);
            }
        }
    });
}


function thlMsg_removeChatButtons() {
    let chatBtnArr = [];
    let chatBtns = document.querySelectorAll('[name^=thl-messaging-btn]');
    let chatIdBtns = document.querySelectorAll('[id^=thl-messaging-btn]');
    // console.log(thlMsg_debugTimer, 'remove chat buttons', chatBtnArr);
    for(let i = 0; i < chatBtns.length; i++) {
        chatBtnArr.push(chatBtns[i]);
    }
    for(let i = 0; i < chatIdBtns.length; i++) {
        chatBtnArr.push(chatIdBtns[i]);
    }

    for(let i = 0; i < chatBtnArr.length; i++) {
        chatBtnArr[i].remove();
    }
}

// deployment info

async function thlMsg_getDeployInfo() {
    return new Promise(function (resolve, reject) {
        let deployInfoXhr = new XMLHttpRequest;
        const qMethod = 'POST';
        const qUrl = "https://thl-db.api.thehotline.us/deploy/get";
        var qBody = {};
        qBody.deploy_pid = thlMsg_deployKey;
        let apiKey = "hfMP7mHqGNPVtK2hkRNvcLIbGfDLvpI9oM5miNVee8EmxsIrtrKKTTUaYv4VaRaHeM9RXQc28shPkDCfYXr5zyqNFQ7CAtRN8z2dG4HJPwiySOv7oDUEK4uKAMLFgrYi";
        // console.log(thlMsg_debugTimer, "BODY: ", qBody);
          deployInfoXhr.open(qMethod, qUrl);
        deployInfoXhr.setRequestHeader("x-api-key", apiKey);
        deployInfoXhr.send(JSON.stringify(qBody));
        console.log(thlMsg_debugTimer, 'DeployInfo requested', thlMsg_deployKey.slice(0, 8));
        deployInfoXhr.onload = function() {
            if(JSON.parse(deployInfoXhr.responseText).count > 0) {
                const deployInfoResult = JSON.parse(deployInfoXhr.responseText).results[0];
                // console.log(thlMsg_debugTimer, 'WM deployXhr loaded', deployInfoXhr.status, deployInfoXhr.responseText);
                if(deployInfoResult["deploy_service"].includes('web messaging')) {
                    const thlMsg_approvedDomains = deployInfoResult["deploy_domain"].split(', ').join(',').split(',');
                    let thlMsg_isApproved = false;
                    thlMsg_queueKey = deployInfoResult["deploy_key"];
                    for(let i = 0; i < thlMsg_approvedDomains.length; i++) {
                        if(top.location.host.indexOf(thlMsg_approvedDomains[i]) > -1) {
                            thlMsg_isApproved = true;
                        }
                    }
                    if(thlMsg_isApproved == false)  {
                        console.log(thlMsg_debugTimer, 'DOMAIN IS NOT APPROVED FOR CHAT', top.location.host);
                        resolve(false);    
                    } else {
                        resolve(true);
                    }
                } else {
                    console.log(thlMsg_debugTimer, 'DEPLOY KEY IS NOT APPROVED FOR CHAT', thlMsg_deployKey);
                    resolve(false);
                }
            } else {
            console.log(thlMsg_debugTimer, 'INVALID KEY: ' + thlMsg_deployKey);
            alert('Oops, this is an invalid deployment key. Please contact your admin for assistance.')
            }
        }
    });
}


// load external files
function thlMsg_loadCSS() {
    const chatCss = document.createElement('link');
    let chatCssPath = thlMsg_scriptHost + 'css/messaging.css?v=240716';
    // let chatCssPath = 'messaging.css?v=240716';
    // console.log(thlMsg_debugTimer, 'thlMsg_scriptHost', thlMsg_scriptHost, 'chatCssPath', chatCssPath);
    chatCss.setAttribute('rel', 'stylesheet');
    chatCss.setAttribute('type', 'text/css');
    chatCss.setAttribute('href', chatCssPath);
    document.head.appendChild(chatCss);


    const iconsCss = document.createElement('link');
    let iconsCssPath = 'https://lib.thehotline.us/icons/thl-icons.css?v=1108';
    // console.log(thlMsg_debugTimer, 'iconsCssPath', iconsCssPath);
    iconsCss.setAttribute('rel', 'stylesheet');
    iconsCss.setAttribute('type', 'text/css');
    iconsCss.setAttribute('href', iconsCssPath);
    document.head.appendChild(iconsCss);

}

function thlMsg_loadFonts() {
    const gotham300 = document.createElement('link')
    gotham300.setAttribute('rel', 'preload');
    gotham300.setAttribute('as', 'font');
    gotham300.setAttribute('crossOrigin', 'anonymous');
    gotham300.setAttribute('href', 'https://lib.thehotline.us/font/gotham/gotham-300.woff2');
    const gotham400 = document.createElement('link')
    gotham400.setAttribute('rel', 'preload');
    gotham400.setAttribute('as', 'font');
    gotham400.setAttribute('crossOrigin', 'anonymous');
    gotham400.setAttribute('href', 'https://lib.thehotline.us/font/gotham/gotham-400.woff2');
    const gotham800 = document.createElement('link')
    gotham800.setAttribute('rel', 'preload');
    gotham800.setAttribute('as', 'font');
    gotham800.setAttribute('crossOrigin', 'anonymous');
    gotham800.setAttribute('href', 'https://lib.thehotline.us/font/gotham/gotham-800.woff2');
    document.head.appendChild(gotham300);
    document.head.appendChild(gotham400);
    document.head.appendChild(gotham800);
}

function thlMsg_loadMoment() {
    // console.log(thlMsg_debugTimer, 'Moment requested');
    const momentJs = document.createElement('script')
    momentJs.setAttribute('type', 'text/javascript');
    momentJs.setAttribute('src', 'https://lib.thehotline.us/moment/moment.min.js');
    document.body.appendChild(momentJs);
    // momentJs.onload = function() {
    //     console.log(thlMsg_debugTimer, 'Moment loaded');
    // }
}

async function thlMsg_loadJsGlobals() {
    // console.log(thlMsg_debugTimer, 'JS globals requested');
    return new Promise(function(resolve, reject) {
    
        const globalsScript = document.createElement('script');
        globalsScript.setAttribute('type', 'text/javascript');
        globalsScript.setAttribute('charset', 'utf-8');
        globalsScript.setAttribute('id', 'messaging-globals-js');
    
        globalsScript.src = thlMsg_scriptHost + 'js/messaging-globals.js?v=240716';
        // globalsScript.src = 'messaging-globals.js?v=240716';
        // console.log(thlMsg_debugTimer, 'thlMsg_scriptHost', thlMsg_scriptHost, 'globalsScript.src', globalsScript.src);
        document.body.appendChild(globalsScript);

        globalsScript.onload = function() {
            // console.log(thlMsg_debugTimer, 'JS globals loaded');
            resolve('JS loaded');
        }
    });
}

async function thlMsg_loadJsFunctions() {
    // console.log(thlMsg_debugTimer, 'JS functions requested');
    return new Promise(function(resolve, reject) {
        const appScript = document.createElement('script');
        appScript.setAttribute('type', 'text/javascript');
        appScript.setAttribute('charset', 'utf-8');
        appScript.setAttribute('id', 'messaging-js');
    
        appScript.src = thlMsg_scriptHost + 'js/messaging.js?v=240716';
        // appScript.src = 'messaging.js?v=240716';
        // console.log(thlMsg_debugTimer, 'thlMsg_scriptHost', thlMsg_scriptHost, 'appScript.src', appScript.src);
        document.body.appendChild(appScript);

        appScript.onload = function() {
            // console.log(thlMsg_debugTimer, 'JS functions loaded');
            resolve('JS loaded');
        }

    });

}



