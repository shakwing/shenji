
chrome.runtime.onMessage.addListener(onRuntimeMessage);
chrome.browserAction.onClicked.addListener(function(tab) {
  var optionUrl = chrome.extension.getURL('settings/index.html');
  chrome.tabs.query({
    url: optionUrl
  }, function(tabs) {
    var props;
    if (tabs.length > 0) {
      props = {
        active: true
      };
      chrome.tabs.update(tabs[0].id, props);
    } else {
      chrome.tabs.create({
        url: optionUrl
      });
    }
  });
});
/*chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'r.kamihimeproject.net', schemes: ["https", "http"] },
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'g.kamihimeproject.net', schemes: ["https", "http"] },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});*/

function onRuntimeMessage (msg, sender, sendResponse) {
    if (chrome.runtime.lastError)
        log(chrome.runtime.lastError);            

    var key = msg.type;

    switch (key) {
        case "getSettings":
            sendResponse(getSettings());
            break;
        default:
            log("Unknown message " + key);
            sendResponse({error: true});
            break;
    }
};
function getSettings(){
    var values = {};
    values.queueConfig = JSON.parse(localStorage["queueConfig"]||"[]");
    values.enableHotkey = localStorage["enableHotkey"]=="true";
    values.attCd = localStorage["attCd"]||2500;
    values.attCd = parseInt(values.attCd);
    values.abiCd = localStorage["abiCd"]||1500;
    values.abiCd = parseInt(values.abiCd);
    values.summonCd = localStorage["summonCd"]||2500;
    values.summonCd = parseInt(values.summonCd);
    values.defaultQueue = store("defaultQueue");
    return values;
}


function store(key,value){
    if(value===undefined){
        return window.localStorage[key];
    }else{
        window.localStorage[key] = value;
    }
}    
