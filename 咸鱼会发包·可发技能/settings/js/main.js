
$(function () {
    var menu = [
        {
            tab:"queueTab",
            label:"队列设置"
        }
    ];
    $.each(menu,function(i,item){

    });

    //init
    var queueConfig = store("queueConfig");
    queueConfig = queueConfig?JSON.parse(queueConfig):[]; //[{name:1,value:"a11"}]

    var picCodeArr = store("picCodeArr"); 
    picCodeArr = picCodeArr?JSON.parse(picCodeArr):[];
    $.each(picCodeArr,function(i,item){
            generatePicBtn(item);
    });  
    function refreshQueueView(){
        $("#queueGroup").empty();
        $.each(queueConfig,function(i,item){
            generateQueueBtn(item);
        });    
    }
    refreshQueueView();
    



    $("#exportQueueBtn").click(function(){
        var str = JSON.stringify(queueConfig);
        var ret = interCopy(str);
        if(!ret){
            alert("队列信息复制失败");
        }
    });
    $("#importQueueBtn").click(function(){
        var str = interPaste();
        if(str){
            var imConfig = JSON.parse(str);
            if(imConfig!=null&&imConfig.length>0){
                queueConfig = queueConfig.concat(imConfig);
                saveQueueConfig();
                refreshQueueView();    
                return;
            }
        }
        alert("导入失败,请将复制队列信息至剪贴板");
    });



    $("#saveQueueBtn").click(function(){
        var val = $("#configQueueArea").val();
        var name = $("#queueNameTxt").val();
        if(!val||!name){
            return;
        }
        var item = null;
        for(var k=0;k<queueConfig.length;k++){
            var kitem = queueConfig[k];
            if(kitem.name == name){
                item = kitem;
            }
        }
        if(!item){
            item = {};
            item.name=name;
            item.value = val;
            queueConfig.push(item);
            //生成新按钮
            generateQueueBtn(item);
        }else{
            item.value = val;    
        }
        saveQueueConfig();
        $("#configQueueArea").val("");
        $("#queueNameTxt").val("");
        $("#displayQueueArea").val("")
    });
    $("#displayQueueBtn").click(function(){
        displayTextQueueConfig();
    });


    //hotkey
    var enableHotkey = store("enableHotkey");
    if(enableHotkey=="true"){
        enableHotkey = true;
    }else{
        enableHotkey = false;
    }
    $("#enableHotkey").prop("checked",enableHotkey);
    $("#enableHotkey").change(function(e){
        store("enableHotkey",$(this).prop("checked"));
    });



    $("#transPackBtn").click(function(){
        var picAddr = $("#picAddr").val();
        var picOriAddr = transStrToAddr(picAddr);
// window.blowfish.decrypt(,"bLoWfIsH",{outputType:1,cipherMode:0})

        $("#picOriAddr").val(picOriAddr);
        
    });

    $("#searchPic").click(function(){
        $("#imageCon").empty();
        var patternAddr = $("#patternPicAddr").val();
        var oriMinPicCode = $("#minPicCode").val();
        var minPicCode = parseInt(oriMinPicCode);
        var maxPicCode = parseInt($("#maxPicCode").val());
        if(patternAddr.indexOf("$")==-1){
            alert("模式地址需要含有替换占位符$");
            return;
        }
        if(isNaN(minPicCode)){
            if(isNaN(maxPicCode)){
                maxPicCode = minPicCode;
            }
            alert("编码必须为数字");
            return;   
        }
        var length = oriMinPicCode.length;
        for(var i=minPicCode;i<=maxPicCode;i++){
            var code = i+"";
            while(code.length<length){
                code="0"+code;
            }
            renderImage(patternAddr,code);
        }
    });


    function renderImage(patternAddr,code){
        var picAddr = patternAddr.replace("$",code);

        var div = $("<div class='col-md-4' style='margin-top:3px;margin-left:10px'></div>");
        $("#imageCon").append(div);
        div.append(picAddr+":");
        var picOriAddr = transStrToAddr(picAddr);
        var img = new Image();
        img.src = picOriAddr;

        img.onerror = function(){
            div.append("<div>无图片</div>");
        }
        img.onload = function(){
            if(img.complete){
                // div.append("<div>"+picOriAddr+"<div>");
                // $("<div class="col-md-8"></div>")
                $(img).css("max-width","350px");
                div.append(img);
            }
        }
    }

    function transStrToAddr(picAddr){
        var str = window.blowfish.encrypt(picAddr,"bLoWfIsH",{outputType:1,cipherMode:0});
        var picOriAddr = "https://static-r.kamihimeproject.net/resources/pc/normal/"+str.substring(str.length-4,str.length-2)+"/"+str.substring(str.length-2)+"/"+str;
        picOriAddr+="."+$("#picType").val();
        
        return picOriAddr;
    }

    $("#transPicCodeBtn").click(function(){
        var picOriAddr = $("#picOriAddr").val();
        var picOriAddr = picOriAddr.substring(picOriAddr.lastIndexOf("/")+1,picOriAddr.lastIndexOf("."));
        var str = window.blowfish.decrypt(picOriAddr,"bLoWfIsH",{outputType:1,cipherMode:0});
        
// window.blowfish.decrypt(,"bLoWfIsH",{outputType:1,cipherMode:0})

        $("#picAddr").val(str);
    });

    $("#savePicCodeBtn").click(function(){
        var patternAddr = $("#patternPicAddr").val();
        if(!patternAddr){
            return;
        }
        var minPicCode = $("#minPicCode").val();
        var maxPicCode = $("#maxPicCode").val();
        var picType = $("#picType").val();
        var item = {
            patternAddr:patternAddr,
            minPicCode:minPicCode,
            maxPicCode:maxPicCode,
            picType:picType
        }
        picCodeArr.push(item);
        generatePicBtn(item);
        store("picCodeArr",JSON.stringify(picCodeArr));
// window.blowfish.decrypt(,"bLoWfIsH",{outputType:1,cipherMode:0})

    });
    function generatePicBtn(item){
        var group =$('<div class="btn-group" style="margin-left:10px;margin-bottom:5px"></div>');
        var btn = $('<button type="button" class="btn btn-default">'+item.patternAddr+'</button>');
        group.append(btn);
        var closeBtn = $('<button type="button" class="btn btn-default"><span aria-hidden="true">×</span></button>');
        group.append(closeBtn);
        $("#imageBtnCon").append(group);
        btn.click(function(){
            $("#patternPicAddr").val(item.patternAddr);
            $("#minPicCode").val(item.minPicCode);
            $("#maxPicCode").val(item.maxPicCode);
            $("#picType").val(item.picType);
        });
        closeBtn.click(function(){
            group.remove();
            for(var k=0;k<picCodeArr.length;k++){
                var kitem = picCodeArr[k];
                if(kitem == item){
                    queueConfig.splice(k,1);
                    break;
                }
            }
            store("picCodeArr",JSON.stringify(picCodeArr));
        });
    }






    

    function generateQueueBtn(item){
        var group =$('<div class="btn-group" style="margin-left:10px;margin-bottom:5px"></div>');
        var btn = $('<button type="button" class="btn btn-default">'+item.name+'</button>');
        group.append(btn);
        var riseBtn = $('<button type="button" class="btn btn-default"><span aria-hidden="true">↑</span></button>');
        group.append(riseBtn);
        var closeBtn = $('<button type="button" class="btn btn-default"><span aria-hidden="true">×</span></button>');
        group.append(closeBtn);
        $("#queueGroup").append(group);
        btn.click(function(){
            $("#queueNameTxt").val(item.name);
            $("#configQueueArea").val(item.value);
            displayTextQueueConfig(); 
        });
        riseBtn.click(function(){
            for(var k=0;k<queueConfig.length;k++){
                var kitem = queueConfig[k];
                if(kitem.name == item.name){
                    queueConfig.splice(k,1);
                    break;
                }
            }
            queueConfig.unshift(item);
            $("#queueGroup").prepend(group);
            saveQueueConfig();
        });
        closeBtn.click(function(){
            group.remove();
            for(var k=0;k<queueConfig.length;k++){
                var kitem = queueConfig[k];
                if(kitem.name == item.name){
                    queueConfig.splice(k,1);
                    break;
                }
            }
            saveQueueConfig();
        });
    }


    function displayTextQueueConfig(){
        var val = $("#configQueueArea").val();
        var configArr = val.split("\n");
        var displayValArr = [];
        for(var i=0;i<configArr.length;i++){
            var item = configArr[i];
            if(item){
                if(item.substring(0,1)=="a"){
                    displayValArr.push(parseInt(item.substring(1,2))+"位置"+parseInt(item.substring(2,3))+"技能");
                }else if(item.substring(0,1)=="b"){
                    displayValArr.push("攻击");
                }else if(item.substring(0,1)=="r"){
                    displayValArr.push("reload");
                }else if(item.substring(0,1)=="w"){
                    displayValArr.push("wait stun");
                }else if(item.substring(0,1)=="h"){
                    displayValArr.push("放怪");
                }else if(item.substring(0,1)=="R"){
                    displayValArr.push("过图标记");
                }else if(item.substring(0,1)=="c"){
                    if(item.length>=2){
                        var summonPos = parseInt(item.substring(1,2));
                        if(!isNaN(summonPos)){
                             displayValArr.push("幻兽"+summonPos);
                        }
                    }
                }
            }
        }
        $("#displayQueueArea").val(displayValArr.join("\n"));
    }

    function saveQueueConfig(){
        store("queueConfig",JSON.stringify(queueConfig));
    }

    var attCd = transInt(store("attCd"),2500);
    var abiCd = transInt(store("abiCd"),1500);
    var summonCd = transInt(store("summonCd"),2500);
    var defaultQueue = store("defaultQueue")||"";
    $("#attCdTxt").val(attCd);
    $("#abiCdTxt").val(abiCd);
    $("#summonCdTxt").val(summonCd);
    $("#defaultQueueTxt").val(defaultQueue);
    $("#saveBattleBtn").click(function(){
        var attCd = $("#attCdTxt").val();
        var abiCd = $("#abiCdTxt").val();
        var summonCd = $("#summonCdTxt").val();
        var defaultQueue = $("#defaultQueueTxt").val();
        attCd = transInt(attCd,2500);
        abiCd = transInt(abiCd,1500);
        summonCd = transInt(summonCd,2500);
        store("attCd",attCd);
        store("abiCd",abiCd);
        store("summonCd",summonCd);        
        store("defaultQueue",defaultQueue);        
    });

    function transInt(num,def){
        if(isNaN(num)){
            num = def;
        }else{
            num = parseInt(num);
            if(num<def){
                num = def;
            }
        }
        return num;
    }


    //触发用户动作时才能调用
    function interCopy(str){
        // var item = document.querySelector("div.mdl-layout__content li:nth-child(1)");
        // if(item!=null){
            var sel = document.createElement("textarea");
            var f = sel.style;
            f.position = "fixed";
            f.top = "0";
            f.left = "0";
            f.width = "2em";
            f.height = "2em";
            f.padding = "0";
            f.border = "none";
            f.outline = "none";
            f.boxShadow = "none";
            f.background = "transparent";
            sel.value = str;
            document.body.appendChild(sel);
            sel.select();
            try {
                var ret = !!document.execCommand("copy")
            } catch (n) {
                ret = false;
            }finally {
                document.body.removeChild(sel);
            }
            return ret;
    }
    function interPaste(){
        var sel = document.createElement("textarea");
        var f = sel.style;
        f.position = "fixed";
        f.top = "0";
        f.left = "0";
        f.width = "2em";
        f.height = "2em";
        f.padding = "0";
        f.border = "none";
        f.outline = "none";
        f.boxShadow = "none";
        f.background = "transparent";
        document.body.appendChild(sel);
        sel.select();
        sel.focus();
        try {
            var ret = !! document.execCommand("paste");
            if(ret){
                return sel.value;
            }
        } catch (n) {
            ret = false;
        }finally {
            document.body.removeChild(sel);
        }
       


    }


    function store(key,value){
        if(value===undefined){
            return window.localStorage[key];
        }else{
            window.localStorage[key] = value;
        }
    }    

});
