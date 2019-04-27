$(function(){
	var temp = window.onerror;
	window.onerror = function(e){
		//去掉默认的处理 防止error上报
		window.kh.postMessage("openErrorDialog", [0]);
		return false;
	}
	console.error = function(e){
		window.kh.postMessage("openErrorDialog", [0]);
		return false;	
	}
	//window.ccui.Widget.TOUCH_ENDED==2
	delete console.log;//神TM被覆盖了
	//有的版本删除后没了
	if(!console.log){
		console.log = function(e){
		}
	}
	var logger = window.kh.createInstance("logger");
    if(logger){
    	logger.reportJsException = function(e){
    		// delete console.log;
    		console.log(e);
    	}
    }
	var marginAdjustId= setInterval(function(){
		if($("#Cocos2dGameContainer").length>0){
			if($(window).height()<500){
				$("#Cocos2dGameContainer").css("margin","0px 0px 0px 100px");
			}else{
				$("#Cocos2dGameContainer").css("margin","0px");
			}
			clearInterval(marginAdjustId);
		}
	},10);
	setTimeout(function(){
		var _http = window.kh.createInstance("HttpConnection");

		$("#Cocos2dGameContainer").css("float","left");
		var con = $("<div style='width:240px;float:left;margin-left: 10px;margin-top: 5px;'></div>");
		$("body").append(con);
		if(window.location.toString().indexOf("/battle")>-1){

		}else if(window.location.toString().indexOf("/mypage_quest_party_guild_enh_evo_gacha_present_shop_epi")>-1){
			
			var wrapDiv = $("<div></div>");
			con.append(wrapDiv);
			var gachaBtn = $("<button type='button' class='btn'>normal卡池抽卡</button>");
			gachaBtn.click(function(){
				switchPlayBtns(false);
				gachaDiv.empty();
				//{"a_player_id":"me","dmm_id":"23741880","name":"\u7d05\u96ea","description":"~ ~","description_text_id":null,"rank":61,"exp":58713,"next_exp":4947,"character_num":37,"weapon_num":120,"max_weapon_num":120,"summon_num":50,"max_summon_num":70,"login_date":"12\u5206\u524d","a_union_id":511,"friend_num":44,"friend_max_num":45,"selected_party":{"a_party_id":1978962,"party_name":"\u30d1\u30fc\u30c6\u30a3D"},"job_info":{"job_id":12,"name":"\u30bd\u30ed\u30e2\u30f3","level":20,"exp":0,"next_exp":0,"total_acquired_jobs":17,"max_acquirable_jobs":23}}
				//{"category_id":3,"category_type":"normal","payment_type":"normal","title":"\u30b8\u30a7\u30e0\u30ac\u30c1\u30e3","description":"\u30b8\u30a7\u30e0\u3067\u30ce\u30fc\u30de\u30eb\u30ac\u30c1\u30e3\u304c\u5f15\u3051\u308b\uff01","sliders":[{"slider_id":501,"type":"no_transit"},{"slider_id":502,"type":"character","character_id":83},{"slider_id":503,"type":"character","character_id":68},{"slider_id":504,"type":"character","character_id":64}],"is_max_weapon_or_summon":true,"groups":[{"gacha_id":10,"enabled":true,"price":0,"gacha_count":1,"title":"1\u65e51\u56de\u5236\u9650\u5272\u5f15\u30b8\u30a7\u30e0\u30ac\u30c1\u30e3","description":"\u8aac\u660e\u6587","discount":{"before_price":0},"bonus":[],"item_id":2}]}
				continuePlay();


				function continuePlay(){
					var gachaApi = window.kh.createInstance("apiAGacha");
					gachaApi.getCategory("normal").then(function(e){
						var isMax = e.body["is_max_weapon_or_summon"];
						if(isMax){
							gachaDiv.append("武器或幻兽满 停止执行<br/>");
							switchPlayBtns(true);
							return;
						}
						var groups = e.body.groups;
						if(groups&&groups[0]&&groups[0].gacha_id == 10){
							gachaApi.getCheckUsing(10).then(function(e){
								gachaDiv.append("检测当前金币"+e.body.before_num+",抽卡后"+e.body.after_num+"<br/>");
								if(e.body.after_num ==e.body.before_num){
									gachaDiv.append("开始每日免费单抽<br/>");
									gachaApi.playGacha("normal", 10).then(function(e) {
						                if(handleGachaResult(e)){
						                	continuePlay();
						                }
						            }).fail(playFailHandler);
								}else{
									gachaDiv.append("金币数量计算出现问题,放弃抽卡");
									switchPlayBtns(true);
									return;
								}
							}).fail(playFailHandler);
						}else if(groups&&groups.length>1&&groups[1].gacha_id==9&&groups[1].enabled){
							gachaApi.getCheckUsing(9).then(function(e){
								gachaDiv.append("检测当前金币"+e.body.before_num+",抽卡后"+e.body.after_num+"<br/>");
								gachaDiv.append("抽卡价格"+groups[1].price);
								if(e.body.before_num<200){
									gachaDiv.append("金币数量小于200,放弃抽卡");
									switchPlayBtns(true);
									return;
								}else if(e.body.before_num - e.body.after_num == groups[1].price){
									gachaDiv.append("开始"+groups[1].gacha_count+"次抽取<br/>");
									gachaApi.playGacha("normal", 9).then(function(e) {
						                if(handleGachaResult(e)){
						                	continuePlay();
						                }
						            }).fail(playFailHandler);
								}else{
									gachaDiv.append("金币数量计算出现问题,放弃抽卡");
									switchPlayBtns(true);
									return;
								}
							}).fail(playFailHandler);
						}else{
							gachaApi.getCheckUsing(8).then(function(e){
								gachaDiv.append("检测当前金币"+e.body.before_num+"<br/>");
								if(e.body.before_num<200){
									gachaDiv.append("金币数量小于200,放弃抽卡");
									switchPlayBtns(true);
									return;
								}else{
									gachaDiv.append("武器或幻兽剩余空间少于2个无法进行多次抽取,停止执行<br/>");
									switchPlayBtns(true);
									return;
								}
							}).fail(playFailHandler);
						}
					}).fail(playFailHandler);
				}
				function handleGachaResult(e){
					var arr = e.body["obtained_info"];
	                var sumN = 0;
	                var sumR = 0;
	                var weaponN = 0;
	                var weaponR = 0;
	                for(var i=0;i<arr.length;i++){
	                	var item = arr[i];
	                	if(item["weapon_info"]){
	                		if(item["weapon_info"].rare=="N"){
	                			weaponN++;
	                		}else if(item["weapon_info"].rare=="R"){
	                			weaponR++;
	                		}
	                	}else if(item["summon_info"]){
							if(item["summon_info"].rare=="N"){
	                			sumN++;
	                		}else if(item["summon_info"].rare=="R"){
	                			sumR++;
	                		}
	                	}
	                }
	                gachaDiv.append("n武器"+weaponN+"个,r武器"+weaponR+"个,n幻兽"+sumN+"个,r幻兽"+sumR+"个<br/>");
	                if(sumN==0&&sumR==0&&weaponN==0&&weaponR==0){
	                	gachaDiv.append("未抽出东西,停止执行<br/>");
	                	switchPlayBtns(true);
	                	return false;
	                }
	                return true;
				}
			});
			wrapDiv.append(gachaBtn);

			var donateBtn = $("<button type='button' class='btn'>捐献推荐武器</button>");
			donateBtn.click(function(){
				switchPlayBtns(false);
				gachaDiv.empty();
				donateWeapon();
			});
			wrapDiv.append(donateBtn);
			function donateWeapon(){
				window.kh.createInstance("apiAWeapons").getRecommendGuardianDonationMaterials().then(function(e) {
					if(0 === e.body.max_record_count){
						gachaDiv.append("N武器数量0<br/>");
						switchPlayBtns(true);
					}else{
						var donateArr = [];
						for(var i=0;i<e.body.data.length;i++){
							donateArr.push(e.body.data[i].a_weapon_id);
						}
						gachaDiv.append("N武器数量"+donateArr.length+"<br/>");
						window.kh.createInstance("apiAUnions").guardianDonationWeapons(donateArr).then(function(e) {
			                var n = e.body.rank_up_info;
			                if (n.before_rank < n.after_rank) {
			                	gachaDiv.append("守护神等级:"+n.before_rank+" -> "+n.after_rank+"<br/>");
			                } else {
			                	gachaDiv.append("守护神经验:"+e.body.before_custom_pt+" -> "+e.body.after_custom_pt+"<br/>");
			                }
			                if(donateArr.length>=20){
				            	//继续捐献
				            	donateWeapon();
				            }else{
				            	switchPlayBtns(true);
				            }
			            }).fail(playFailHandler);
					}
	            }).fail(playFailHandler);
			}
			wrapDiv = $("<div></div>");
			con.append(wrapDiv);
			var sellSumBtn = $("<button type='button' class='btn'>卖出n幻兽</button>");
			sellSumBtn.click(function(){
				switchPlayBtns(false);
				gachaDiv.empty();
				sellSum();
			});
			wrapDiv.append(sellSumBtn);
			var sellWeaponBtn = $("<button type='button' class='btn'>卖出n武器</button>");
			sellWeaponBtn.click(function(){
				switchPlayBtns(false);
				gachaDiv.empty();
				sellWeapon();
			});
			wrapDiv.append(sellWeaponBtn);
			//apiASummons  getRecommendSellableList  sell
			// t.createInstance("apiASummons").getRecommendSellableList().then(function(t) {
            //     return console.log(t),
            //     0 === t.body.max_record_count ? void this._popupNoOffer(e) : (n.each(t.body.data, function(e, t) {
            //         this._selectableCardList[e.a_summon_id] = t,
            //         this._selectableRecordList[e.a_summon_id] = e
            //     }, this),
            //     void this._popupConfirmRareSell(e, "btnCallbackTab1NodeBtnDecision"))
            // }

			function sellWeapon(){
				window.kh.createInstance("apiAWeapons").getRecommendSellableList().then(function(e) {
					if(0 === e.body.max_record_count){
						gachaDiv.append("N武器数量0<br/>");
						switchPlayBtns(true);
					}else{
						var sellArr = [];
						for(var i=0;i<e.body.data.length;i++){
							sellArr.push(e.body.data[i].a_weapon_id);
						}
						gachaDiv.append("N武器数量"+sellArr.length+"<br/>");
						window.kh.createInstance("apiAWeapons").sell(sellArr).then(function(e) {
			                gachaDiv.append("出售完毕<br/>");
			                
			                if(sellArr.length>=20){
				            	//继续捐献
				            	sellWeapon();
				            }else{
				            	switchPlayBtns(true);
				            }
			            }).fail(playFailHandler);;
					}
	            }).fail(playFailHandler);
			}
			function sellSum(){
				window.kh.createInstance("apiASummons").getRecommendSellableList().then(function(e) {
					if(0 === e.body.max_record_count){
						gachaDiv.append("N幻兽数量0<br/>");
						switchPlayBtns(true);
					}else{
						var sellArr = [];
						for(var i=0;i<e.body.data.length;i++){
							sellArr.push(e.body.data[i].a_summon_id);
						}
						gachaDiv.append("N幻兽数量"+sellArr.length+"<br/>");
						window.kh.createInstance("apiASummons").sell(sellArr).then(function(e) {
			                gachaDiv.append("出售完毕<br/>");
			                
			                if(sellArr.length>=20){
				            	//继续捐献
				            	sellSum();
				            }else{
				            	switchPlayBtns(true);
				            }
			            }).fail(playFailHandler);
					}
	            }).fail(playFailHandler);
			}

			function switchPlayBtns(enabledFlag){
				sellSumBtn.prop("disabled",!enabledFlag);
				sellWeaponBtn.prop("disabled",!enabledFlag);
				donateBtn.prop("disabled",!enabledFlag);
				gachaBtn.prop("disabled",!enabledFlag);
			}
			function playFailHandler(){
				switchPlayBtns(true);
				mypageLog("执行失败");
			}

            //{"rank_up_info":{"before_rank":3,"after_rank":3,"effect_info":{"description":"\u96f7\u5c5e\u6027\u30ad\u30e3\u30e9\u30af\u30bf\u30fc\u306e\u653b\u6483\u529b\u304c4%\u30a2\u30c3\u30d7"}},"before_custom_pt":1119,"after_custom_pt":1139}
			var raidCtl = {
				raidDatas:null,
				init:function(){
					var raidDatas = store("raidDatas");
					if(raidDatas){
						raidDatas = JSON.parse(raidDatas);	
					}else{
						raidDatas = {};
					}
					this.raidDatas = raidDatas;
				},
				getRaidDatas:function(){
					return this.raidDatas;
				},
				getRaidData:function(questId){
					return this.raidDatas[questId];
				},
				saveRaidData:function(raidData){
					this.raidDatas[raidData.questId] = raidData;
					this.saveRaidDatas();
				},
				saveRaidDatas:function(){
					store("raidDatas",JSON.stringify(this.raidDatas));
				}

			}
			raidCtl.init();

			wrapDiv = $("<div></div>");
			con.append(wrapDiv);
			var checkRaidBtn = $("<button type='button' class='btn'>检查raid</button>");

			checkRaidBtn.click(function(){
				gachaDiv.empty();
				mypageLog("开始检查raid信息");
				//https://r.kamihimeproject.net
				//{"data":[{"a_battle_id":3649496,"enemy_name":"\u95c7\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":50,"participants":2,"is_own_raid":false,"help_requested_player_name":"KK","quest_id":12,"a_quest_id":994570,"quest_type":"raid","enemy_hp":734594,"enemy_max":1350000,"battle_bp":5,"time_left":"00:53:39","is_joined":false,"has_union_member":false}],"max_record_count":1}
				_http.get({
	                url: "/v1/a_battles",
					json: {
	                    kind: "raid_request"
	                }
	            }).then(function(data){
					if(data.body.max_record_count==0){
						mypageLog("无raid");
					}else{
						$.each(data.body.data,function(i,item){
							var questId = item.quest_id;
							var raidData = raidCtl.getRaidData(questId);
							if(!raidData){
								raidData = {
									hp:item.enemy_max,
									name:item.enemy_name,
									bp:item.battle_bp,
									level:item.enemy_level,
									questId:item.quest_id
								}
								raidCtl.saveRaidData(raidData);
							}
							mypageLog((i+1)+":"+item.enemy_name+" lv"+item.enemy_level+",总血量:"+item.enemy_max
								+",当前血量:"+item.enemy_hp+",消耗bp:"+item.battle_bp
								+",战斗id:"+item.a_battle_id+",任务id:"+item.a_quest_id);		
						});
					}
				});
			});


			//9 光 20ap
			//{"data":[{"a_battle_id":3516569,"enemy_name":"\u6c37\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec",
			//"enemy_level":50,"participants":2,"is_own_raid":false,"help_requested_player_name":"yosi","quest_id":4,"a_quest_id":986613,"quest_type":"raid","enemy_hp":176628,"enemy_max":800000,"battle_bp":5,"time_left":"00:55:10","is_joined":false,"has_union_member":false},{"a_battle_id":3516695,"enemy_name":"\u5149\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":30,"participants":2,"is_own_raid":false,"help_requested_player_name":"\u672a\u8317","quest_id":9,"a_quest_id":1120514,"quest_type":"raid","enemy_hp":504113,"enemy_max":600000,"battle_bp":3,"time_left":"00:57:15","is_joined":true,"has_union_member":true}],"max_record_count":2}
			wrapDiv.append(checkRaidBtn);

			var refreshExistBtn = $("<button type='button' class='btn'>刷新存在感</button>");
			refreshExistBtn.click(function(){
				gachaDiv.empty();
				mypageLog("开始刷新存在");
				
				_http.get({
	                url: window.kh.env.urlRoot+"/a_players/me/game_config"
	            }).then(function(e){
					var si = e.body.game_config.sound_info;
					var param = {sound_info:{
						sound_enabled:si.sound_enabled,
						bgm_enabled:si.bgm_enabled,
						voice_enabled:si.voice_enabled,
						se_enabled:si.se_enabled
					}}

					_http.put({
		                url: "/v1/a_players/me/game_config",
		                json: param
		            }).then(function(a){
						mypageLog("刷新完毕");
					}).fail(function(){
						mypageLog("网络请求失败");	
					});
				}).fail(function(){
					mypageLog("网络请求失败");
				});
			});
			wrapDiv.append(refreshExistBtn);

			var elementMap = {
				"0":"火",
				"1":"水",
				"2":"风",
				"3":"雷",
				"5":"光",
				"4":"暗"
			}
			var calAttBtn = $("<button type='button' class='btn'>计算攻刃</button>"); 
			calAttBtn.click(function(){
				gachaDiv.empty();
				mypageLog("开始获取信息");
				window.kh.createInstance("apiAParties").getDeck("selected").then(function(e) {
					var weaQueue = [];
					var cacheMap = {};
					for(var i=0;i<e.body.deck.weapons.length;i++){
						var item = e.body.deck.weapons[i];
						if(item&&item.a_weapon_id){
							var weaponId = item.a_weapon_id;
							cacheMap[weaponId] = item;
							if(item.skills){
								//已经缓存了技能
								weaQueue.push(Promise.resolve({body:item}));
							}else{
								weaQueue.push(getWeaponDetail(weaponId));	
							}
							
						}
					}
					window.Q.all(weaQueue).spread(function(){
						var arg = arguments;
						var calMap = {};

						for(var i=0;i<arg.length;i++){
							var item = arg[i].body;
							cacheMap[item.a_weapon_id].skills = item.skills;
							var type = item.element_type;
							var name = elementMap[type];
							if(item.skills&&item.skills.length>0){
								var sk =item.skills[0];
								var skillLevel = sk.level;
								var isAtt = sk.description.indexOf("攻撃力")>-1;
								var baseNum = 0;
								if(sk.description.indexOf("中")>-1){
									baseNum = 3;
								}else if(sk.description.indexOf("大")>-1){
									baseNum = 6;
								}
								var calItem = calMap[type];
								if(calItem==null){
									calItem = {};
									calItem.type = type;
									calItem.name = name;
									calItem.att = 0;
									calItem.hp = 0;
									calMap[type] = calItem;
								}
								var powNum = baseNum+skillLevel*0.5;
								if(isAtt){
									calItem.att+=powNum;	
								}else{
									calItem.hp+=powNum;
								}
							}
						}
						for(var key in calMap){
							var calItem = calMap[key];
							var str = calItem.name+"系:攻击+"+calItem.att+"%,血量+"+calItem.hp+"%";
							mypageLog(str);
						}

					}).fail(function(){
						mypageLog("计算出错或网络请求失败");
					});
				}).fail(function(){
					mypageLog("网络请求失败");
				});
			});
			function getWeaponDetail(weaponId){
				return window.kh.createInstance("apiAWeapons").get(weaponId);
			}
			wrapDiv.append(calAttBtn);

			var txtDiv = $("<div style='width:100%'></div>");
			con.append(txtDiv);
			var gachaDiv = $("<div style='width:100%;background:white;float:left;height:300px;overflow-y: auto;font-size: small;line-height: 16px;word-break: break-all;word-wrap: break-word;'></div>");
			txtDiv.append(gachaDiv);

			function mypageLog(str){
				gachaDiv.append(str+"<br/>");
			}

			function replacePartyFun(){
			    _.assign(kh.pc.party.par_001_002_003.SceneDelegate.prototype,{
			        _setupWeaponTab: function(e, n) {
			            var a = e.seekWidgetByName("par_002_ui");
			            a.setStrings({
			                calc_hp_no: n.total_weapon_hp,
			                calc_attack_no: n.total_weapon_attack
			            });
			            var s = (n.weapons,
			            n.weapons[0] || {})
			              , o = n.weapons.slice(1)
			              , r = a.seekWidgetByName("partymain_weapon");
			            if (_.isUndefined(s.weapon_id)){
			                r.setVisible(!1),
			                kh.setTouchEventHandlers(e, {
			                    "TOUCH_ENDED btn_main_weapon_blank": function() {
			                        kh.createInstance("router").navigate("party/par_013", {
			                            party_id: this._a_party_id,
			                            par_013: {
			                                number: 0
			                            }
			                        })
			                    }
			                }, this);
			            }else {
			                r.setVisible(!0);
			                var c = kh.Img("partymain", "weapon", _.padZero(n.weapons[0].weapon_id, 4), 0).jpg;
			                a.seekWidgetByName("partymain_weapon").loadTextures(c, c, c),
			                this._setCardStrings(r, s),
			                r.addTouchEventListener(function(e, n) {
			                    console.log(n),
			                    n === ccui.Widget.TOUCH_ENDED && kh.createInstance("router").navigate("party/par_012", {
			                        party_id: this._a_party_id,
			                        par_012: {
			                            id: s.a_weapon_id,
			                            number: 0
			                        }
			                    })
			                }, this);
			                if(s.skills&&s.skills.length>0){
			                	var n = a.seekWidgetByName("partymain_weapon")
			                	this._makeWeaponLevelLabel(n,s,182,517);
			                }
			            }
			            _.each(o, function(e, n) {
			                if (!(n >= 9)) {
			                    var s = a.seekWidgetByName("sub_weapon_blank_" + n)
			                      , o = s.seekWidgetByName("par_002_sub_weapon_ui");
			                      o.removeAllChildren();
		                        if(_.isUndefined(e.weapon_id)){
									kh.setTouchEventHandlers(s, {
				                        "TOUCH_ENDED btn_sub_weapon_blank": function() {
				                            kh.createInstance("router").navigate("party/par_013", {
				                                party_id: this._a_party_id,
				                                par_013: {
				                                    number: n + 1
				                                }
				                            })
				                        }
			                  	    }, this);
		                        }else{
		                      		this._makeSubWeaponNode(o, e, n);
		                      		if(e.skills&&e.skills.length>0){
					                	var n = o.seekWidgetByName("partysub_weapon")
					                	this._makeWeaponLevelLabel(n,e,87,153);
					                }
		                        }
			                }
			            }, this)
			        },
			        //p父卡片 s,weapon对象,
			        _makeWeaponLevelLabel:function(p,s,x,y){
			        	var txt = new ccui.Text();
						txt.name="level";
						var sk = s.skills[0];
						var calStr = "技能Lv"+sk.level;
						var skillLevel = sk.level;
						var isAtt = sk.description.indexOf("攻撃力")>-1;
						var baseNum = 0;
						if(sk.description.indexOf("中")>-1){
							baseNum = 3;
						}else if(sk.description.indexOf("大")>-1){
							baseNum = 6;
						}
						if(isAtt){
							calStr += "\natt+";
						}else{
							calStr += "\nhp+";
						}
						calStr+=(baseNum+skillLevel*0.5)+"%"
						txt.setString(calStr);
						txt.setPosition(x,y);
						p.addChild(txt);
			        }
			    });
			}

			replacePartyFun();
			 
		}

	},1000);
	
	function store(key,value){
		if(value===undefined){
			return window.localStorage[key];
		}else{
			window.localStorage[key] = value;
		}
	}
});