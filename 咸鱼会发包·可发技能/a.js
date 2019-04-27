 var e = n.director.getRunningScene()
              , t = e.seekWidgetByName("mainmenu_ui");
            if (!t)
                return void console.warn("[ERROR] Could not find the main menu node.");
            var i = t.seekWidgetByName("mainmenu_quest_normal_ui")
              , r = t.seekWidgetByName("mainmenu_quest_raid_ui")
              , o = this._questInfo.has_new_raid_request || this._questInfo.in_progress && this._questInfo.in_progress.own_raid;
            i.setEnabled(!o),
            r.setEnabled(o),
            i.setVisible(!o),
            r.setVisible(o)


            var e = 



var ui = window.cc.director.getRunningScene().seekWidgetByName("mainmenu_ui");
var i = ui.seekWidgetByName("mainmenu_quest_normal_ui"); 
var r = ui.seekWidgetByName("mainmenu_quest_raid_ui");
var o = true;
 i.setEnabled(!o);r.setEnabled(o);i.setVisible(!o);r.setVisible(o);

var navigateTo(){
  var a = "mypage/my_001";

  $(".mypage-raid-appeared").is(':visible');  
  $(".mypage-raid-supportrequest").is(':visible');

  $(".mypage-raidp-gauge .gauge").css("width");
  $(".mypage-questp-gauge .gauge").css("width");
}
7002


location.reload = function(){};
delete window.onerror;
var tId = -1;
var count = 0;
function start(){
  if(location.hash.indexOf("raidboss/ra_006")>-1){
    location.hash = "raidboss/ra_001";
    tId = setTimeout(function(){
      start();
    },2000);
  }else{
    location.hash = "raidboss/ra_006";
    tId = setTimeout(function(){
      if($("#page_content > div.info_view.raidboss_support-battle-view").text().indexOf("レイドボス応援依頼")){
        ceng();
      }else{
        start();
      }
    },1500);  
  }
}

function stop(){
  clearTimeout(tId);
  tId =-1;
}

function ceng(){
  var list = $(".raidboss-support-request-list>li");
  var searchFlag = false;
  for(var i=0;i<list.length;i++){
    var l = $(list[i]);
    var h3 = l.find("h3.raidboss-info-header-new");
    if(h3.length>0){
      l.find(".ctrl a").click();
      searchFlag = true;
      break;
    }
  }
  if(searchFlag){
    tId = setTimeout(function(){
      $(".boss-first-attack").click();
      tId = setTimeout(function(){
        start();
      },2000);
    },1500);  
  }else{
    tId = setTimeout(function(){
      start();
    },5000);
  }
}
start();

// if(searchFlag){
//   console.log("find it");
// }else{
//   console.log("not find");  
// }

 a12
a11
a13
a23
a22
a14
a43
a41
a42
a33
a51
b
a52
a53
b
b
a12
b
a31
b
b
a11
a32
a43
a41
a42
b
b
b
b
b
a31
b




a23
a22
a43
a13
a32
a12
a11
a14
a41
a42
a51
b
b
b
a13
b
a31
b
b