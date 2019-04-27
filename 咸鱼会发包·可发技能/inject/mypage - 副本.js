$(function(){
	var settings = JSON.parse($("#hiddenDiv").text());
	//console.log(settings);
	var store = yutil.store;
	var hookMethod = yutil.hookMethod;

	
	setTimeout(function(){
		var _http = window.kh.createInstance("HttpConnection");
		
		$("#Cocos2dGameContainer").css("float","left");
		var con = $("<div style='width:240px;float:left;margin-left: 5px;margin-top: 5px;'></div>");
		$("body").append(con);
		
		//主菜单div
		var mainMenuDiv = $("<div></div>");
		con.append(mainMenuDiv);
		//菜单div中的分类按钮
		var statusBtn = $("<button type='button' class='btn'>状态</button>");
		var equipBtn = $("<button type='button' class='btn'>装备</button>");
		var questBtn = $("<button type='button' class='btn'>任务</button>");
		var gachaBtn = $("<button type='button' class='btn'>抽卡</button>");
		var shopBtn = $("<button type='button' class='btn'>商店</button>");
		var calBtn = $("<button type='button' class='btn'>计算</button>");
		var extraBtn =  $("<button type='button' class='btn'>特殊</button>");
		var infoBtn = $("<button type='button' class='btn'>信息</button>");
		mainMenuDiv.append(statusBtn);
		mainMenuDiv.append(equipBtn);
		mainMenuDiv.append(questBtn);
		mainMenuDiv.append(gachaBtn);
		mainMenuDiv.append(shopBtn);
		mainMenuDiv.append(calBtn);
		mainMenuDiv.append(extraBtn);
		mainMenuDiv.append(infoBtn);
		statusBtn.click(function() {
			switchMenu(0);
		});
		equipBtn.click(function() {
			switchMenu(1);
		});
		questBtn.click(function() {
			switchMenu(2);
		});
		gachaBtn.click(function() {
			switchMenu(3);
		});
		shopBtn.click(function() {
			switchMenu(4);
		});
		calBtn.click(function() {
			switchMenu(5);
		});
		extraBtn.click(function() {
			switchMenu(6);
		});
		infoBtn.click(function() {
			showInfo();
		});
		
		//调试用按钮
		//createDebugBtn();
		
		//分割线
		var divideDiv = $("<div style='width:240px;margin:0 auto;margin-top:5px;margin-bottom:5px;border-top:1px solid #ddd'></div>");
		con.append(divideDiv);
		
		//创建二级菜单div
		var secondLevelMenuDiv = $("<div></div>");
		con.append(secondLevelMenuDiv);
		
		//初始化二级菜单
		switchMenu(-1);
		
		//分割线
		var divideDiv = $("<div style='width:240px;margin:0 auto;margin-top:5px;margin-bottom:5px;border-top:1px solid #ddd'></div>");
		con.append(divideDiv);
		
		//log窗口
		var txtDiv = $("<div style='width:100%'></div>");
		con.append(txtDiv);
		var logDiv = $("<div id='id1' style='width:100%;background:white;float:left;height:400px;overflow-y: auto;font-size: small;line-height: 16px;word-break: break-all;word-wrap: break-word;'></div>");
		txtDiv.append(logDiv);
		
		//初始化log窗口
		initLogDivContent();
		
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//常量定义
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//元素定义
		var elementMap = {
			"0":"火",
			"1":"水",
			"2":"风",
			"3":"雷",
			"5":"光",
			"4":"暗",
			"8":"幻"
		};
		
		//神姬类型定义
		var characterTypeMap = {
			"attack": "攻击型",
			"defense": "防御型",
			"balance": "平衡型",
			"heal": "治疗型",
			"special": "技巧型"
		};
		
		//武器技能定义（【类型，基础值，等级增益】未有明确数据的，等级增益设为0）
		var weaponSkillMap = {
			"属性キャラクターの攻撃力UP(小)":["assault", 0, 0.5],
			"属性キャラクターの攻撃力UP(中)":["assault", 3, 0.5],
			"属性キャラクターの攻撃力UP(大)":["assault", 6, 0.5],
			"属性キャラクターの攻撃力UP(特大)":["assault", 10, 1],
			"属性キャラクターの最大HPUP(小)":["defender", 0, 0.5],
			"属性キャラクターの最大HPUP(中)":["defender", 3, 0.5],
			"属性キャラクターの最大HPUP(大)":["defender", 6, 0.5],
			"属性キャラクターの最大HPUP(特大)":["defender", 10, 1],
			"属性攻撃力UP":["ambition", 10, 1],
			"属性キャラクターのHPが少ないほど攻撃力UP(小)":["pride", 0, 0.35, 11.4],	//小：0.35×SLv+12*(1-HP/MHP)	浮动0%~11.4%
			"属性キャラクターのHPが少ないほど攻撃力UP(中)":["pride", 0, 0.5, 11.4],		//中：0.5×SLv+12*(1-HP/MHP)		浮动0%~11.4%
			"属性キャラクターのHPが少ないほど攻撃力UP(大)":["pride", 0, 0.5, 19],		//大：0.5×SLv+20*(1-HP/MHP)		浮动0%~19%
			"属性キャラクターの二段攻撃確率UP(小)":["rush", 0, 0],
			"属性キャラクターの二段攻撃確率UP(中)":["rush", 1, 0],
			"属性キャラクターの二段攻撃確率UP(大)":["rush", 2, 0],
			"属性キャラクターの三段攻撃確率UP(小)":["barrage", 0, 0],
			"属性キャラクターの三段攻撃確率UP(中)":["barrage", 1, 0],
			"属性キャラクターの三段攻撃確率UP(大)":["barrage", 2, 0],
			"属性キャラクターの急所攻撃確率UP(小)":["stinger", 0, 0],
			"属性キャラクターの急所攻撃確率UP(中)":["stinger", 1, 0],
			"属性キャラクターの急所攻撃確率UP(大)":["stinger", 2, 0],
			"属性キャラクターのバースト性能UP(小)":["exceed", 0, 1, 10],
			"属性キャラクターのバースト性能UP(中)":["exceed", 10, 1, 25],
			"属性キャラクターのバースト性能UP(大)":["exceed", 20, 1, 40],
			"属性キャラクターの回復性能UP(小)":["ascension", 4, 1, 3],
			"属性キャラクターの回復性能UP(中)":["ascension", 7, 1, 4],
			"属性キャラクターの回復性能UP(大)":["ascension", 10, 1, 5],
			"属性キャラクターのアビリティ性能UP(小)":["elaborate", 10, 1, 2],
			"属性キャラクターのアビリティ性能UP(中)":["elaborate", 10, 1, 3.5],
			"属性キャラクターのアビリティ性能UP(大)":["elaborate", 10, 1, 5],
			//属性キャラクターの残存HP割合が
			"多いほど攻撃力UP(小)":["vigorous", 8, 0.2],
			"多いほど攻撃力UP(中)":["vigorous", 12, 0.2],
			"多いほど攻撃力UP(大)":["vigorous", 16, 0.2],
			"属性のキャラの連続攻撃確率UP(小)":["ballanche", 0, 0],
			"属性のキャラの連続攻撃確率UP(中)":["ballanche", 1, 0],
			"属性のキャラの連続攻撃確率UP(大)":["ballanche", 2, 0],
			"属性のキャラの攻撃力と三段攻撃確率UP(小)":["triedge", 0, 0.5],
			"属性のキャラの攻撃力と三段攻撃確率UP(中)":["triedge", 3, 0.5],
			"属性のキャラの攻撃力と三段攻撃確率UP(大)":["triedge", 6, 0.5],
			"属性のキャラのHPと攻撃力UP(小)":["strength", 0, 0.5],
			"属性のキャラのHPと攻撃力UP(中)":["strength", 3, 0.5],
			"属性のキャラのHPと攻撃力UP(大)":["strength", 6, 0.5],
			"属性のキャラの攻撃力UP(特大)":["carnage", 10, 1],
			"属性のキャラのHPと回復性能UP(小)":["grace", 0, 0.5, 4, 1],
			"属性のキャラのHPと回復性能UP(中)":["grace", 3, 0.5, 7, 1],
			"属性のキャラのHPと回復性能UP(大)":["grace", 6, 0.5, 10, 1],
			"装備中の「剣」の攻撃・HPステータスUP":["bladeEnhance", 0, 0],	//武器类型强化：30%攻击，45%生命　「剣」を6個以上装備で効果発動
			"装備中の「特殊剣」の攻撃・HPステータスUP":["ripperEnhance", 0, 0],
			"装備中の「槍」の攻撃・HPステータスUP":["sarissaEnhance", 0, 0],
			"装備中の「ハンマー」の攻撃・HPステータスUP":["malletEnhance", 0, 0],
			"装備中の「杖」の攻撃・HPステータスUP":["staffEnhance", 0, 0]
		};
		
		//武器技能前缀定义
		var weaponSkillMapPre = {
			//火
			"ファイア": {
				element: "0",
				type: "小"
			},
			"バーニング": {
				element: "0",
				type: "中"
			},
			"インフェルノ": {
				element: "0",
				type: "大"
			},
			//水
			"アクア": {
				element: "1",
				type: "小"
			},
			"ブリザード": {
				element: "1",
				type: "中"
			},
			"コキュート": {
				element: "1",
				type: "大"
			},
			//风
			"エアロ": {
				element: "2",
				type: "小"
			},
			"ストーム": {
				element: "2",
				type: "中"
			},
			"タービランス": {
				element: "2",
				type: "大"
			},
			//雷
			"サンダー": {
				element: "3",
				type: "小"
			},
			"プラズマ": {
				element: "3",
				type: "中"
			},
			"インパルス": {
				element: "3",
				type: "大"
			},
			//光
			"レイ": {
				element: "5",
				type: "小"
			},
			"シャイン": {
				element: "5",
				type: "中"
			},
			"ルミナ": {
				element: "5",
				type: "大"
			},
			//暗
			"ダーク": {
				element: "4",
				type: "小"
			},
			"アビス": {
				element: "4",
				type: "中"
			},
			"シュバルツ": {
				element: "4",
				type: "大"
			},
			//全
			"1": {
				element: "8",
				type: "小"
			},
			"2": {
				element: "8",
				type: "中"
			},
			"3": {
				element: "8",
				type: "大"
			}
		};
		
		//武器技能后缀定义（根据技能名称分析【类型，基础值，等级增益】未有明确数据的，等级增益设为0）
		var weaponSkillMapSuf = {
			//X属性角色攻击力（攻刃）
			"アサルト": {
				"小": [0, 0.5],
				"中": [3, 0.5],
				"大": [6, 0.5],
				"特大": [10, 1]
			},
			//技能性能
			"エラボレイト" : {
				"小": [10, 1, 2],
				"中": [10, 1, 3.5],
				"大": [10, 1, 5]
			}
		};
		
		//ウェポンスキルのレベルアップに必要な経験値（累計）
		var weaponSkillEnhanceExpTotal = {
			"R": [
					0,5,15,30,50,75,105,140,180,225,
					275,330,390,455,525,600,680,765,855,
					950
				],
			"SR": [
					0,10,30,60,100,150,210,280,360,450,
					550,660,780,910,1050,1200,1360,1530,1710,
					1900
				],
			"SSR": [
					0,20,60,120,200,300,420,560,720,
					900,1100,1320,1560,1820,2100,2400,2720,3060,3420,
					3800,4200,4620,5060,5520,6000,6500,7020,7560,8120,
					8700
				],
			//天宝SSR
			"TSSR": [
					0,30,90,180,300,460,660,910,1210,
					1570,1990,2480,3040,3680,4400,5210,6110,7110,8210,
					9420
				]
		}
		
		//首饰稀有度最高等级
		var accessoryRarityMaxLv = {
			"0":0,
			"N":20,
			"R":30,
			"R强化素材":30,
			"SR":40,
			"SR强化素材":40,
			"SSR":50
		};
		
		//アクセ強化に必要な経験値表（各レベル）
		var accessoryEnhanceExp = [
			0,10,15,20,25,30,35,40,45,50,
			55,60,65,70,75,80,85,90,95,100,
			120,140,160,180,200,220,240,260,280,300,
			320,340,360,380,400,420,440,460,480,500,
			520,540,560,580,600,620,640,660,680,700
		];
		
		//アクセ強化に必要な経験値表（累計）
		var accessoryEnhanceExpTotal = [
			0,0,10,25,45,70,100,135,175,220,
			270,325,385,450,520,595,675,760,850,945,
			1045,1165,1305,1465,1645,1845,2065,2305,2565,2845,
			3145,3465,3805,4165,4545,4945,5365,5805,6265,6745,
			7245,7765,8305,8865,9445,10045,10665,11305,11965,12645,
			13345	
		];
		
		//素材アクセサリーのもつ経験値
		var accessoryBaseExp = {
			"0":0,
			"N":50,
			"R":100,
			"R强化素材":150,
			"SR":200,
			"SR强化素材":300,
			"SSR":400
		};	//异色经验值，同色时*1.5

		//素材のレベルによる経験値増加テーブル
		var accessoryLevelExp = [
			0,0,1,2,3,5,7,9,12,15,
			18,22,26,30,35,40,45,57,69,81,
			95,109,123,139,155,171,189,207,225,245,
			265,285,318,351,384,420,456,492,531,570,
			609,651,693,735,780,825,870,934,998,1062,
			1130
		];
		
		//raid列表
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
		
		//任务翻译列表
		var missionMap = {
			"メインクエストを3回クリアしよう":"主线任务3回",
			"バーストタイムに1回レイドバトルをしよう":"burst time raid 1回",
			"幻獣を3回強化しよう":"幻兽强化3回",
			"幻獣を1回強化しよう":"幻兽强化1回",
			"他のプレイヤーに1回挨拶しよう":"留言1回",
			"幻獣を1回限界突破しよう":"幻兽限界突破1回",
			"ノーマルガチャを5回引こう":"抽卡5回",
			"ノーマルガチャを3回引こう":"抽卡3回",
			"ウェポンを3回売却しよう":"卖武器3回",
			"ウェポンを1回売却しよう":"卖武器1回",
			"幻獣を3回売却しよう":"卖幻兽3回",
			"幻獣を1回売却しよう":"卖幻兽1回",
			"レイドバトルを3回開始しよう":"自己开raid 3回",
			"ウェポンを3回強化しよう":"武器强化3回",
			"ウェポンを1回強化しよう":"武器强化1回",
			"レイドバトルの救援に3回参戦しよう":"raid参战3回",
			"神姫を3回強化しよう":"神姬强化3回",
			"SPクエストを3回クリアしよう":"SP任务完成3回",
			"ユニオンに1回寄付しよう":"工会捐款1回",
			"ウェポンを1回限界突破しよう":"武器限界突破1回",
			"レイドバトルを開始or救援で3回クリアしよう":"raid开或者参战3回",
			"レイドバトルを開始or救援で1回クリアしよう":"raid开或者参战1回",
			"曜日クエストを3回クリアしよう":"曜日本3回",
			"曜日クエストを1回クリアしよう":"曜日本1回",


			"SPクエストを30回クリアしよう":"SP任务完成30回",
			"メインクエストを25回クリアしよう":"主线任务25回",
			"ウェポンを15回強化しよう":"武器强化15回",
			"ウェポンを12回強化しよう":"武器强化12回",
			"ウェポンを10回強化しよう":"武器强化10回",
			"幻獣を15回強化しよう":"幻兽强化15回",
			"幻獣を12回強化しよう":"幻兽强化12回",
			"幻獣を10回強化しよう":"幻兽强化10回",
			"神姫を15回強化しよう":"神姬强化15回",
			"神姫を12回強化しよう":"神姬强化12回",
			"神姫を10回強化しよう":"神姬强化10回",
			"デイリーミッションを15個クリアしよう":"每日任务完成15回",
			"デイリーミッションを20個クリアしよう":"每日任务完成20回",
			"デイリーミッションを25個クリアしよう":"每日任务完成25回",
			"\u30c7\u30a4\u30ea\u30fc\u30df\u30c3\u30b7\u30e7\u30f3\u309225\u500b\u30af\u30ea\u30a2\u3057\u3088\u3046\n\u203b\u30c7\u30a4\u30ea\u30fc\u5831\u916c\u53d7\u53d6\u6642\u306b\u9054\u6210\u56de\u6570\u304c\u30ab\u30a6\u30f3\u30c8\u3055\u308c\u307e\u3059":"每日任务25回且领取报酬",
			// "デイリーミッションを25個クリアしよう↵※デイリー報酬受取時に達成回数がカウントされます":"每日任务25回且领取报酬",
			"デイリーミッションを30個クリアしよう":"每日任务完成30回",
			"曜日クエストを25回クリアしよう":"曜日本25回",
			"曜日クエストを20回クリアしよう":"曜日本20回",
			"曜日クエストを15回クリアしよう":"曜日本15回",
			"レイドバトルを開始or救援で25回クリアしよう":"raid开或者参战25回",
			"レイドバトルを開始or救援で20回クリアしよう":"raid开或者参战20回",
			"レイドバトルを開始or救援で15回クリアしよう":"raid开或者参战15回",

			"イベントクエストを5回クリアしよう":"5次活动本",
			"エリクサーを使用せずに降臨戦Expertクエストをクリアしよう":"不吃大红30AP",
			"SR以下の神姫のみで降臨戦Expertクエストをクリアしよう":"SR以下30AP",
			"エリクサーを使用せずに降臨戦Ultimateクエストをクリアしよう":"不吃大红40AP",
			"SR以下の神姫のみで降臨戦Ultimateクエストをクリアしよう":"SR以下40AP",
			"風属性の神姫・英霊のみで降臨戦Ultimateクエストをクリアしよう":"风属性40AP",
			"エリクサーを使用せずに降臨戦Ragnarokクエストをクリアしよう":"不吃大红0AP",
			"R以下の神姫のみで降臨戦Ultimateクエストをクリアしよう":"R过40AP"
		};
		
		//周常交换物品列表
		var weeklyTreasureExchangeList = 
		[
			55,	//紅焔の龍骨
			46,	//氷凍の龍骨
			37,	//轟雷の龍骨
			28,	//翠風の龍骨
			64,	//閃光の龍骨
			73,	//黒曜の龍骨
			57,	//灼熱の石版
			48,	//氷河の石版
			39,	//電雷の石版
			30,	//竜巻の石版
			66,	//聖光の石版
			75,	//奈落の石版
			82	//聖光石
			//83	//聖光晶
			//84	//大聖光星
		];
		
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//二级菜单定义
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//菜单切换
		function switchMenu(index) {
			secondLevelMenuDiv.empty();
			switch (index) {
				case -1:
					createDefaultBtns();
					break;
				case 0:
					createStatusBtns();
					break;
				case 1:
					createEquipBtns();
					break;
				case 2:
					createQuestBtns();
					break;
				case 3:
					createGachaBtns();
					break;
				case 4:
					createShopBtns();
					break;
				case 5:
					createCalContents();
					break;
				case 6:
					createExtraBtns();
					break;
			}
		};
		
		//创建初始化默认按钮组
		function createDefaultBtns() {
			createStatusBtns();
		};
		
		//创建状态按钮组
		function createStatusBtns() {
			createShowWeaponGainBtn();
			createShowPartyStateBtn();
			createCheckAccessoriesBtn();
		};
		
		//创建装备按钮组
		function createEquipBtns() {
			createEnhanceRCupBtn();
			createEnhanceRCupBonusBtn();
			createEnhanceSRWeaponBtn();
			createEnhanceSRWeapon2Btn();
			createEnhanceSRWeapon3Btn();
			createEnhanceSRWeaponBonusBtn();
			createEnhanceSRCupBtn();
			createSellNAccBtn();
		};
		
		//创建任务按钮组
		function createQuestBtns() {
			createRefreshExistBtn();
			createCheckRaidBtn();
			createCheckMissionBtn();
			createCheckSupportSummonBtn();
			createCollQuestBtn();
		};
		
		//创建抽卡按钮组
		function createGachaBtns() {
			createGachaBtn();
			//createSimGacha10Btn();
		};
		
		//创建商店按钮组
		function createShopBtns() {
			createWeeklyTreasureExchangeBtn();
		};
		
		//创建计算控件组
		function createCalContents() {
			createAccCommonContents();
			createAccRemainExpCalBtn();
			createAccBaseExpCalBtn();
		};
		
		//创建特殊按钮组
		function createExtraBtns() {
			createEnhanceRWeaponBtn();
			createSellSRSumDogFoodBtn();
		};
		
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//功能定义
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//计算武器增益
		function createShowWeaponGainBtn() {
			var showWeaponGainBtn = $("<button type='button' class='btn'>计算攻刃</button>"); 
			secondLevelMenuDiv.append(showWeaponGainBtn);
			showWeaponGainBtn.click(function(){
				emptyLog();
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
								for(var k = 0;k<item.skills.length;k++){
									var sk = item.skills[k];
									var skillLevel = sk.level;
									var descArray = sk.description.split("\n");	
									var description = descArray[0];//取第一行
									var descriptionLine2 = descArray[1];//取第二行
									var elemIndex = description.indexOf("属性");
									if (elemIndex > -1) {
										description = description.slice(elemIndex);
									}
									skillData = weaponSkillMap[description];
									if (typeof(skillData) == "undefined") {
										skillData = weaponSkillMap[descriptionLine2];
									}
									var calItem = calMap[type];
									if(calItem == null) {
										calItem = {};
										calItem.type = type;
										calItem.name = name;
										calItem.assault = 0;
										calItem.defender = 0;
										calItem.ambition = 0;
										calItem.prideLow = 0;
										calItem.prideHigh = 0;
										calItem.rush = 0;
										calItem.rush1 = 0;
										calItem.rush2 = 0;
										calItem.barrage = 0;
										calItem.barrage1 = 0;
										calItem.barrage2 = 0;
										calItem.stinger = 0;
										calItem.stinger1 = 0;
										calItem.stinger2 = 0;
										calItem.exceed = 0;
										calItem.exceed1 = 0;
										calItem.ascension = 0;
										calItem.ascension1 = 0;
										calItem.elaborate = 0;
										calItem.elaborate1 = 0;
										calItem.vigorous = 0;
										calItem.bladeEnhance = 0;
										calItem.ripperEnhance = 0;
										calItem.sarissaEnhance = 0;
										calItem.malletEnhance = 0;
										calItem.staffEnhance = 0;
										calMap[type] = calItem;
									}
									if (typeof(skillData) != "undefined") {
										var skillType = skillData[0];
										var baseNum = skillData[1];
										var powWeight = skillData[2];
										switch (skillType) {
											//攻刃
											case "assault":
												calItem.assault += baseNum + powWeight * skillLevel;
												break;
											//生命
											case "defender":
												calItem.defender += baseNum + powWeight * skillLevel;
												break;
											//属攻
											case "ambition":
												calItem.ambition += baseNum + powWeight * skillLevel;
												break;
											//背水
											case "pride":
												var prideRange = skillData[3];
												calItem.prideLow += baseNum + powWeight * skillLevel;
												calItem.prideHigh += baseNum + powWeight * skillLevel + prideRange;
												break;
											//二连（只计算等级）
											case "rush":
												if (baseNum == 0) {
													calItem.rush += skillLevel;
												} else if (baseNum == 1) {
													calItem.rush1 += skillLevel;
												} else {
													calItem.rush2 += skillLevel;
												}
												break;
											//三连（只计算等级）
											case "barrage":
												if (baseNum == 0) {
													calItem.barrage += skillLevel;
												} else if (baseNum == 1) {
													calItem.barrage1 += skillLevel;
												} else {
													calItem.barrage2 += skillLevel;
												}
												break;
											//急所（只计算等级）
											case "stinger":
												if (baseNum == 0) {
													calItem.stinger += skillLevel;
												} else if (baseNum == 1) {
													calItem.stinger1 += skillLevel;
												} else {
													calItem.stinger2 += skillLevel;
												}
												break;
											//爆裂性能
											case "exceed":
												//爆裂上限
												calItem.exceed += baseNum + powWeight * skillLevel;
												//爆裂伤害
												var baseDamage = skillData[3];
												calItem.exceed1 += baseDamage + powWeight * skillLevel;
												break;
											//恢复性能
											case "ascension":
												//恢复上限
												calItem.ascension += baseNum + powWeight * skillLevel;
												//恢复量
												calItem.ascension1 += skillData[3];
												break;
											//技能性能
											case "elaborate":
												//伤害
												calItem.elaborate += baseNum + powWeight * skillLevel;
												//上限
												var skillUpperLimit = skillData[3];
												calItem.elaborate1 += skillUpperLimit;
												break;
											//旺盛
											case "vigorous":
												//小：(8+SLv*0.2)^(HP/MHP)-(8+SLv*0.2)^0.5
												//中：(12+SLv*0.2)^(HP/MHP)-(12+SLv*0.2)^0.5
												//大：(16+SLv*0.2)^(HP/MHP)-(16+SLv*0.2)^0.5
												calItem.vigorous += baseNum+skillLevel*powWeight - Math.pow((baseNum+skillLevel*powWeight), 0.5);
												break;
											//连击（只计算等级）
											case "ballanche":
												//二连（只计算等级）
												if (baseNum == 0) {
													calItem.rush += skillLevel;
												} else if (baseNum == 1) {
													calItem.rush1 += skillLevel;
												} else {
													calItem.rush2 += skillLevel;
												}
												//三连（只计算等级）
												if (baseNum == 0) {
													calItem.barrage += skillLevel;
												} else if (baseNum == 1) {
													calItem.barrage1 += skillLevel;
												} else {
													calItem.barrage2 += skillLevel;
												}
												break;
											//攻击&三连
											case "triedge":
												//攻刃
												calItem.assault += baseNum + powWeight * skillLevel;
												//三连（只计算等级）
												if (baseNum == 0) {
													calItem.barrage += skillLevel;
												} else if (baseNum == 3) {
													calItem.barrage1 += skillLevel;
												} else {
													calItem.barrage2 += skillLevel;
												}
												break;
											//攻击&HP
											case "strength":
												//攻刃
												calItem.assault += baseNum + powWeight * skillLevel;
												//HP
												calItem.defender += baseNum + powWeight * skillLevel;
												break;
											//特大攻刃
											case "carnage":
												calItem.assault += baseNum + powWeight * skillLevel;
												break;
											//HP&恢复性能
											case "grace":
												//HP
												calItem.defender += baseNum + powWeight * skillLevel;
												//回复性能
												baseNum = skillData[3];
												powWeight = skillData[4];
												calItem.ascension += baseNum + powWeight * skillLevel;
												break;
											//剑强化
											case "bladeEnhance":
												calItem.bladeEnhance += 1;
												break;
											//特殊剑强化
											case "ripperEnhance":
												calItem.ripperEnhance += 1;
												break;
											//枪强化
											case "sarissaEnhance":
												calItem.sarissaEnhance += 1;
												break;
											//锤强化
											case "malletEnhance":
												calItem.malletEnhance += 1;
												break;
											//杖强化
											case "staffEnhance":
												calItem.staffEnhance += 1;
												break;
										}
									}
								}
							}
						}
						for (var key in calMap) {
							var calItem = calMap[key];
							var str = calItem.name + "系:攻刃+" + calItem.assault + "%,血量+" + calItem.defender + "%";
							if (calItem.ambition > 0) {
								str += ",属攻+" + calItem.ambition + "%";
							}
							if (calItem.prideHigh > 0) {
								str += ",背水+" + toDecimal(calItem.prideLow) + "%~" + toDecimal(calItem.prideHigh) + "%";
							}
							if (calItem.rush > 0) {
								str += ",二连(小)Lv" + calItem.rush;
							}
							if (calItem.rush1 > 0) {
								str += ",二连(中)Lv" + calItem.rush1;
							}
							if (calItem.rush2 > 0) {
								str += ",二连(大)Lv" + calItem.rush2;
							}
							if (calItem.barrage > 0) {
								str += ",三连(小)Lv" + calItem.barrage;
							}
							if (calItem.barrage1 > 0) {
								str += ",三连(中)Lv" + calItem.barrage1;
							}
							if (calItem.barrage2 > 0) {
								str += ",三连(大)Lv" + calItem.barrage2;
							}
							if (calItem.stinger > 0) {
								str += ",急所(小)Lv" + calItem.stinger;
							}
							if (calItem.stinger1 > 0) {
								str += ",急所(中)Lv" + calItem.stinger1;
							}
							if (calItem.stinger2 > 0) {
								str += ",急所(大)Lv" + calItem.stinger2;
							}
							if (calItem.exceed > 0) {
								str += ",爆裂性能(伤害+" + calItem.exceed1 + "%,上限+" + calItem.exceed + "%)";
							}
							if (calItem.ascension > 0) {
								str += ",恢复性能(恢复量+" + calItem.ascension1 + "%,上限+" + calItem.ascension + "%)";
							}
							if (calItem.elaborate > 0) {
								str += ",技能性能(伤害+" + calItem.elaborate + "%,上限+" + calItem.elaborate1 + "%)";
							}
							if (calItem.vigorous > 0) {
								str += ",旺盛(最大+" + toDecimal(calItem.vigorous) + "%)";
							}
							if (calItem.bladeEnhance > 0) {
								str += ",剑强化*" + calItem.bladeEnhance;
							}
							if (calItem.ripperEnhance > 0) {
								str += ",特殊剑强化*" + calItem.ripperEnhance;
							}
							if (calItem.sarissaEnhance > 0) {
								str += ",枪强化*" + calItem.sarissaEnhance;
							}
							if (calItem.malletEnhance > 0) {
								str += ",锤强化*" + calItem.malletEnhance;
							}
							if (calItem.staffEnhance > 0) {
								str += ",杖强化*" + calItem.staffEnhance;
							}
							mypageLog(str);
						}
						drawWeaponSkill(e.body.deck.weapons);
					}).fail(function(){
						mypageLog("计算出错或网络请求失败");
					});
				}).fail(function(){
					mypageLog("网络请求失败");
				});
			});
			
			function getWeaponDetail(weaponId){
				return window.kh.createInstance("apiAWeapons").get(weaponId);
			};
			
			function drawWeaponSkill(weapons){
				if(!weapons){
					return;
				}
				var scene = cc.director.getRunningScene();
				var a = scene.seekWidgetByName("par_002_ui");
				if(a==null){
					return;
				}
				var mainWeapon = weapons[0];
				var subWeapons = weapons.slice(1);
				var r = a.seekWidgetByName("partymain_weapon");
				if(r==null){
					return;
				}
				if (!_.isUndefined(mainWeapon.weapon_id)){
					if(mainWeapon.skills&&mainWeapon.skills.length>0){
						var n = a.seekWidgetByName("partymain_weapon")
						makeWeaponLevelLabel(n,mainWeapon,"main", 0);
					}
				}
				_.each(subWeapons, function(e, n) {
					if (!(n >= 9)) {
						var s = a.seekWidgetByName("sub_weapon_blank_" + n)
							, i = n
						  , o = s.seekWidgetByName("par_002_sub_weapon_ui");
						if(!_.isUndefined(e.weapon_id)){
							if(e.skills&&e.skills.length>0){
								var n = o.seekWidgetByName("partysub_weapon")
								makeWeaponLevelLabel(n,e,"sub", i);
							}
						}
					}
				});
			};
			
			//p父卡片 s,weapon对象,
			function makeWeaponLevelLabel(p,s,type, i){
				if(p.seekWidgetByName("slevel" + i)!=null){
					//已经绘制
					//return;
					//删除前次绘制的txt   2017.7.7 swebok modified
					p.removeChild(p.seekWidgetByName("slevel" + i));
					p.removeChild(p.seekWidgetByName("calTxt" + i));
				}
				var txt = new ccui.Text();
				txt.name="slevel" + i;
				var sk = s.skills[0];
				var calStr = "SLv."+sk.level;
				var skillLevel = sk.level;
				txt.setString(calStr);
				txt.setTextAreaSize({width:100,height:0});
				txt.setTextHorizontalAlignment(2)
				if(type=="main"){
					txt.setPosition(140,470);
				}else{
					txt.setPosition(55,140);
				}
				p.addChild(txt);
				var line = 0;
				for(var i=0;i<s.skills.length;i++){
					var calTxt = new ccui.Text();
					calTxt.name="calTxt" + i;
					var sk = s.skills[i];
					var skillLevel = sk.level;
					var descArray = sk.description.split("\n");	//取第一行
					var description = descArray[0];
					var descriptionLine2 = descArray[1];
					var elemIndex = description.indexOf("属性");
					if (elemIndex > -1) {
						description = description.slice(elemIndex);
					}
					skillData = weaponSkillMap[description];
					if (typeof(skillData) == "undefined") {
						skillData = weaponSkillMap[descriptionLine2];
					}
					var mainStr, str, str1;
					if (typeof(skillData) != "undefined") {
						var skillType = skillData[0];
						var baseNum = skillData[1];
						var powWeight = skillData[2];
						switch (skillType) {
							//攻刃
							case "assault":
							case "carnage":
								str = "+" + (baseNum + powWeight * skillLevel) + "%";
								mainStr = "ATK" + str;
								break;
							//生命
							case "defender":
								str = "+" + (baseNum + powWeight * skillLevel) + "%";
								mainStr = "MHP" + str;
								break;
							//属攻
							case "ambition":
								mainStr = "EAT+" + (baseNum + powWeight * skillLevel) + "%";
								break;
							//背水
							case "pride":
								var prideRange = skillData[3];
								var prideLow = baseNum + powWeight * skillLevel;
								var prideHigh = baseNum + powWeight * skillLevel + prideRange;
								mainStr = "背水+" + toDecimal(prideLow) + "~" + toDecimal(prideHigh) + "%";
								
								break;
							//二连（只计算等级）
							case "rush":
								if (baseNum == 0) {
									mainStr = "二连(小)Lv" + skillLevel;
								} else if (baseNum == 1) {
									mainStr = "二连(中)Lv" + skillLevel;
								} else {
									mainStr = "二连(大)Lv" + skillLevel;
								}
								break;
							//三连（只计算等级）
							case "barrage":
								if (baseNum == 0) {
									mainStr = "三连(小)Lv" + skillLevel;
								} else if (baseNum == 1) {
									mainStr = "三连(中)Lv" + skillLevel;
								} else {
									mainStr = "三连(大)Lv" + skillLevel;
								}
								break;
							//急所（只计算等级）
							case "stinger":
								if (baseNum == 0) {
									mainStr = "急所(小)Lv" + skillLevel;
								} else if (baseNum == 1) {
									mainStr = "急所(中)Lv" + skillLevel;
								} else {
									mainStr = "急所(大)Lv" + skillLevel;
								}
								break;
							//爆裂性能
							case "exceed":
								mainStr = "爆裂上限+" + (baseNum + powWeight * skillLevel) + "%";
								break;
							//恢复性能
							case "ascension":
								//恢复上限
								mainStr = "恢复上限+" + (baseNum + powWeight * skillLevel) + "%";
								break;
							//技能性能
							case "elaborate":
								mainStr = "技伤+" + (baseNum + powWeight * skillLevel) + "%";
								break;
							//旺盛
							case "vigorous":
								//小：(8+SLv*0.2)^(HP/MHP)-(8+SLv*0.2)^0.5
								//中：(12+SLv*0.2)^(HP/MHP)-(12+SLv*0.2)^0.5
								//大：(16+SLv*0.2)^(HP/MHP)-(16+SLv*0.2)^0.5
								mainStr = "旺盛+" + toDecimal(baseNum+skillLevel*powWeight-Math.pow((baseNum+skillLevel*powWeight), 0.5)) + "%";
								break;
							//连击
							case "ballanche":
								if (baseNum == 0) {
									mainStr = "二连(小)Lv" + skillLevel;
								} else if (baseNum == 1) {
									mainStr = "二连(中)Lv" + skillLevel;
								} else {
									mainStr = "二连(大)Lv" + skillLevel;
								}
								mainStr += "\n";
								if (baseNum == 0) {
									mainStr = "三连(小)Lv" + skillLevel;
								} else if (baseNum == 1) {
									mainStr = "三连(中)Lv" + skillLevel;
								} else {
									mainStr = "三连(大)Lv" + skillLevel;
								}
								break;
							//攻刃三连
							case "triedge":
								str = "+" + (baseNum + powWeight * skillLevel) + "%";
								if (baseNum == 0) {
									str1 = "三连(小)Lv" + skillLevel;
								} else if (baseNum == 3) {
									str1 = "三连(中)Lv" + skillLevel;
								} else {
									str1 = "三连(大)Lv" + skillLevel;
								}
								mainStr = "ATK" + str + "\n" + str1;
								break;
							//攻刃HP
							case "strength":
								str = "+" + (baseNum + powWeight * skillLevel) + "%";
								str1 = "+" + (baseNum + powWeight * skillLevel) + "%";
								mainStr = "ATK" + str;
								mainStr1 = "HP" + str1;								
							//HP&恢复性能
							case "grace":
								//HP
								str = "+" + (baseNum + powWeight * skillLevel) + "%";
								//回复性能
								baseNum = skillData[3];
								powWeight = skillData[4];
								str1 = "恢复上限+" + (baseNum + powWeight * skillLevel) + "%";
								mainStr = "MHP" + str + "\n" + str1;
								break;
							//剑强化
							case "bladeEnhance":
								mainStr = "剑强化";
								break;
							//特殊剑强化
							case "ripperEnhance":
								mainStr = "特殊剑强化";
								break;
							//枪强化
							case "sarissaEnhance":
								mainStr = "枪强化";
								break;
							//锤强化
							case "malletEnhance":
								mainStr = "锤强化";
								break;
							//杖强化
							case "staffEnhance":
								mainStr = "杖强化";
								break;
							default:
								mainStr = "";
								break;
						}
						if(type=="main"){
							calTxt.setString(mainStr);
							calTxt.setTextAreaSize({width:100,height:0});
							calTxt.setTextHorizontalAlignment(2);							
							calTxt.setPosition(140,450-20*i);
						}else{
							calTxt.setTextAreaSize({width:40,height:0});
							calTxt.setFontSize(12);
							calTxt.setScale(0.8);
							if(skillType == "assault" || skillType == "carnage"){
								calTxt.setString(str);
								calTxt.setPosition(39,35);
							} else if (skillType == "defender"){
								calTxt.setString(str);
								calTxt.setPosition(39,55);
							} else if (skillType == "triedge"){
								calTxt.setString(str);
								calTxt.setPosition(39,35);
								var calTxt1 = new ccui.Text();
								calTxt1.setTextAreaSize({width:40,height:0});
								calTxt1.setFontSize(12);
								calTxt1.setScale(0.8);
								calTxt1.name="calTxt1" + i;
								calTxt1.setString(str1);
								calTxt1.setPosition(20,115-15*line);
								line += 1;
								p.addChild(calTxt1);
							} else if (skillType == "strength"){
								calTxt.setString(str);
								calTxt.setPosition(39,35);
								var calTxt1 = new ccui.Text();
								calTxt1.setTextAreaSize({width:40,height:0});
								calTxt1.setFontSize(12);
								calTxt1.setScale(0.8);
								calTxt1.setString(str);
								calTxt1.setPosition(39,55);
								p.addChild(calTxt1);
							} else if (skillType == "grace"){
								calTxt.setString(str);
								calTxt.setPosition(39,55);
								var calTxt1 = new ccui.Text();
								calTxt1.setTextAreaSize({width:40,height:0});
								calTxt1.setFontSize(12);
								calTxt1.setScale(0.8);
								calTxt1.name="calTxt1" + i;
								calTxt1.setString(str1);
								calTxt1.setPosition(20,115-15*line);
								line += 1;
								p.addChild(calTxt1);
							} else {
								calTxt.setString(mainStr);
								calTxt.setPosition(20,115-15*line);
								line += 1;
							}
						}		
					}	
					p.addChild(calTxt);
				}
			};
		};
		
		//显示队伍状态
		function createShowPartyStateBtn() {
			var showPartyStateBtn = $("<button type='button' class='btn'>队伍状态</button>");
			secondLevelMenuDiv.append(showPartyStateBtn);
			showPartyStateBtn.click(function(){
				emptyLog();
				mypageLog("开始获取信息");
				window.kh.createInstance("apiAParties").getSelectedDeck().then(function(e) {
					//获取Ex技能
					var partyId = e.body.a_party_id;
					//输出队伍ID
					mypageLog("队伍ID：" + partyId);
					var deck = e.body.deck;
					console.log(deck);
					window.kh.createInstance("apiAParties").getExAbilitiesByParty(e.body.a_party_id).then(function(e) {
						var data = e.body.data;
						var exSkill;
						console.log(data);
						if(typeof(data) != "undefined" && data != null) {
							for(var i = 0; i < data.length; i++) {
								if (data[i].is_set) {
									exSkill = data[i];
								}
							}
						}
						//队伍名
						mypageLog("队伍名：" + deck.name);
						//英灵名
						mypageLog("英灵：" + deck.job.name);
						//英灵属性
						mypageLog("英灵属性：" + elementMap[deck.job.element_type]);
						//Ex技
						if (typeof(exSkill) != "undefined") {
							mypageLog("英灵Ex：" + exSkill.name + "(" + exSkill.description + ")");
						} else {
							mypageLog("英灵Ex：无");
						}
						//神姬稀有度、属性、类型
						var rareDic = {"SSR": 0, "SR": 0,"R": 0};  
						var elementType = [0, 0, 0, 0, 0, 0, 0];
						var characterTypeDic = {"attack": 0, "defense": 0, "balance": 0, "heal": 0, "special": 0};
						for (var i = 0; i < deck.characters.length; i++) {
							var character = deck.characters[i];
							if (typeof(character) != "undefined") {
								rareDic[character.rare] += 1;
								elementType[character.element_type] += 1;
								characterTypeDic[character.character_type] += 1;
							}
						}
						mypageLog("神姬稀有度：SSR(" + rareDic["SSR"] + "),SR(" + rareDic["SR"] + "),R(" + rareDic["R"] + ")");
						str = "神姬属性：";
						for (var i = 0; i < elementType.length; i++) {
							if (elementType[i] > 0) {
								str += elementMap[i] + "(" + elementType[i].toString() + "),";
							}
						}
						mypageLog(str);
						str = "神姬类型：";
						for (var key in characterTypeDic) {
							if (characterTypeDic[key] > 0) {
								str += characterTypeMap[key] + "(" + characterTypeDic[key] + "),";
							}
						}
						mypageLog(str);
						
					}).fail(playFailHandler);
				}).fail(playFailHandler);
			});
		};
		
		//检查首饰
		function createCheckAccessoriesBtn() {
		};
		
		//强化R武器
		function createEnhanceRWeaponBtn() {
			var enhanceRWeaponBtn = $("<button type='button' class='btn'>强化R武器到Lv2</button>");
			secondLevelMenuDiv.append(enhanceRWeaponBtn);
			enhanceRWeaponBtn.click(function(){
				emptyLog();
				//获取武器数组
				mypageLog("开始获取SR武器和R武器信息");
				var srWeaponArr = [];
				var rWeaponArr = [];
				_http.get({
					url: kh.env.urlRoot+ "/a_weapons",
					json: {
						//selectable_base_filter: "sellable",
						page: 1,
						per_page: 500
					}
				}).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							//过滤R武器
							if(item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.bonus==0&&item.attack>100&&!item.is_equipped&&!item.is_locked) {
								rWeaponArr.push(item.a_weapon_id);
							}
						});
					}
					mypageLog("总计未强化R武器数量"+rWeaponArr.length);
					batchEnhanceRWeapon(rWeaponArr);	//批量强化R武器
				}).fail(playFailHandler);
			});
			
			//批量强化R武器
			function batchEnhanceRWeapon(weaponArr) {
				var actTargetWeaponArr = weaponArr.splice(0,1);
				var actWeaponArr = weaponArr.splice(0,1);
				if (actTargetWeaponArr.length>0 && actWeaponArr.length>0) {
					kh.createInstance("apiAWeapons").enhance(actTargetWeaponArr[0], actWeaponArr[0]).then(function(e) {
						mypageLog("R武器强化lv1->lv2完毕");
						batchEnhanceRWeapon(weaponArr);
					}).fail(playFailHandler);
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			};
		};
		
		//强化R圣杯
		function createEnhanceRCupBtn() {
			var enhanceRCupBtn = $("<button type='button' class='btn'>强化R圣杯到lv4</button>");
			secondLevelMenuDiv.append(enhanceRCupBtn);
			enhanceRCupBtn.click(function(){
				emptyLog();
				//获取R圣杯和R武器数组
				mypageLog("开始获取R圣杯和R武器信息");
				var rCupArr = [];
				var rWeaponArr = [];
				_http.get({
					url: kh.env.urlRoot+ "/a_weapons",
					json: {
						//selectable_base_filter: "sellable",
						page: 1,
						per_page: 500
					}
				}).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							//过滤R圣杯
							if(item.weapon_id==6000&&item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&!item.is_equipped&&!item.is_locked){
								rCupArr.push(item.a_weapon_id);
							}
							//过滤R武器
							if(item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.bonus==0&&item.attack>100&&!item.is_equipped&&!item.is_locked) {
								rWeaponArr.push(item.a_weapon_id);
							}
						});
					}
					mypageLog("总计未强化R圣杯数量"+rCupArr.length);
					mypageLog("总计未强化R武器数量"+rWeaponArr.length);
					batchEnhanceRCup(rCupArr, rWeaponArr);	//批量强化R圣杯
				}).fail(playFailHandler);
			});
			
			//批量强化R圣杯
			function batchEnhanceRCup(targetCupArr, weaponArr) {
				var actTargetCupArr = targetCupArr.splice(0,1);
				var actWeaponArr = weaponArr.splice(0,3);
				if (actTargetCupArr.length>0 && actWeaponArr.length==3) {
					kh.createInstance("apiAWeapons").enhance(actTargetCupArr[0], actWeaponArr).then(function(e) {
						mypageLog("R圣杯强化lv1->lv4完毕");
						batchEnhanceRCup(targetCupArr, weaponArr); 
					}).fail(playFailHandler);
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			};
		};
		
		//强化R圣杯(+1)
		function createEnhanceRCupBonusBtn() {
			var enhanceRCupBonusBtn = $("<button type='button' class='btn'>强化R圣杯到lv4++</button>");
			secondLevelMenuDiv.append(enhanceRCupBonusBtn);
			enhanceRCupBonusBtn.click(function(){
				emptyLog();
				//获取R圣杯和R武器数组
				mypageLog("开始获取R圣杯和R+1武器信息");
				var rCupArr = [];
				var rWeaponArr = [];
				_http.get({
					url: kh.env.urlRoot+ "/a_weapons",
					json: {
						//selectable_base_filter: "sellable",
						page: 1,
						per_page: 500
					}
				}).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							//过滤R圣杯
							if(item.weapon_id==6000&&item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&!item.is_equipped&&!item.is_locked){
								rCupArr.push(item.a_weapon_id);
							}
							//过滤R武器
							if(item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.bonus==1&&item.attack>100&&!item.is_equipped&&!item.is_locked) {
								rWeaponArr.push(item.a_weapon_id);
							}
						});
					}
					mypageLog("总计未强化R圣杯数量"+rCupArr.length);
					mypageLog("总计未强化R+1武器数量"+rWeaponArr.length);
					batchEnhanceRCup(rCupArr, rWeaponArr);	//批量强化R圣杯
				}).fail(playFailHandler);
			});
			
			//批量强化R圣杯
			function batchEnhanceRCup(targetCupArr, weaponArr) {
				var actTargetCupArr = targetCupArr.splice(0,1);
				var actWeaponArr = weaponArr.splice(0,3);
				if (actTargetCupArr.length>0 && actWeaponArr.length==3) {
					kh.createInstance("apiAWeapons").enhance(actTargetCupArr[0], actWeaponArr).then(function(e) {
						mypageLog("R圣杯强化lv1->lv4完毕");
						batchEnhanceRCup(targetCupArr, weaponArr); 
					}).fail(playFailHandler);
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			};
		};
		
		//强化SR武器到4
		function createEnhanceSRWeaponBtn() {
			var enhanceSRWeaponBtn = $("<button type='button' class='btn'>强化SR武器到lv4</button>");
			secondLevelMenuDiv.append(enhanceSRWeaponBtn);
			enhanceSRWeaponBtn.click(function(){
				emptyLog();
				//获取SR武器和R武器数组
				mypageLog("开始获取SR武器和R武器信息");
				var srWeaponArr = [];
				var rWeaponArr = [];
				_http.get({
					url: kh.env.urlRoot+ "/a_weapons",
					json: {
						//selectable_base_filter: "sellable",
						page: 1,
						per_page: 500
					}
				}).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							//过滤SR武器（SR圣杯基础攻击150）
							if(item.rare=="SR"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.attack>160&&!item.is_equipped&&!item.is_locked){
								srWeaponArr.push(item.a_weapon_id);
							}
							//过滤R武器
							if(item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.bonus==0&&item.attack>100&&!item.is_equipped&&!item.is_locked) {
								rWeaponArr.push(item.a_weapon_id);
							}
						});
					}
					mypageLog("总计未强化SR武器数量"+srWeaponArr.length);
					mypageLog("总计未强化R武器数量"+rWeaponArr.length);
					batchEnhanceSRWeapon(srWeaponArr, rWeaponArr);	//批量强化SR武器
				}).fail(playFailHandler);
			});
			
			//批量强化SR武器
			function batchEnhanceSRWeapon(targetWeaponArr, weaponArr) {
				var actTargetWeaponArr = targetWeaponArr.splice(0,1);
				var actWeaponArr = weaponArr.splice(0,6);
				if (actTargetWeaponArr.length>0 && actWeaponArr.length==6) {
					kh.createInstance("apiAWeapons").enhance(actTargetWeaponArr[0], actWeaponArr).then(function(e) {
						mypageLog("SR武器强化lv1->lv4完毕");
						batchEnhanceSRWeapon(targetWeaponArr, weaponArr);
					}).fail(playFailHandler);
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			};
		};
		
		//强化SR武器到2
		function createEnhanceSRWeapon2Btn() {
			var enhanceSRWeapon2Btn = $("<button type='button' class='btn'>强化SR武器到lv2</button>");
			secondLevelMenuDiv.append(enhanceSRWeapon2Btn);
			enhanceSRWeapon2Btn.click(function(){
				emptyLog();
				//获取SR武器和R武器数组
				mypageLog("开始获取SR武器和R武器信息");
				var srWeaponArr = [];
				var rWeaponArr = [];
				_http.get({
					url: kh.env.urlRoot+ "/a_weapons",
					json: {
						//selectable_base_filter: "sellable",
						page: 1,
						per_page: 500
					}
				}).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							//过滤SR武器（SR圣杯基础攻击150）
							if(item.rare=="SR"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.attack>160&&!item.is_equipped&&!item.is_locked){
								srWeaponArr.push(item.a_weapon_id);
							}
							//过滤R武器
							if(item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.bonus==0&&item.attack>100&&!item.is_equipped&&!item.is_locked) {
								rWeaponArr.push(item.a_weapon_id);
							}
						});
					}
					mypageLog("总计未强化SR武器数量"+srWeaponArr.length);
					mypageLog("总计未强化R武器数量"+rWeaponArr.length);
					batchEnhanceSRWeapon2(srWeaponArr, rWeaponArr);	//批量强化SR武器
				}).fail(playFailHandler);
			});
			
			//批量强化SR武器2
			function batchEnhanceSRWeapon2(targetWeaponArr, weaponArr) {
				var actTargetWeaponArr = targetWeaponArr.splice(0,1);
				var actWeaponArr = weaponArr.splice(0,1);
				if (actTargetWeaponArr.length>0 && actWeaponArr.length==1) {
					kh.createInstance("apiAWeapons").enhance(actTargetWeaponArr[0], actWeaponArr[0]).then(function(e) {
						mypageLog("SR武器强化lv1->lv2完毕");
						batchEnhanceSRWeapon2(targetWeaponArr, weaponArr);
					}).fail(playFailHandler);
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			};
		};
		
		//强化SR武器到3
		function createEnhanceSRWeapon3Btn() {
			var enhanceSRWeapon3Btn = $("<button type='button' class='btn'>强化SR武器到lv3</button>");
			secondLevelMenuDiv.append(enhanceSRWeapon3Btn);
			enhanceSRWeapon3Btn.click(function(){
				emptyLog();
				//获取SR武器和R武器数组
				mypageLog("开始获取SR武器和R武器信息");
				var srWeaponArr = [];
				var rWeaponArr = [];
				_http.get({
					url: kh.env.urlRoot+ "/a_weapons",
					json: {
						//selectable_base_filter: "sellable",
						page: 1,
						per_page: 500
					}
				}).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							//过滤SR武器（SR圣杯基础攻击150）
							if(item.rare=="SR"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.attack>160&&!item.is_equipped&&!item.is_locked){
								srWeaponArr.push(item.a_weapon_id);
							}
							//过滤R武器
							if(item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.bonus==0&&item.attack>100&&!item.is_equipped&&!item.is_locked) {
								rWeaponArr.push(item.a_weapon_id);
							}
						});
					}
					mypageLog("总计未强化SR武器数量"+srWeaponArr.length);
					mypageLog("总计未强化R武器数量"+rWeaponArr.length);
					batchEnhanceSRWeapon3(srWeaponArr, rWeaponArr);	//批量强化SR武器
				}).fail(playFailHandler);
			});
			
			//批量强化SR武器3
			function batchEnhanceSRWeapon3(targetWeaponArr, weaponArr) {
				var actTargetWeaponArr = targetWeaponArr.splice(0,1);
				var actWeaponArr = weaponArr.splice(0,3);
				if (actTargetWeaponArr.length>0 && actWeaponArr.length==3) {
					kh.createInstance("apiAWeapons").enhance(actTargetWeaponArr[0], actWeaponArr[0]).then(function(e) {
						mypageLog("SR武器强化lv1->lv2完毕");
						batchEnhanceSRWeapon2(targetWeaponArr, weaponArr);
					}).fail(playFailHandler);
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			};
		};
		
		//强化SR武器到4(+1)
		function createEnhanceSRWeaponBonusBtn() {
			var enhanceSRWeaponBonusBtn = $("<button type='button' class='btn'>强化SR武器到lv4++</button>");
			secondLevelMenuDiv.append(enhanceSRWeaponBonusBtn);
			enhanceSRWeaponBonusBtn.click(function(){
				emptyLog();
				//获取SR武器和R武器数组
				mypageLog("开始获取SR武器和R+1武器信息");
				var srWeaponArr = [];
				var rWeaponArr = [];
				_http.get({
					url: kh.env.urlRoot+ "/a_weapons",
					json: {
						//selectable_base_filter: "sellable",
						page: 1,
						per_page: 500
					}
				}).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							//过滤SR武器（SR圣杯基础攻击150）
							if(item.rare=="SR"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.attack>160&&!item.is_equipped&&!item.is_locked){
								srWeaponArr.push(item.a_weapon_id);
							}
							//过滤R武器
							if(item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.bonus==1&&item.attack>100&&!item.is_equipped&&!item.is_locked) {
								rWeaponArr.push(item.a_weapon_id);
							}
						});
					}
					mypageLog("总计未强化SR武器数量"+srWeaponArr.length);
					mypageLog("总计未强化R+1武器数量"+rWeaponArr.length);
					batchEnhanceSRWeapon(srWeaponArr, rWeaponArr);	//批量强化SR武器
				}).fail(playFailHandler);
			});
			
			//批量强化SR武器
			function batchEnhanceSRWeapon(targetWeaponArr, weaponArr) {
				var actTargetWeaponArr = targetWeaponArr.splice(0,1);
				var actWeaponArr = weaponArr.splice(0,6);
				if (actTargetWeaponArr.length>0 && actWeaponArr.length==6) {
					kh.createInstance("apiAWeapons").enhance(actTargetWeaponArr[0], actWeaponArr).then(function(e) {
						mypageLog("SR武器强化lv1->lv4完毕");
						batchEnhanceSRWeapon(targetWeaponArr, weaponArr);
					}).fail(playFailHandler);
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			};
		};
		
		//强化SR圣杯
		function createEnhanceSRCupBtn() {
			var enhanceSRCupBtn = $("<button type='button' class='btn'>强化SR圣杯到lv5</button>");
			secondLevelMenuDiv.append(enhanceSRCupBtn);
			enhanceSRCupBtn.click(function(){
				emptyLog();
				//获取R圣杯和R武器数组
				mypageLog("开始获取SR圣杯和R武器信息");
				var srCupArr = [];
				var rWeaponArr = [];
				_http.get({
					url: kh.env.urlRoot+ "/a_weapons",
					json: {
						//selectable_base_filter: "sellable",
						page: 1,
						per_page: 500
					}
				}).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							//过滤SR圣杯
							if(item.weapon_id==5000&&item.rare=="SR"&&item.level==1&&item.exp==0&&item.skill_level==1&&!item.is_equipped&&!item.is_locked){
								srCupArr.push(item.a_weapon_id);
							}
							//过滤R武器
							if(item.rare=="R"&&item.level==1&&item.exp==0&&item.skill_level==1&&item.bonus==0&&item.attack>100&&!item.is_equipped&&!item.is_locked) {
								rWeaponArr.push(item.a_weapon_id);
							}
						});
					}
					mypageLog("总计未强化SR圣杯数量"+srCupArr.length);
					mypageLog("总计未强化R武器数量"+rWeaponArr.length);
					batchEnhanceSRCup(srCupArr, rWeaponArr);	//批量强化SR圣杯
				}).fail(playFailHandler);
			});
			
			//批量强化SR圣杯
			function batchEnhanceSRCup(targetCupArr, weaponArr) {
				var actTargetCupArr = targetCupArr.splice(0,1);
				var actWeaponArr = weaponArr.splice(0,10);
				if (actTargetCupArr.length>0 && actWeaponArr.length==10) {
					kh.createInstance("apiAWeapons").enhance(actTargetCupArr[0], actWeaponArr).then(function(e) {
						mypageLog("SR圣杯强化lv1->lv5完毕");
						batchEnhanceSRCup(targetCupArr, weaponArr);
					}).fail(playFailHandler);
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			};
		};
		
		//出售SR幻兽狗粮
		function createSellSRSumDogFoodBtn() {
			var sellSRSumDogFoodBtn = $("<button type='button' class='btn'>卖SR幻兽狗粮</button>");
			secondLevelMenuDiv.append(sellSRSumDogFoodBtn);
			sellSRSumDogFoodBtn.click(function(){
				emptyLog();
				mypageLog("开始获取SR幻兽狗粮信息");
				_http.get({
					url: kh.env.urlRoot+ "/a_summons",
					json: {
						selectable_base_filter: "sellable",
						page: 1,
						per_page: 500
					}
				}).then(function(e){
					var data = e.body.data;
					var sellArr = [];
					if(data&&data.length>0){
						_.each(data,function(item,i){
							//过滤SR卡
							if(item.can_sell&&item.level==1&&item.exp==0&&item.rare=="SR"&&item.bonus==0&&item.overlimit_count==0&&item.attack==12&&!item.is_equipped&&!item.is_locked){
								sellArr.push(item.a_summon_id);
							}
						});
					}
					mypageLog("获取SR狗粮数量"+sellArr.length);
					batchSellSummon(sellArr);
				}).fail(playFailHandler);
			});
			
			function batchSellSummon(sellArr){
				var actSellArr = sellArr.splice(0,20);
				if(actSellArr.length>0){
					kh.createInstance("apiASummons").sell(actSellArr).then(function(e) {
						mypageLog("出售"+actSellArr.length+"张卡完毕");
						batchSellSummon(sellArr);
					}).fail(playFailHandler);	
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			}
		};
		
		//出售N首饰
		function createSellNAccBtn() {
			var sellNAccBtn = $("<button type='button' class='btn'>卖n首饰</button>");
			secondLevelMenuDiv.append(sellNAccBtn);
			sellNAccBtn.click(function(){
				emptyLog();
				sellNAcc();
			});
			
			function sellNAcc() {
				window.kh.createInstance("apiAAccessories").getRecommendSellableList().then(function(e) {
					if(0 === e.body.max_record_count){
						mypageLog("N首饰数量0");
					}else{
						var sellArr = [];
						for(var i=0;i<e.body.data.length;i++){
							sellArr.push(e.body.data[i].a_accessory_id);
						}
						mypageLog("N首饰数量"+sellArr.length);
						window.kh.createInstance("apiAAccessories").sell(sellArr).then(function(e) {
							mypageLog("出售完毕");
							if(sellArr.length >= 20){
								//继续卖出
								sellNAcc();
							}
						}).fail(playFailHandler);
					}
				}).fail(playFailHandler);
			};
		};
		
		//刷新存在
		function createRefreshExistBtn() {
			var refreshExistBtn = $("<button type='button' class='btn'>刷新存在</button>");
			secondLevelMenuDiv.append(refreshExistBtn);
			refreshExistBtn.click(function(){
				emptyLog();
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
		};
		
		//检查raid
		function createCheckRaidBtn() {
			var checkRaidBtn = $("<button type='button' class='btn'>检查raid</button>");
			secondLevelMenuDiv.append(checkRaidBtn);
			checkRaidBtn.click(function(){
				emptyLog();
				mypageLog("开始检查raid信息");
				_http.get({
					url: "/v1/a_battles",
					json: {
						kind: "raid_request"
					}
				}).then(function(data){
					if(data.body.max_record_count==0){
						mypageLog("无raid");
					}else{
						var recommendItem = null;

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
							if (typeof(item) != "undefined" && item != null) {
								mypageLog((i+1)+":"+item.enemy_name+" lv"+item.enemy_level+",血量:"+item.enemy_hp
									+"/"+item.enemy_max+",消耗bp:"+item.battle_bp+",人数:"+item.participants+",已参加:"
									+item.is_joined);
								//+",战斗id:"+item.a_battle_id+",任务id:"+item.a_quest_id
							}
						});
					}
				});
			});
		};
		
		//检查任务
		function createCheckMissionBtn() {
			var checkMissionBtn = $("<button type='button' class='btn'>检查任务</button>");
			secondLevelMenuDiv.append(checkMissionBtn);
			checkMissionBtn.click(function(){
				emptyLog();

				var missionApi = kh.createInstance("apiAMissions");
				var printEvt = function(ret,name){
					var str = name+":";
					if(ret.complete){
						str+="已完成";
					}else{
						str+="未完成";
						_.each(ret.missions,function(item,i){
							var des = missionMap[item.description];
							des = des||item.description;
							str +="<br/>"+des+":"+item.now_progress+"/"+item.max_progress;
						});
					}
					mypageLog(str);
				}
				Q.all([missionApi.getDaily(),missionApi.getWeekly(),missionApi.getEvent()]).spread(function(daily,weekly,evt){
					printEvt(evt.body,"活动任务");
					mypageLog("");
					printEvt(daily.body,"日常任务");
					mypageLog("");
					printEvt(weekly.body,"周常任务");
				});
			});
		};
		
		
		//检查支援
		function createCheckSupportSummonBtn() {
		};
		
		//领日常奖励
		function createCollQuestBtn() {
			var collQuestBtn = $("<button type='button' class='btn'>领日常奖励</button>");
			secondLevelMenuDiv.append(collQuestBtn);
			collQuestBtn.click(function(){
				emptyLog();
				collQuestBtn.prop("disabled",true);
				var missionApi = kh.createInstance("apiAMissions");
				Q.all([missionApi.getDaily(),missionApi.getWeekly(),missionApi.getEvent()]).spread(function(daily,weekly,evt){
					var pro = Promise.resolve();
					var pushReceiveReward = function(body,type,funArr){
						if(!body.complete){
							_.each(body.missions,function(item,i){
								if(item.clear){
									funArr.push(function(){
										return missionApi.receiveMissionReward(type,item.a_mission_id);	
									});
								}
							});
						}
					}
					var funArr = [];
					pushReceiveReward(daily.body,"daily",funArr);
					pushReceiveReward(weekly.body,"weekly",funArr);
					pushReceiveReward(evt.body,"event",funArr);
					funArr.reduce(function(curr,next){
						return curr.then(next);
					},pro).then(function(){
						if(funArr.length>0){
							mypageLog("领取任务完毕");
						}else{
							mypageLog("无任务可领取");		
						}

						collQuestBtn.prop("disabled",false);
					});
				});
			});
		};
		
		//抽金币
		function createGachaBtn() {
			var normalGachaBtn = $("<button type='button' class='btn'>normal卡池抽卡</button>");
			secondLevelMenuDiv.append(normalGachaBtn);
			normalGachaBtn.click(function(){
				emptyLog();
				continuePlay();
				
				function continuePlay(){
					var gachaApi = window.kh.createInstance("apiAGacha");
					gachaApi.getCategory("normal").then(function(e){
						var isMax = e.body["is_max_weapon_or_summon"];
						if(isMax){
							mypageLog("武器或幻兽满 停止执行");
							return;
						}
						var groups = e.body.groups;
						if(groups&&groups[0]&&groups[0].gacha_id == 191){
							gachaApi.getCheckUsing(10).then(function(e){
								if(e.body.after_num ==e.body.before_num){
									mypageLog("开始每日免费10连");
									gachaApi.playGacha("normal", 191).then(function(e) {
										if(handleGachaResult(e)){
											continuePlay();
										}
									}).fail(playFailHandler);
								}else{
									mypageLog("金币数量计算出现问题,放弃抽卡");
									return;
								}
							}).fail(playFailHandler);
						}else if(groups&&groups.length>0&&groups[0].gacha_id==9&&groups[0].enabled){
							gachaApi.getCheckUsing(9).then(function(e){
								mypageLog("抽卡价格"+groups[0].price);
								if(groups[0].price<500){
									mypageLog("少于5抽,放弃抽卡");
									return;
								}else if(e.body.before_num<500){
									mypageLog("金币数量小于500,放弃抽卡");
									return;
								}else if(e.body.before_num - e.body.after_num == groups[0].price){
									mypageLog("开始"+groups[0].gacha_count+"次抽取");
									gachaApi.playGacha("normal", 9).then(function(e) {
										if(handleGachaResult(e)){
											continuePlay();
										}
									}).fail(playFailHandler);
								}else{
									mypageLog("金币数量计算出现问题,放弃抽卡");
									return;
								}
							}).fail(playFailHandler);
						}else{
							gachaApi.getCheckUsing(8).then(function(e){
								if(e.body.before_num<200){
									mypageLog("金币数量小于200,放弃抽卡");
									return;
								}else{
									mypageLog("武器或幻兽剩余空间少于2个,停止执行");
									return;
								}
							}).fail(playFailHandler);
						}
					}).fail(playFailHandler);
				};

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
					mypageLog("n武器"+weaponN+"个,r武器"+weaponR+"个,n幻兽"+sumN+"个,r幻兽"+sumR+"个");
					if(sumN==0&&sumR==0&&weaponN==0&&weaponR==0){
						mypageLog("未抽出东西,停止执行");
						return false;
					}
					return true;
				};
			});
		};
		
		//模拟十连
		function createSimGacha10Btn() {
			var simGacha10Btn = $("<button type='button' class='btn'>模拟十连</button>");
			secondLevelMenuDiv.append(simGacha10Btn);
			simGacha10Btn.click(function(){
				var settings = JSON.parse($("#hiddenDiv").text());
				var extensionId = settings.extensionId;
				var img1 = $("<img src='chrome-extension://" + extensionId + "/img/corecard_item_0123.jpg' width='150' height='150'/>");
				logDiv.append(img1);
			});
		}
		
		//周常交换物品
		function createWeeklyTreasureExchangeBtn() {
			var weeklyTreasureExchangeBtn = $("<button type='button' class='btn'>周常兑换</button>");
			secondLevelMenuDiv.append(weeklyTreasureExchangeBtn);
			weeklyTreasureExchangeBtn.click(function(){
				var index = -1;
				var itemArr = [];
				emptyLog();
				//获取满足要求的商店宝藏信息并交换
				mypageLog("开始获取商店宝藏信息");
				var obj = window.kh.createInstance("apiShop");
				window.kh.createInstance("apiShop").getShop(4).then(function(e){
					var products = e.body.catalogs[2].products;
				}).fail(playFailHandler);
				//return;
				window.kh.createInstance("apiShop").getShop(4).then(function(e){
					var data = e.body.catalogs[2].products;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							index = weeklyTreasureExchangeList.indexOf(item.game_item.item_id);
							if (typeof(item) != "undefined" 	//物品存在
								&& index > -1 	//在列表中
								&& item.stock_info.amount > 0 	//剩余兑换次数>0
								&& item.materials[0].current_amount >= item.materials[0].required_amount*item.stock_info.amount) {	//材料大于等于需要
								itemArr.push(item);
							}
						});
					}
					mypageLog("获取列表完毕");
					batchExchange(itemArr);
				}).fail(playFailHandler);
			});
			
			//批量交换物品（1种换1种）
			function batchExchange(itemArr) {
				var actItemArr = itemArr.splice(0,1);
				if (actItemArr.length > 0) {
					var item = actItemArr[0];
					//window.kh.createInstance("apiShop").exchangeTreasuresTreasure(item.product_id, 1).then(function(e) {
					_http.post({
						url: kh.env.urlRoot+ "/shop",
						json: {
							product_id: item.product_id,
							amount: item.stock_info.amount
						}
					}).then(function(e) {
						mypageLog("交换物品:" + item.materials[0].name + "*" 
						+ (item.materials[0].required_amount*item.stock_info.amount)
						+ " -> " + item.game_item.name + "*" + item.stock_info.amount);
						batchExchange(itemArr);
					}).fail(playFailHandler);
				}else{
					//执行完毕
					mypageLog("执行完毕");
				}
			};
		};
		
		//首饰计算通用项
		function createAccCommonContents() {
			//稀有度下拉项
			var itemRaritySelect = $("<select id=\"itemRaritySelect\">" +
				"<option value=\"0\">选择稀有度</option>" +
				"<option value=\"N\">N</option>" +
				"<option value=\"R\">R</option>" +
				"<option value=\"SR\">SR</option>" +
				"<option value=\"SSR\">SSR</option>" +
				"</select>");
			secondLevelMenuDiv.append(itemRaritySelect);
			//当前等级输入框
			var itemLvInput = $("<input type=\"text\" id=\"itemLvInput\" name=\"exp\" value=\"输入当前等级\"></input>");
			secondLevelMenuDiv.append(itemLvInput);
			//到下一等级需要经验输入框
			var itemRemainExpInput = $("<input type=\"text\" id=\"itemExpInput\" name=\"exp\" value=\"输入当前等级剩余经验\"></input>");
			secondLevelMenuDiv.append(itemRemainExpInput);
		};
		
		//首饰剩余经验值计算
		function createAccRemainExpCalBtn() {
			var accRemainExpBtn = $("<button type='button' class='btn'>首饰剩余经验</button>");
			secondLevelMenuDiv.append(accRemainExpBtn);
			accRemainExpBtn.click(function(){
				emptyLog();
				//根据控件ID获取控件对象
				var itemRaritySelect = document.getElementById("itemRaritySelect");
				var itemLvInput = document.getElementById("itemLvInput");
				var itemRemainExpInput = document.getElementById("itemRemainExpInput");
				var lv = parseInt(itemLvInput.value);
				var maxLv = accessoryRarityMaxLv[itemRaritySelect.value];
				var nextLvExp = accessoryEnhanceExpTotal[Math.min(lv+1, maxLv)];
				var maxExp = accessoryEnhanceExpTotal[maxLv];
				var lvRemainExp = parseInt(itemExpInput.value);
				var gainedExp = nextLvExp - lvRemainExp;
				var totalRemainExp = maxExp - gainedExp;
				mypageLog("首饰稀有度：" + itemRaritySelect.value);
				mypageLog("首饰lv：" + itemLvInput.value);
				mypageLog("首饰满级总共需要exp：" + maxExp);
				mypageLog("首饰距离下一等级需要exp：" + itemExpInput.value);
				mypageLog("首饰已获得exp：" + gainedExp);
				mypageLog("首饰距离满级需要exp：" + totalRemainExp);
			});
		};
		
		//首饰提供经验值计算
		function createAccBaseExpCalBtn() {
			var accBaseExpBtn = $("<button type='button' class='btn'>首饰提供经验</button>");
			secondLevelMenuDiv.append(accBaseExpBtn);
			accBaseExpBtn.click(function(){
				emptyLog();
				//根据控件ID获取控件对象
				var itemRaritySelect = document.getElementById("itemRaritySelect");
				var itemLvInput = document.getElementById("itemLvInput");
				var itemRemainExpInput = document.getElementById("itemRemainExpInput");
				var lv = parseInt(itemLvInput.value);
				var rarityExp = accessoryBaseExp[itemRaritySelect.value];
				var levelExp = accessoryLevelExp[itemLvInput.value];
				mypageLog("首饰稀有度：" + itemRaritySelect.value);
				mypageLog("首饰lv：" + itemLvInput.value);
				mypageLog("首饰可提供exp（异色）：" + (rarityExp + levelExp));
				mypageLog("首饰可提供exp（同色）：" + Math.ceil((rarityExp + levelExp) * 1.5));
			});
		};
		
		//显示信息
		function showInfo() {
			emptyLog();
			mypageLog("修改：swebok");
			mypageLog("更新日期：2019/1/3");
			mypageLog("暗号：535942143，想入工会的进");
			mypageLog("更新日志：");
			mypageLog("1/3：狗粮喂法增加");
			mypageLog("10/7：狗粮喂法变更；攻刃显示问题以后再改");
			mypageLog("7/27：增加了计算攻刃的内容，包含部分幻武；");
			mypageLog("金币功能不打算修正了。");
			mypageLog("0.0.18.4：金币功能修正；");
			mypageLog("商店日常交换改为周常交换；");
			mypageLog("首饰剩余经验计算功能；");
			mypageLog("首饰提供经验计算功能；");
			mypageLog("武器强化功能修正；");
			mypageLog("增加和修改了随机出现的图片。");
			mypageLog("0.0.18.3：战斗界面刷新快捷键：z；");
			mypageLog("商店自动交换修正；");
			mypageLog("特殊分类（非常用功能）：增加R武器强化到lv2功能（未经测试）；");
			mypageLog("0.0.18.2：计算攻刃更新背水中小；");
			mypageLog("自动强化无视已装备武器。")
			mypageLog("0.0.18.1：增加领日常奖励功能；");
			mypageLog("日常兑换更新；");
			mypageLog("修正卖出N首饰错误。");
			mypageLog("0.0.18.0：UI全面更新；");
			mypageLog("增加队伍状态检查、卖N首饰、日常兑换、自动战斗功能；");
			mypageLog("计算攻刃更新；");
			mypageLog("随机出现的图片数量由3种增加到14种，并不再需要修改插件ID。");
		};
		
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//文本框操作
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//清除文本
		function emptyLog() {
			logDiv.empty();
		};
		
		//打印文本
		function mypageLog(str) {
			logDiv.append(str+"<br/>");
		};
		
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//出错句柄
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//出错时文本框显示执行失败
		function playFailHandler(){
			mypageLog("执行失败");
		};
		
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//保留至多两位小数
		/////////////////////////////////////////////////////////////////////////////////////////////////
		function toDecimal(x) { 
			var f = parseFloat(x); 
			if (isNaN(f)) { 
				return; 
			} 
			f = Math.round(x*100)/100; 
			return f; 
		} ;
		
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//调试方法
		/////////////////////////////////////////////////////////////////////////////////////////////////
		//调试按钮
		function createDebugBtn() {
			var debugBtn = $("<button type='button' class='btn'>调试</button>");
			mainMenuDiv.append(debugBtn);
			var textArea = $("<textarea>");
			mainMenuDiv.append(textArea);
			debugBtn.click(function(){
				emptyLog();
				var obj = window.kh;
				textArea.append(JSON.stringify(window.kh.Api));
				window.console.log("123");
				//mypageLog(JSON.stringify(window.kh));
				//mypageLog(window.kh.createInstance("apiAParties"));
				//console.log(window.kh.createInstance("apiAWeapons"));
				//console.log(window.kh.createInstance("apiASummons"));
				//console.log(window.kh.createInstance("apiAParties"));
				/*window.kh.createInstance("apiAParties").getDeck("selected").then(function(e) {
					var deck = e.body.deck;
					console.log(e);
					if(deck&&deck.length>0){
						_.each(deck,function(item,i){
							console.log(item);
						});
					}
				}).fail(playFailHandler);*/
				/*window.kh.createInstance("apiACharacters").getList("", 1, 200).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							console.log(item);
						});
					}
				}).fail(playFailHandler);*/
				/*window.kh.createInstance("apiASummons").getSupporters(0).then(function(e){
					var data = e.body.data;
					if(data&&data.length>0){
						_.each(data,function(item,i){
							console.log(item);
						});
					}
				}).fail(playFailHandler);*/
				//console.log(window.kh.createInstance("apiAAccessories"));
				//console.log(window.kh.createInstance("apiShop"));
			});
		};
		
		function initLogDivContent() {
			heightArr = [142, 244, 199, 284, 143, 107, 132, 276, 114, 133, 262, 218, 349,240,243,135,268,248,268];
			extArr = ["jpg","jpg","jpg","jpg","jpg","gif","jpg","jpg","jpg","jpg","jpg","jpg","jpg","gif","jpg","jpg","jpg","jpg","jpg"]
			var index = 1 + Math.floor(19*Math.random());
			var settings = JSON.parse($("#hiddenDiv").text());
			var extensionId = settings.extensionId;
			var img = $("<img src='chrome-extension://" + extensionId + "/img/img" + index + "." + extArr[index-1] + "' width='240' height='" + heightArr[index-1] + "'/>");
			logDiv.append(img);
		}
		
		
	},1000);

});

//备考
//mypageLog(logDiv.height(200));  修改div高度