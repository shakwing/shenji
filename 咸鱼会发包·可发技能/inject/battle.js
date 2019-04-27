$(function(){
	var settings = JSON.parse($("#hiddenDiv").text());
	console.log(settings);

	var store = yutil.store;
	var hookMethod = yutil.hookMethod;
	function timeInit(){
		///a_quests/5000572?json=%7B%22type%22%3A%22main%22%7D
		//GET  json:{"type":"main"}

		///a_parties_decks
		//{"decks":[{"a_party_id":1978959,"party_name":"\u30d1\u30fc\u30c6\u30a3A","in_use":false,"selected":true,"job":{"id":18,"element_type":5},"characters":[{"id":6009,"element_type":5,"bonus_point":0,"rare":"SR","skin":0},{"id":3,"element_type":5,"bonus_point":0,"rare":"SSR","skin":0},{"id":24,"element_type":5,"bonus_point":0,"rare":"SR","skin":0},{"id":5008,"element_type":5,"bonus_point":0,"rare":"SSR","skin":0},{"id":89,"element_type":4,"bonus_point":0,"rare":"SSR","skin":0},{"id":6005,"element_type":0,"bonus_point":0,"rare":"SR","skin":0}],"leader_summon":{"id":30,"rare":"SSR","element_type":3,"name":"\u30b5\u30f3\u30c0\u30fc\u30d0\u30fc\u30c9","level":40,"attack_description":"\u6575\u5168\u4f53\u306b\u96f7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u4e8c\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7\uff08\u5927\uff09","effect_description":"\u96f7\u30fb\u5149\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c40%\u30a2\u30c3\u30d7","bonus_point":89,"skin":0}},{"a_party_id":1978960,"party_name":"\u30d1\u30fc\u30c6\u30a3B","in_use":false,"selected":false,"job":{"id":12,"element_type":5},"characters":[{"id":24,"element_type":5,"bonus_point":0,"rare":"SR","skin":0},{"id":3,"element_type":5,"bonus_point":0,"rare":"SSR","skin":0},{"id":6001,"element_type":5,"bonus_point":0,"rare":"SR","skin":0},{"id":5008,"element_type":5,"bonus_point":0,"rare":"SSR","skin":0},{"id":6009,"element_type":5,"bonus_point":0,"rare":"SR","skin":0},{"id":5003,"element_type":4,"bonus_point":0,"rare":"SSR","skin":0}],"leader_summon":{"id":30,"rare":"SSR","element_type":3,"name":"\u30b5\u30f3\u30c0\u30fc\u30d0\u30fc\u30c9","level":40,"attack_description":"\u6575\u5168\u4f53\u306b\u96f7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u4e8c\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7\uff08\u5927\uff09","effect_description":"\u96f7\u30fb\u5149\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c40%\u30a2\u30c3\u30d7","bonus_point":89,"skin":0}},{"a_party_id":1978961,"party_name":"\u30d1\u30fc\u30c6\u30a3C","in_use":false,"selected":false,"job":{"id":12,"element_type":5},"characters":[{"id":24,"element_type":5,"bonus_point":0,"rare":"SR","skin":0},{"id":3,"element_type":5,"bonus_point":0,"rare":"SSR","skin":0},{"id":5008,"element_type":5,"bonus_point":0,"rare":"SSR","skin":0},{"id":89,"element_type":4,"bonus_point":0,"rare":"SSR","skin":0},{"id":6001,"element_type":5,"bonus_point":0,"rare":"SR","skin":0},{"id":7001,"element_type":5,"bonus_point":0,"rare":"R","skin":0}],"leader_summon":{"id":30,"rare":"SSR","element_type":3,"name":"\u30b5\u30f3\u30c0\u30fc\u30d0\u30fc\u30c9","level":40,"attack_description":"\u6575\u5168\u4f53\u306b\u96f7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u4e8c\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7\uff08\u5927\uff09","effect_description":"\u96f7\u30fb\u5149\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c40%\u30a2\u30c3\u30d7","bonus_point":89,"skin":0}},{"a_party_id":1978962,"party_name":"\u30d1\u30fc\u30c6\u30a3D","in_use":false,"selected":false,"job":{"id":12,"element_type":5},"characters":[{"id":24,"element_type":5,"bonus_point":0,"rare":"SR","skin":0},{"id":3,"element_type":5,"bonus_point":0,"rare":"SSR","skin":0},{"id":5008,"element_type":5,"bonus_point":0,"rare":"SSR","skin":0},{"id":6001,"element_type":5,"bonus_point":0,"rare":"SR","skin":0},{"id":7006,"element_type":1,"bonus_point":0,"rare":"R","skin":0},{"id":7004,"element_type":0,"bonus_point":0,"rare":"R","skin":0}],"leader_summon":{"id":30,"rare":"SSR","element_type":3,"name":"\u30b5\u30f3\u30c0\u30fc\u30d0\u30fc\u30c9","level":40,"attack_description":"\u6575\u5168\u4f53\u306b\u96f7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u4e8c\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7\uff08\u5927\uff09","effect_description":"\u96f7\u30fb\u5149\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c40%\u30a2\u30c3\u30d7","bonus_point":89,"skin":0}},{"a_party_id":1978963,"party_name":"\u30d1\u30fc\u30c6\u30a3E","in_use":false,"selected":false,"job":{"id":1,"element_type":1},"characters":[{},{},{},{},{},{}],"leader_summon":{"id":1,"rare":"SR","element_type":4,"name":"\u30c7\u30a3\u30a2\u30dc\u30ed\u30b9","level":30,"attack_description":"\u6575\u5168\u4f53\u306b\u95c7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u5927\uff09","effect_description":"\u5168\u5c5e\u6027\u30ad\u30e3\u30e9\u30af\u30bf\u30fc\u306eHP\u3068\u653b\u6483\u529b10%\u30a2\u30c3\u30d7","bonus_point":0,"skin":0}},{"a_party_id":1978964,"party_name":"\u30d1\u30fc\u30c6\u30a3F","in_use":false,"selected":false,"job":{"id":1,"element_type":1},"characters":[{},{},{},{},{},{}],"leader_summon":{"id":1,"rare":"SR","element_type":4,"name":"\u30c7\u30a3\u30a2\u30dc\u30ed\u30b9","level":30,"attack_description":"\u6575\u5168\u4f53\u306b\u95c7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u5927\uff09","effect_description":"\u5168\u5c5e\u6027\u30ad\u30e3\u30e9\u30af\u30bf\u30fc\u306eHP\u3068\u653b\u6483\u529b10%\u30a2\u30c3\u30d7","bonus_point":0,"skin":0}}]}

		///a_players/me/quest_points
		//{"quest_points":{"ap":27,"bp":0,"max_ap":85,"max_bp":5,"ap_recover_time":"\u3042\u30682\u6642\u959354\u5206","bp_recover_time":"\u3042\u30681\u6642\u959340\u5206"}}

		///a_summons/supporters
		//{"data":[{"a_supporter_id":325993,"is_friend":true,"login_state_str":"5\u5206\u524d","player_info":{"a_player_id":325993,"name":"\u8987\u738b","rank":68},"summon_info":{"a_summon_id":74555273,"summon_id":44,"bonus":99,"level":70,"name":"\u30a6\u30ed\u30dc\u30ed\u30b9","attack_description":"\u6575\u5168\u4f53\u306b\u95c7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u95c7\u4ed8\u4e0e","effect_description":"\u95c7\u30fb\u96f7\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c50%\u30a2\u30c3\u30d7","rare":"SSR","element_type":4,"skin":0}},{"a_supporter_id":118519,"is_friend":true,"login_state_str":"1\u5206\u524d","player_info":{"a_player_id":118519,"name":"\u30b3\u30b7\u30a4","rank":70},"summon_info":{"a_summon_id":27117189,"summon_id":30,"bonus":55,"level":100,"name":"\u30b5\u30f3\u30c0\u30fc\u30d0\u30fc\u30c9","attack_description":"\u6575\u5168\u4f53\u306b\u96f7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u4e8c\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7\uff08\u5927\uff09","effect_description":"\u96f7\u30fb\u5149\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c60%\u30a2\u30c3\u30d7","rare":"SSR","element_type":3,"skin":0}},{"a_supporter_id":596976,"is_friend":true,"login_state_str":"9\u5206\u524d","player_info":{"a_player_id":596976,"name":"\u672a\u8317","rank":36},"summon_info":{"a_summon_id":37316143,"summon_id":1,"bonus":0,"level":7,"name":"\u30c7\u30a3\u30a2\u30dc\u30ed\u30b9","attack_description":"\u6575\u5168\u4f53\u306b\u95c7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u5927\uff09","effect_description":"\u5168\u5c5e\u6027\u30ad\u30e3\u30e9\u30af\u30bf\u30fc\u306eHP\u3068\u653b\u6483\u529b10%\u30a2\u30c3\u30d7","rare":"SR","element_type":4,"skin":0}},{"a_supporter_id":164616,"is_friend":true,"login_state_str":"15\u5206\u524d","player_info":{"a_player_id":164616,"name":"\u56db\u6708\u4e00\u65e5","rank":63},"summon_info":{"a_summon_id":34472507,"summon_id":27,"bonus":37,"level":40,"name":"\u30d9\u30d2\u30e2\u30b9","attack_description":"\u6575\u5168\u4f53\u306b\u98a8\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u72b6\u614b\u7570\u5e38\u30921\u3064\u56de\u5fa9","effect_description":"\u98a8\u30fb\u5149\u30fb\u6c34\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c30%\u30a2\u30c3\u30d7","rare":"SSR","element_type":2,"skin":0}},{"a_supporter_id":20677,"is_friend":true,"login_state_str":"27\u5206\u524d","player_info":{"a_player_id":20677,"name":"Rosario","rank":76},"summon_info":{"a_summon_id":48833904,"summon_id":30,"bonus":10,"level":40,"name":"\u30b5\u30f3\u30c0\u30fc\u30d0\u30fc\u30c9","attack_description":"\u6575\u5168\u4f53\u306b\u96f7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u4e8c\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7\uff08\u5927\uff09","effect_description":"\u96f7\u30fb\u5149\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c40%\u30a2\u30c3\u30d7","rare":"SSR","element_type":3,"skin":0}},{"a_supporter_id":14756,"is_friend":false,"login_state_str":"13\u5206\u524d","player_info":{"a_player_id":14756,"name":"\u5f69\u2606\u2605\u2606","rank":64},"summon_info":{"a_summon_id":18781187,"summon_id":6002,"bonus":1,"level":55,"name":"\u9cf3\u51f0","attack_description":"\u6575\u5168\u4f53\u306b\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u72b6\u614b\u7570\u5e38\u8010\u6027\u30a2\u30c3\u30d7\uff08\u4e2d\uff09","effect_description":"\u5149\u5c5e\u6027\u306e\u653b\u6483\u529b35\uff05\/\u96f7\u5c5e\u6027\u306e\u653b\u6483\u529b30\uff05\u30a2\u30c3\u30d7","rare":"SSR","element_type":5,"skin":0}},{"a_supporter_id":68454,"is_friend":false,"login_state_str":"3\u5206\u524d","player_info":{"a_player_id":68454,"name":"\u30cb\u30b1","rank":71},"summon_info":{"a_summon_id":5614739,"summon_id":27,"bonus":4,"level":40,"name":"\u30d9\u30d2\u30e2\u30b9","attack_description":"\u6575\u5168\u4f53\u306b\u98a8\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u72b6\u614b\u7570\u5e38\u30921\u3064\u56de\u5fa9","effect_description":"\u98a8\u30fb\u5149\u30fb\u6c34\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c30%\u30a2\u30c3\u30d7","rare":"SSR","element_type":2,"skin":0}},{"a_supporter_id":192680,"is_friend":false,"login_state_str":"1\u5206\u524d","player_info":{"a_player_id":192680,"name":"kamuichan","rank":62},"summon_info":{"a_summon_id":22532845,"summon_id":45,"bonus":32,"level":40,"name":"\u30a8\u30ad\u30c9\u30ca","attack_description":"\u6575\u5168\u4f53\u306b\u95c7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5e7b\u60d1\u4ed8\u4e0e","effect_description":"\u95c7\u30fb\u706b\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c40%\u30a2\u30c3\u30d7","rare":"SSR","element_type":4,"skin":0}},{"a_supporter_id":320837,"is_friend":false,"login_state_str":"14\u5206\u524d","player_info":{"a_player_id":320837,"name":"\u306f\u3084\u3066","rank":67},"summon_info":{"a_summon_id":74412821,"summon_id":6005,"bonus":23,"level":85,"name":"\u30b5\u30f3\u30c0\u30eb\u30d5\u30a9\u30f3","attack_description":"\u6575\u5168\u4f53\u306b\u96f7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u4e09\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7","effect_description":"\u96f7\u5c5e\u6027\u30ad\u30e3\u30e9\u306e\u653b\u6483\u529b40%\u30a2\u30c3\u30d7\/HP15%\u30a2\u30c3\u30d7","rare":"SSR","element_type":3,"skin":0}},{"a_supporter_id":657091,"is_friend":false,"login_state_str":"9\u5206\u524d","player_info":{"a_player_id":657091,"name":"\u3050\u3060\u5b50","rank":61},"summon_info":{"a_summon_id":41276776,"summon_id":45,"bonus":84,"level":40,"name":"\u30a8\u30ad\u30c9\u30ca","attack_description":"\u6575\u5168\u4f53\u306b\u95c7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5e7b\u60d1\u4ed8\u4e0e","effect_description":"\u95c7\u30fb\u706b\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c40%\u30a2\u30c3\u30d7","rare":"SSR","element_type":4,"skin":0}}],"max_record_count":10}





		///a_quest_info
		//{"current_a_world_id":329473,"current_a_area_id":1624349,"current_area_id":5,"next_a_area_id":1624349,"next_a_quest_id":5000572,"in_progress":{"help_raid_ids":[],"is_unverified":false},"max_battle_count":3,"has_temp_quest":false,"has_new_raid_request":true,"has_unverified":false,"has_new_harem":true,"has_follow_up_quest":false,"has_unlocked_quest":false,"has_unlocked_area":false,"has_completed_last_main_quest":false}

		///a_parties/1978959
		//PUT {selected: true}
		//{"result":null}

		///a_quests/5000572/start
		//POST {type: "main", a_party_id: 1978959, support_a_summon_id: 34472507}
		//{"a_quest_id":5000572,"next_info":{"id":"141_main","next_kind":"talk"}}

		///a_quests/5000572/next_state
		//{type: "main"}
		//{"a_quest_id":5000572,"next_info":{"id":13235611,"next_kind":"battle"}}
//过图reload
		///a_battles/13236635/start?json=%7B%22quest_type%22%3A%22main%22%7D
		//GET json:{"quest_type":"main"}
		//{"turn":{"number":0,"summon_used":false},"stage":{"current":3,"max":3,"bgm_id":1,"background_id":26,"has_rare_monster":false},"enemy":[{"id":1011,"level":26,"name":"\u30a2\u30df\u30a4","hp":14000,"hpmax":14000,"start_animation":"idle","has_mode_gauge":0,"max_charge_turn":2,"current_charge_turn":0,"mode_gauge_percent":"0.00","current_mode":"none","hit_se_id":39},{"id":1011,"level":26,"name":"\u30a2\u30df\u30a4","hp":14000,"hpmax":14000,"start_animation":"idle","has_mode_gauge":0,"max_charge_turn":2,"current_charge_turn":0,"mode_gauge_percent":"0.00","current_mode":"none","hit_se_id":39}],"character":[{"name":"\u30e2\u30eb\u30c9\u30ec\u30c3\u30c9","hp":6283,"hpmax":6283,"start_animation":"idle","burst":50,"burst_name":"\u30c0\u30fc\u30af\u30f4\u30ec\u30a4\u30f4\u30a1\u30fc","burst_description":"\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u5927\uff09\u2605\u30c0\u30e1\u30fc\u30b8\u30a2\u30c3\u30d7","id":18,"is_job":true,"element_type":5,"hit_se_id":2,"skin":0},{"name":"\u30a6\u30e9\u30cc\u30b9","hp":5863,"hpmax":5863,"start_animation":"idle","burst":20,"burst_name":"\u30ab\u30a4\u30b6\u30fc\u30a4\u30f3\u30d5\u30a7\u30eb\u30ce+","burst_description":"\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8(\u5927)\u2605\u30c0\u30e1\u30fc\u30b8\u30a2\u30c3\u30d7","id":6009,"is_job":false,"element_type":5,"hit_se_id":44,"skin":0},{"name":"\u30bd\u30eb","hp":6353,"hpmax":6353,"start_animation":"idle","burst":20,"burst_name":"\u30db\u30ef\u30a4\u30c8\u30fb\u30d7\u30ed\u30df\u30cd\u30f3\u30b9+","burst_description":"\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8(\u7279\u5927)\u2605\u30c0\u30e1\u30fc\u30b8\u30a2\u30c3\u30d7","id":3,"is_job":false,"element_type":5,"hit_se_id":8,"skin":0},{"name":"\u30a2\u30eb\u30c6\u30df\u30b9","hp":5903,"hpmax":5903,"start_animation":"idle","burst":0,"burst_name":"\u30a2\u30eb\u30ab\u30c7\u30a3\u30a2\u30d0\u30fc\u30b9\u30c8+","burst_description":"\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8(\u5927)\u2605\u30c0\u30e1\u30fc\u30b8\u30a2\u30c3\u30d7","id":24,"is_job":false,"element_type":5,"hit_se_id":14,"skin":0},{"name":"\u30e9\u30d5\u30a1\u30a8\u30eb","hp":6283,"hpmax":6283,"start_animation":"idle","burst":0,"burst_name":"\u30a8\u30f3\u30b8\u30a7\u30eb\u30ba\u30d5\u30a3\u30fc\u30eb+","burst_description":"\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8(\u7279\u5927)\u2605\u30c0\u30e1\u30fc\u30b8\u30a2\u30c3\u30d7","id":5008,"is_job":false,"element_type":5,"hit_se_id":43,"skin":0}],"sub":[{"name":"\u30a2\u30e2\u30f3[\u9b54\u529b\u89e3\u653e]","hp":6325,"hpmax":6325,"start_animation":"idle","burst":0,"burst_name":"\u30d8\u30eb\u30ba\u30ce\u30ef\u30fc\u30eb+","burst_description":"\u95c7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8(\u7279\u5927)\u2605\u30c0\u30e1\u30fc\u30b8\u30a2\u30c3\u30d7","id":89,"is_job":false,"element_type":4,"hit_se_id":21,"skin":0},{"name":"\u30a2\u30b0\u30cb","hp":5253,"hpmax":5253,"start_animation":"idle","burst":0,"burst_name":"\u708e\u821e\u4e71\u821e","burst_description":"\u706b\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8(\u5927)","id":6005,"is_job":false,"element_type":0,"hit_se_id":37,"skin":0}],"fallen":[],"ability":[[{"name":"\u30a2\u30a6\u30c8\u30ec\u30a4\u30b8","description":"\u6575\u306b\u81ea\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\/\u653b\u6483\u30fb\u9632\u5fa1\u30c0\u30a6\u30f3\u30fb\u6bd2\u30fb\u708e\u7344\u30fb\u8150\u6557\u30fb\u6eba\u6c34\u30fb\u95c7\u30fb\u5e7b\u60d1\u4ed8\u4e0e","color":"red","type":31,"turn":8,"party_member_selectable":false,"duration":"180\u79d2"},{"name":"\u6804\u67af\u76db\u8870","description":"\u5473\u65b9\u5168\u4f53\u306e\u72b6\u614b\u7570\u5e38\u8010\u6027\u30a2\u30c3\u30d7\/\u6575\u5168\u4f53\u306e\u72b6\u614b\u7570\u5e38\u8010\u6027\u30c0\u30a6\u30f3","color":"blue","type":44,"turn":6,"party_member_selectable":false,"duration":"180\u79d2 3\u30bf\u30fc\u30f3"},{"name":"\u30d6\u30e9\u30c3\u30af\u30fb\u30d7\u30ed\u30d1\u30ac\u30f3\u30c0","description":"\u6575\u306e\u6700\u5927\u30c1\u30e3\u30fc\u30b8\u30bf\u30fc\u30f3\u5897\u52a0","color":"blue","type":43,"turn":7,"party_member_selectable":false,"duration":"180\u79d2"},{"name":"\u95c7\u8a0e\u3061","description":"\u6575\u306b\u81ea\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\/\u9632\u5fa1\u30c0\u30a6\u30f3(\u5927)","color":"red","type":25,"turn":6,"party_member_selectable":false,"duration":"180\u79d2"}],[{"name":"\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0\u30b9\u30bf\u30fc+","description":"\u6575\u5168\u4f53\u306b1.5\uff5e2\u500d\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\u2605\u30bf\u30fc\u30f3\u77ed\u7e2e","color":"red","type":33,"turn":5,"party_member_selectable":false},{"name":"\u30ae\u30e3\u30e9\u30af\u30b7\u30fc\u30a8\u30ca\u30b8\u30fc+","description":"\u5473\u65b9\u5168\u4f53\u306e\u653b\u6483\u30a2\u30c3\u30d7(\u4e2d)\u2605\u30bf\u30fc\u30f3\u77ed\u7e2e","color":"yellow","type":15,"turn":5,"party_member_selectable":false,"duration":"3\u30bf\u30fc\u30f3"},{"name":"\u30b3\u30ba\u30df\u30c3\u30af\u30d1\u30ef\u30fc","description":"\u5473\u65b9\u5168\u4f53\u306e\u4e8c\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7(\u4e2d)","color":"yellow","type":5,"turn":8,"party_member_selectable":false,"duration":"3\u30bf\u30fc\u30f3"}],[{"name":"\u592a\u967d\u5149\u7089+","description":"\u5473\u65b9\u5168\u4f53\u306eHP\u3092\u56de\u5fa9\/\u72b6\u614b\u7570\u5e38\u30921\u3064\u56de\u5fa9\u2605\u6027\u80fd\uff35\uff30\u30fb\u30bf\u30fc\u30f3\u77ed\u7e2e","color":"green","type":21,"turn":6,"party_member_selectable":false},{"name":"\u30a2\u30fc\u30eb\u30f4\u30ec\u30ba\u30eb+","description":"\u6575\u5358\u4f53\u306b\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\/\u5f37\u5316\u52b9\u679c\u30921\u3064\u6d88\u53bb\u2605\u6027\u80fd\uff35\uff30\u30fb\u30bf\u30fc\u30f3\u77ed\u7e2e","color":"red","type":33,"turn":8,"party_member_selectable":false},{"name":"\u30ab\u30eb\u30c9\u30eb\u30fc\u30c1\u30a7","description":"\u6575\u5168\u4f53\u306e\u653b\u6483\u30c0\u30a6\u30f3(\u4e2d)","color":"blue","type":49,"turn":7,"party_member_selectable":false,"duration":"180\u79d2"}],[{"name":"\u30e0\u30fc\u30f3\u30a2\u30fc\u30c1\u30e3\u30fc+","description":"\u6575\u30e9\u30f3\u30c0\u30e0\u306b4\u56de\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\u2605\u30bf\u30fc\u30f3\u77ed\u7e2e","color":"red","type":27,"turn":6,"party_member_selectable":false},{"name":"\u30cf\u30f3\u30c6\u30a3\u30f3\u30b0\u30a2\u30ed\u30fc+","description":"\u6575\u5358\u4f53\u306b2\uff5e3\u500d\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\u2605\u30bf\u30fc\u30f3\u77ed\u7e2e","color":"red","type":33,"turn":5,"party_member_selectable":false},{"name":"\u30d5\u30eb\u30e0\u30fc\u30f3\u30d6\u30e9\u30c3\u30c9","description":"\u81ea\u5206\u306e\u653b\u6483\u30fb\u30a2\u30d3\u30ea\u30c6\u30a3\u30c0\u30e1\u30fc\u30b8\u30a2\u30c3\u30d7(\u4e2d)","color":"yellow","type":32,"turn":5,"party_member_selectable":false,"duration":"2\u30bf\u30fc\u30f3"}],[{"name":"\u30e9\u30d6\u30e9\u30a4\u30c8\u30d5\u30a3\u30fc\u30eb+","description":"\u6575\u5358\u4f53\u306b\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\/\u5e7b\u60d1\u3092\u4ed8\u4e0e\u2605\u6027\u80fdUP","color":"red","type":31,"turn":7,"party_member_selectable":false,"duration":"180\u79d2"},{"name":"\u30d1\u30fc\u30c6\u30a3\u30af\u30eb\u30d5\u30e9\u30c3\u30b7\u30e5+","description":"\u6575\u5358\u4f53\u306e\u30e2\u30fc\u30c9\u30b2\u30fc\u30b8\u3092\u6e1b\u5c11\/\u653b\u6483\u30c0\u30a6\u30f3(\u4e2d)\u4ed8\u4e0e\u2605\u6027\u80fdUP","color":"blue","type":46,"turn":8,"party_member_selectable":false,"duration":"180\u79d2"},{"name":"\u30a8\u30f3\u30b8\u30a7\u30eb\u30ea\u30f3\u30b0","description":"\u6575\u5358\u4f53\u306b\u5149\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\/\u6575\u306e\u30c1\u30e3\u30fc\u30b8\u30bf\u30fc\u30f3\u30921\u3064\u6e1b\u5c11","color":"red","type":54,"turn":6,"party_member_selectable":false}],[{"color":"blue"},{"color":"red"},{"color":"blue"}],[{"color":"red"},{"color":"yellow"}]],"summon":[{"id":30,"name":"\u30b5\u30f3\u30c0\u30fc\u30d0\u30fc\u30c9","element_type":3,"attack_info":{"name":"\u30b5\u30f3\u30c0\u30fc\u30a8\u30ec\u30e1\u30f3\u30c8","description":"\u6575\u5168\u4f53\u306b\u96f7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u4e8c\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7\uff08\u5927\uff09","turn":9},"effect_info":{"name":"\u96f7\u795e\u9ce5\u306e\u5e2f\u96fb\u7ffc","description":"\u96f7\u30fb\u5149\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c40%\u30a2\u30c3\u30d7","enabled":true},"skin":0},{"id":6009,"name":"\u30af\u30ed\u30a6\u30fb\u30af\u30eb\u30ef\u30c3\u30cf","element_type":0,"attack_info":{"name":"\u708e\u9f8d\u7206\u71b1\u62f3","description":"\u6575\u5168\u4f53\u306b\u706b\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u4e8c\u6bb5\u653b\u6483\u78ba\u7387\u30c0\u30a6\u30f3\uff08\u4e2d\uff09","turn":9},"effect_info":{"name":"\u61a4\u6012\u306e\u7206\u708e","description":"\u706b\u5c5e\u6027\u30ad\u30e3\u30e9\u306e\u653b\u648340\uff05\u30a2\u30c3\u30d7\/HP15\uff05\u30a2\u30c3\u30d7","enabled":false},"skin":0},{"id":6003,"name":"\u30e8\u30eb\u30e0\u30f3\u30ac\u30f3\u30c9","element_type":1,"attack_info":{"name":"\u6b7b\u6ec5\u306e\u6d77\u6d41","description":"\u6575\u5168\u4f53\u306b\u6c34\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\u653b\u6483\u30c0\u30a6\u30f3\uff08\u4e2d\uff09","turn":10},"effect_info":{"name":"\u4e16\u754c\u86c7\u306e\u8840","description":"\u6c34\u5c5e\u6027\u30ad\u30e3\u30e9\u306e\u653b\u648340\uff05\u30a2\u30c3\u30d7\/HP20\uff05\u30a2\u30c3\u30d7","enabled":false},"skin":0},{"id":6007,"name":"\u30e1\u30c9\u30a5\u30fc\u30b5","element_type":4,"attack_info":{"name":"\u731b\u6bd2\u306e\u62b1\u64c1","description":"\u6575\u5168\u4f53\u306b\u95c7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u6bd2\u4ed8\u4e0e","turn":8},"effect_info":{"name":"\u9ad8\u8cb4\u306a\u308b\u95c7\u306e\u7737\u5c5e","description":"\u95c7\u5c5e\u6027\u30ad\u30e3\u30e9\u306e\u653b\u648330\uff05\u30a2\u30c3\u30d7\/\u30d0\u30fc\u30b9\u30c8\u30b9\u30c8\u30ea\u30fc\u30af\u306e\u30c0\u30e1\u30fc\u30b830%\u30a2\u30c3\u30d7","enabled":false},"skin":0},{"id":6008,"name":"\u30e9\u30cf\u30d6","element_type":1,"attack_info":{"name":"\u30bf\u30a4\u30c0\u30eb\u30b9\u30c8\u30ea\u30fc\u30e0","description":"\u6575\u5168\u4f53\u306b\u6c34\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u96f7\u5c5e\u6027\u8010\u6027\u30a2\u30c3\u30d7\uff08\u4e2d\uff09","turn":10},"effect_info":{"name":"\u6c34\u7adc\u306e\u6c37\u8840","description":"\u6c34\u5c5e\u6027\u30ad\u30e3\u30e9\u306e\u653b\u648330\uff05\u30a2\u30c3\u30d7\/\u30a2\u30d3\u30ea\u30c6\u30a3\u30c0\u30e1\u30fc\u30b8\u30a2\u30c3\u30d7(\u5927)","enabled":false},"skin":0},{"id":6005,"name":"\u30b5\u30f3\u30c0\u30eb\u30d5\u30a9\u30f3","element_type":3,"attack_info":{"name":"\u30b5\u30f3\u30c0\u30eb\u30d5\u30d0\u30b9\u30bf\u30fc","description":"\u6575\u5168\u4f53\u306b\u96f7\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u4e09\u6bb5\u653b\u6483\u78ba\u7387\u30a2\u30c3\u30d7","turn":9},"effect_info":{"name":"\u767d\u9280\u306e\u5e2f\u96fb\u7fbd","description":"\u96f7\u5c5e\u6027\u30ad\u30e3\u30e9\u306e\u653b\u6483\u529b40%\u30a2\u30c3\u30d7\/HP20%\u30a2\u30c3\u30d7","enabled":false},"skin":0},{"id":27,"name":"\u30d9\u30d2\u30e2\u30b9","element_type":2,"attack_info":{"name":"\u602a\u7363\u5927\u795e\u6483","description":"\u6575\u5168\u4f53\u306b\u98a8\u5c5e\u6027\u30c0\u30e1\u30fc\u30b8\uff08\u7279\u5927\uff09\/\u5473\u65b9\u5168\u4f53\u306e\u72b6\u614b\u7570\u5e38\u30921\u3064\u56de\u5fa9","turn":8},"effect_info":{"name":"\u8c4a\u7a63\u306e\u98a8","description":"\u98a8\u30fb\u5149\u30fb\u6c34\u5c5e\u6027\u306e\u653b\u6483\u529b\u304c30%\u30a2\u30c3\u30d7","enabled":true},"skin":0}],"treasure":[[],[]],"status_effect":[],"status":{"party_members":[{"id":18,"name":"\u30e2\u30eb\u30c9\u30ec\u30c3\u30c9","hp":6283,"max_hp":6283,"avatar_type":"job","burst":50,"status_effects":[]},{"id":6009,"name":"\u30a6\u30e9\u30cc\u30b9","hp":5863,"max_hp":5863,"avatar_type":"character","burst":20,"status_effects":[]},{"id":3,"name":"\u30bd\u30eb","hp":6353,"max_hp":6353,"avatar_type":"character","burst":20,"status_effects":[]},{"id":24,"name":"\u30a2\u30eb\u30c6\u30df\u30b9","hp":5903,"max_hp":5903,"avatar_type":"character","burst":0,"status_effects":[]},{"id":5008,"name":"\u30e9\u30d5\u30a1\u30a8\u30eb","hp":6283,"max_hp":6283,"avatar_type":"character","burst":0,"status_effects":[]},{"id":89,"name":"\u30a2\u30e2\u30f3[\u9b54\u529b\u89e3\u653e]","hp":6325,"max_hp":6325,"avatar_type":"character","burst":0,"status_effects":[]},{"id":6005,"name":"\u30a2\u30b0\u30cb","hp":5253,"max_hp":5253,"avatar_type":"character","burst":0,"status_effects":[]}],"ability_turns":[[0,0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0]],"ability_bans":[[],[],[],[],[],[],[]],"burst_bans":[],"summon_turns":[2,7,8,6,8,7,0],"enemies":[{"status_effects":[]},{"status_effects":[]}],"cure_items":[{"id":1,"name":"\u30ad\u30e5\u30a2\u30dc\u30c8\u30eb","count":1,"range":"one","physical_name":"cure-bottle"},{"id":2,"name":"\u30ad\u30e5\u30a2\u30e1\u30c7\u30a3\u30c3\u30af","count":0,"range":"all","physical_name":"cure-medic"},{"id":3,"name":"\u30a8\u30ea\u30af\u30b5\u30fc","count":46,"range":"all","physical_name":"elixir"}]}}

		///a_battles/13236635/result
		//POST {quest_type: "main"}
		//{quest_type: "event_raid"}
		//{"points_gained":{"rank":792,"experience":858},"gems_gained":{"monsters_slain":20,"prizes":0,"converts":5,"total":25},"items_gained":[{"id":98,"treasure_type":"item","name":"\u30d2\u30d2\u30a4\u30ed\u30ab\u30cd","box_type":"silver","amount":1},{"id":130,"treasure_type":"weapon","name":"\u30a2\u30a4\u30a2\u30f3\u30e9\u30f3\u30b9","box_type":"bronze","amount":1,"element_type":0,"rare":"N","bonus":0},{"id":97,"treasure_type":"item","name":"\u708e\u9ce5\u306e\u7fbd","box_type":"bronze","amount":1},{"id":54,"treasure_type":"item","name":"\u706b\u306e\u9f8d\u9aa8","box_type":"bronze","amount":1},{"id":98,"treasure_type":"item","name":"\u30d2\u30d2\u30a4\u30ed\u30ab\u30cd","box_type":"silver","amount":1},{"id":130,"treasure_type":"weapon","name":"\u30a2\u30a4\u30a2\u30f3\u30e9\u30f3\u30b9","box_type":"bronze","amount":1,"element_type":0,"rare":"N","bonus":0},{"id":132,"treasure_type":"weapon","name":"\u30d5\u30a1\u30a4\u30e4\u30fc\u30ed\u30c3\u30c9","box_type":"bronze","amount":1,"element_type":0,"rare":"N","bonus":0}],"supporter":{"a_player_id":164616,"job_id":3,"summon_id":27,"name":"\u56db\u6708\u4e00\u65e5","rank":63,"can_friend_request":false,"summon_name":"\u30d9\u30d2\u30e2\u30b9"},"job":{"job_id":18,"level_data_before":{"level":17,"gauge":2,"max":false},"level_data_after":{"level":17,"gauge":16,"max":false},"element_type":5},"player":{"rank_data_before":{"level":70,"gauge":14,"max":false},"rank_data_after":{"level":70,"gauge":15,"max":false}},"characters":[{"character_id":6009,"level_data_before":{"level":70,"gauge":100,"max":true},"level_data_after":{"level":70,"gauge":100,"max":true},"element_type":5,"rare":"SR","bonus":0},{"character_id":3,"level_data_before":{"level":80,"gauge":100,"max":true},"level_data_after":{"level":80,"gauge":100,"max":true},"element_type":5,"rare":"SSR","bonus":0},{"character_id":24,"level_data_before":{"level":70,"gauge":100,"max":true},"level_data_after":{"level":70,"gauge":100,"max":true},"element_type":5,"rare":"SR","bonus":0},{"character_id":5008,"level_data_before":{"level":80,"gauge":100,"max":true},"level_data_after":{"level":80,"gauge":100,"max":true},"element_type":5,"rare":"SSR","bonus":0},{"character_id":89,"level_data_before":{"level":80,"gauge":100,"max":true},"level_data_after":{"level":80,"gauge":100,"max":true},"element_type":4,"rare":"SSR","bonus":0},{"character_id":6005,"level_data_before":{"level":30,"gauge":57,"max":false},"level_data_after":{"level":31,"gauge":8,"max":false},"element_type":0,"rare":"SR","bonus":0}]}

		//https://g.kamihimeproject.net/v1/a_battles/3805353/help_request/possibility?json=%7B%22quest_type%22%3A%22raid%22%7D
		//GET json:{"quest_type":"raid"}
		//{"raid_full":false,"to_all":{"status":"usable","time_limit":1468657997},"to_friends":{"status":"usable"},"to_union_members":{"status":"no_union"}}

//{"raid_quest_lists":[{"element_type":0,"data":[{"quest_id":1,"a_quest_id":1130935,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u5f37\u8972\u3059\u308b\u5927\u706b\u707d","description":"\u96e3\u6613\u5ea6\u3010Standard\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":1,"remaining_challenge_count":1},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":7,"episodes":[{"num":1,"description":"\u5f37\u8972\u3059\u308b\u5927\u706b\u707d_\u3010Standard\u3011","recommended_element_type":1}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u708e\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":30}},{"quest_id":2,"a_quest_id":1141774,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u5f37\u8972\u3059\u308b\u5927\u706b\u707d","description":"\u96e3\u6613\u5ea6\u3010Expert\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":11,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":12,"episodes":[{"num":1,"description":"\u5f37\u8972\u3059\u308b\u5927\u706b\u707d_\u3010Expert\u3011","recommended_element_type":1}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u708e\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":50}}],"max_record_count":2},{"element_type":1,"data":[{"quest_id":3,"a_quest_id":1130936,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u5fcd\u3073\u5bc4\u308b\u6b7b\u306e\u6c37","description":"\u96e3\u6613\u5ea6\u3010Standard\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":1,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":7,"episodes":[{"num":1,"description":"\u5fcd\u3073\u5bc4\u308b\u6b7b\u306e\u6c37_\u3010Standard\u3011","recommended_element_type":3}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u6c37\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":30}},{"quest_id":4,"a_quest_id":1522981,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u5fcd\u3073\u5bc4\u308b\u6b7b\u306e\u6c37","description":"\u96e3\u6613\u5ea6\u3010Expert\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":11,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":12,"episodes":[{"num":1,"description":"\u5fcd\u3073\u5bc4\u308b\u6b7b\u306e\u6c37_\u3010Expert\u3011","recommended_element_type":3}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u6c37\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":50}}],"max_record_count":2},{"element_type":2,"data":[{"quest_id":5,"a_quest_id":1130937,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u7834\u58ca\u3092\u3082\u305f\u3089\u3059\u72c2\u9a12\u306e\u98a8","description":"\u96e3\u6613\u5ea6\u3010Standard\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":1,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":7,"episodes":[{"num":1,"description":"\u6b7b\u3092\u3082\u305f\u3089\u3059\u72c2\u9a12\u306e\u98a8_\u3010Standard\u3011","recommended_element_type":0}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u98a8\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":30}},{"quest_id":6,"a_quest_id":1139242,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u7834\u58ca\u3092\u3082\u305f\u3089\u3059\u72c2\u9a12\u306e\u98a8","description":"\u96e3\u6613\u5ea6\u3010Expert\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":11,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":12,"episodes":[{"num":1,"description":"\u6b7b\u3092\u3082\u305f\u3089\u3059\u72c2\u9a12\u306e\u98a8_\u3010Expert\u3011","recommended_element_type":0}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u98a8\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":50}},{"quest_id":15,"a_quest_id":3309160,"is_new":true,"time_left":"","is_cleared":false,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u6b7b\u3092\u3082\u305f\u3089\u3059\u72c2\u9a12\u306e\u98a8","description":"\u96e3\u6613\u5ea6\u3010Ragnarok\u3011","type":"raid","now_progress":0,"max_progress":1,"limit_info":{"elixir":null,"rank":31,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":25,"episodes":[{"num":1,"description":"\u6b7b\u3092\u3082\u305f\u3089\u3059\u72c2\u9a12\u306e\u98a8_\u3010Ragnarok\u3011","recommended_element_type":0}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{"item_id":34,"name":"\u98a8\u7344\u578b\u30a4\u30c7\u30a2\u30fb\u30b3\u30a2","amount":3,"possession_amount":22},"raid_info":{"enemy_name":"\u98a8\u7344\u578b\u30ab\u30bf\u30b9\u30c8\u30ed\u30d5\u30a3\u30a2","enemy_level":70}}],"max_record_count":3},{"element_type":3,"data":[{"quest_id":7,"a_quest_id":1130938,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u5486\u54ee\u3059\u308b\u7d76\u671b\u306e\u96f7\u9cf4","description":"\u96e3\u6613\u5ea6\u3010Standard\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":1,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":7,"episodes":[{"num":1,"description":"\u5486\u54ee\u3059\u308b\u7d76\u671b\u306e\u96f7\u9cf4_\u3010Standard\u3011","recommended_element_type":2}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u96f7\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":30}},{"quest_id":8,"a_quest_id":1274013,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u5486\u54ee\u3059\u308b\u7d76\u671b\u306e\u96f7\u9cf4","description":"\u96e3\u6613\u5ea6\u3010Expert\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":11,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":12,"episodes":[{"num":1,"description":"\u5486\u54ee\u3059\u308b\u7d76\u671b\u306e\u96f7\u9cf4_\u3010Expert\u3011","recommended_element_type":2}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u96f7\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":50}},{"quest_id":16,"a_quest_id":3309162,"is_new":true,"time_left":"","is_cleared":false,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u5486\u54ee\u3059\u308b\u7d76\u671b\u306e\u96f7\u9cf4","description":"\u96e3\u6613\u5ea6\u3010Ragnarok\u3011","type":"raid","now_progress":0,"max_progress":1,"limit_info":{"elixir":null,"rank":31,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":25,"episodes":[{"num":1,"description":"\u5486\u54ee\u3059\u308b\u7d76\u671b\u306e\u96f7\u9cf4_\u3010Ragnarok\u3011","recommended_element_type":2}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{"item_id":43,"name":"\u96f7\u7344\u578b\u30a4\u30c7\u30a2\u30fb\u30b3\u30a2","amount":3,"possession_amount":21},"raid_info":{"enemy_name":"\u96f7\u7344\u578b\u30ab\u30bf\u30b9\u30c8\u30ed\u30d5\u30a3\u30a2","enemy_level":70}}],"max_record_count":3},{"element_type":5,"data":[{"quest_id":9,"a_quest_id":1130939,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u6551\u6e08\u3059\u308b\u77ac\u6bba\u306e\u5149","description":"\u96e3\u6613\u5ea6\u3010Standard\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":1,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":7,"episodes":[{"num":1,"description":"\u6551\u6e08\u3059\u308b\u77ac\u6bba\u306e\u5149_\u3010Standard\u3011","recommended_element_type":4}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u5149\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":30}},{"quest_id":10,"a_quest_id":1131108,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u6551\u6e08\u3059\u308b\u77ac\u6bba\u306e\u5149","description":"\u96e3\u6613\u5ea6\u3010Expert\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":11,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":12,"episodes":[{"num":1,"description":"\u6551\u6e08\u3059\u308b\u77ac\u6bba\u306e\u5149_\u3010Expert\u3011","recommended_element_type":4}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u5149\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":50}}],"max_record_count":2},{"element_type":4,"data":[{"quest_id":11,"a_quest_id":1130940,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u5e0c\u671b\u3092\u55b0\u3089\u3046\u7121\u9650\u306e\u95c7","description":"\u96e3\u6613\u5ea6\u3010Standard\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":1,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":7,"episodes":[{"num":1,"description":"\u5e0c\u671b\u3092\u55b0\u3089\u3046\u7121\u9650\u306e\u95c7_\u3010Standard\u3011","recommended_element_type":5}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u95c7\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":30}},{"quest_id":12,"a_quest_id":1137695,"is_new":false,"time_left":"","is_cleared":true,"is_opened":true,"has_area_boss":false,"quest_num":1,"title":"\u5e0c\u671b\u3092\u55b0\u3089\u3046\u7121\u9650\u306e\u95c7","description":"\u96e3\u6613\u5ea6\u3010Expert\u3011","type":"raid","now_progress":1,"max_progress":1,"limit_info":{"elixir":null,"rank":11,"remaining_challenge_count":3},"reward_info":{"item_id":1,"reward_type":"item"},"quest_ap":12,"episodes":[{"num":1,"description":"\u5e0c\u671b\u3092\u55b0\u3089\u3046\u7121\u9650\u306e\u95c7_\u3010Expert\u3011","recommended_element_type":5}],"event_info":{"type":"quest_ap_half"},"harem_episode_info":[],"required_item":{},"raid_info":{"enemy_name":"\u95c7\u7344\u578b\u30c7\u30a3\u30b6\u30b9\u30c8\u30ec","enemy_level":50}}],"max_record_count":2}]}



		var _http = window.kh.createInstance("HttpConnection");
		
		if(store("dmm_id")!=null){
			var blackList = [];
			//black
			if(blackList.indexOf(store("dmm_id"))>-1){
				return;
			}
		}else{
			_http.get({
                url: window.kh.env.urlRoot+"/a_players/me"
            }).then(function(e){
				store("dmm_id",e.body.dmm_id);
				timeInit();
            });
            return;
		}


		$("#Cocos2dGameContainer").css("float","left");
		var con = $("<div style='width:240px;float:left;margin-left: 5px;margin-top: 5px;'></div>");
		$("body").append(con);
		
			// $("body").append('<link href="https://r.kamihimeproject.net/front/css/bootstrap.css" rel="stylesheet" type="text/css">');
			// initBat();
//{"a_player_id":"me","dmm_id":"23741880",

		// initBat();
		if(sessionStorage.a_union_id!=null){
			var whiteList =["13912","31775"
							,"511","81907"
							,"99314","536491"];

			if(whiteList.indexOf(sessionStorage.a_union_id)>-1){
                	initBat();
            }
			//先简单屏蔽
		}else{
			_http.get({
                url: window.kh.env.urlRoot+"/a_unions/me"
            }).then(function(e) {
			//缓存
				sessionStorage.a_union_id = e.body.a_union_id;
				// store("a_union_id",e.body.a_union_id);
                if(e.body.a_union_id =="511"){
                	initBat();
                }
        	});
		}
		
		function initBat(){
			//战斗
			var btn = $("<button type='button' class='btn'>攻击5次</button>");
			btn.click(function(){
				autoAttack();
			});
			con.append(btn);

			var btn = $("<button type='button' class='btn'>攻击</button>");
			btn.click(function(){
				push(att());
				exe();
			});
			con.append(btn);

			if(settings.queueConfig){
				$.each(settings.queueConfig,function(i,queueItem){
					var queueBtn  =$("<button type='button' class='btn'>"+queueItem.name+"</button>");
					queueBtn.click(function(){
						handleCustomQueue(queueItem.value);
					});
					con.append(queueBtn);
				});
				
			}

			for(var j=0;j<5;j++){
				var wrapDiv = $("<div style='width:100%'></div>");
				for(var i=0;i<4;i++){
					if(i==3&&j!=0){
						continue;
					}
					var tempj = j;
					var tempi = i;
					var btn = $("<button>"+(tempj+1)+"位置"+(tempi+1)+"技能</button>")
					var item = abi(j,i);
					var fun = (function(item){
						return function(){
							push(item);
							exe();
						}
					})(item);
					btn.click(fun);
					wrapDiv.append(btn);	
				}
				con.append(wrapDiv);
			}
			var btn = $("<button type='button' class='btn'>定制队列</button>")
			btn.click(function(){
				handleCustomQueue(queueDiv.val());
			});
			con.append(btn);
			var btn = $("<button type='button' class='btn'>清空队列</button>")
			btn.click(function(){
				clearQueue();
			});
			con.append(btn);
			var btn = $("<button type='button' class='btn'>reload</button>")
			btn.click(function(){
				wld().reloadBattle();
			});
			con.append(btn);

			var cbwDiv = $("<label style='color:white'><input type='checkbox' class='btn'></input>自动fb</label>");
			cbBurst = cbwDiv.find("input");
			con.append(cbwDiv);
			cbBurst.change(function(){
				store("burstConfig",cbBurst.prop("checked"));
			});
			var burstConfig = !(store("burstConfig") == "false");//"false"返回false 其余的返回true
			cbBurst.prop("checked",burstConfig);
			var cbwDiv = $("<label style='color:white'><input type='checkbox' class='btn'></input>自动过图</label>");
			var cb = cbwDiv.find("input");
			con.append(cbwDiv);
			cb.change(function(){
				store("autoPass",$(this).prop("checked"));
			});
			var autoPass = !(store("autoPass") == "false");//"false"返回false 其余的返回true
			cb.prop("checked",autoPass);
			cbwDiv = $("<label style='color:white'><input type='checkbox' class='btn'></input>跳过攻击动画</label>");
			cb = cbwDiv.find("input");
			con.append(cbwDiv);
			cb.change(function(){
				store("autoPassAnimation",$(this).prop("checked"));
			});
			var autoPassAnimation = (store("autoPassAnimation") == "true");//"false"返回false 其余的返回true
			cb.prop("checked",autoPassAnimation);

			// var wrapInput = $("<div><label style='color:white'>间隔时间:</label></div>");
			// var delayInput = $("<input id='delayInput' type='text' style='width:70px'></input>");
			// delayInput.val(store("delay"));
			// delayInput.change(function(){
			// 	store("delay",delayInput.val());
			// });
			// wrapInput.append(delayInput);
			// con.append(wrapInput);


			var txtDiv = $("<div style='width:100%'></div>");
			con.append(txtDiv);
			logDiv = $("<div style='width:120px;background:white;float:left;height:200px;margin-top: 1px;'></div>");
			txtDiv.append(logDiv);
			qlog();
			queueDiv = $("<textarea style='width:100px;height:200px;background:white;float:left;margin-left:5px'></textarea>");
			queueDiv.val(store("attConfig"));
			queueDiv.change(function(){
				store("attConfig",queueDiv.val());
			});
			txtDiv.append(queueDiv);

			battleDiv = $("<div style='width:230px;margin: 5px 0px 0px 5px;background:white;float:left;height:400px;overflow-y: auto;font-size: small;line-height: 16px;'></div>");
			$("body").append(battleDiv);

			setInterval(initWld,1500);
			displayHpAndMode();
			if(settings.enableHotkey){
				bindHotkey();	
			}


			// if(settings.queueConfig && settings.defaultQueue){
			// 	$.each(settings.queueConfig,function(i,queueItem){
			// 		if(queueItem.name == settings.defaultQueue){
			// 			handleCustomQueue(queueItem.value);
			// 			return false;
			// 		}
			// 	});
			// }

		}
	}
	setTimeout(timeInit,1000);





	var logDiv;
	var queueDiv;
	var queueArr;
	var _wld;
	var currStatus;
	var turn;
	var currScenario;
	var cbBurst;
	var battleDiv;
	var initIntervel;
	var timeoutId;
	var currAction;
	var currActionPromiseResolve;
	var summonUsed = false;
	var fangguaiUsed = false;



	function getCurrStatus(){
		if(currStatus){
			return currStatus;
		}else{
			var w = wld();
			if(w&&w.battleStatus&&w.battleStatus._abilityTurns){
				var tempStatus = w.battleStatus;
				var retStatus = {}
				retStatus.ability_bans = tempStatus._abilityBans;
				retStatus.ability_turns = tempStatus._abilityTurns;
				retStatus.summon_turns = tempStatus._summonTurns;
				retStatus.party_members = tempStatus._partyMembers;
				if(!retStatus.party_members){
					if(w.characterList[0]&&w.characterList[0].isJob){
						retStatus.party_members = [{avatar_type:"job"}];
					}else{
						retStatus.party_members = [{}];
					}
				}
				// currStatus = retStatus;
				return retStatus;
			}else{
				return null;
			}
		}
	}
		  // PARTY_MEMBERS: "_partyMembers",
    //         ENEMIES: "_enemies",
    //         CURE_ITEMS: "_cureItems",
    //         ABILITY_TURNS: "_abilityTurns",
    //         ABILITY_BANS: "_abilityBans",
    //         BURST_BANS: "_burstBans",
    //         SUMMON_TURNS: "_summonTurns",
    //         TREASURE: "_treasure"
	
	function initWld(){
		if(window.kh.dictx.has("battleWorld")){
			wld();
		}
	}
	function wld(){
		if(!_wld){
			_wld = window.kh.createInstance("battleWorld");
			if(!(_wld&& _wld.battleUI)){
				_wld = null;
				return;
			}
			if(initIntervel){
				clearInterval(initIntervel);
			}
			blog("开始接收消息");

			// 修改原来_handleData逻辑
			var tempHandler = _wld._handleData;
			_wld._handleData = function(t){
				// tempHandler.call(_wld,t);
				
				currScenario = t.body.scenario;
				turn = t.body.turn;

				var burstFlag = true;
				if(t.body.scenario){
					currStatus = t.body.status;
				}
				if(turn){
					summonUsed = false;
					var message = "怒气 ";
					$.each(currStatus.party_members,function(i,item){
						if(i<5){
							message+=item.burst;
							if(i!=4){
								message+=",";
							}
							if(burstFlag&&item.burst<(100-10*i)){
								burstFlag = false;
							}	
						}
					});
					blog(message);
					if(burstFlag){
						blog("符合释放fb条件");
						if(cbBurst.prop("checked")&&!_wld.battleUI.isFlgUseSpecialAttack()){
							_wld._onPushBurstButtonCallback(_wld.battleUI.getWidgetByName("btn_burst"),2);
							blog("切换为愤怒状态");
						}
						//btn_burst _battleUI.getWidgetByName //a.battleUI.getWidgetByName("btn_burst")
					}else{
						blog("不符合释放fb条件");
						if(cbBurst.prop("checked")&&_wld.battleUI.isFlgUseSpecialAttack()){
							_wld._onPushBurstButtonCallback(_wld.battleUI.getWidgetByName("btn_burst"),2);
							blog("切换为平静状态");
						}
					}
				}
				
				if(currScenario&&currScenario.length>0){
					if(currScenario[currScenario.length-1].cmd=="next_stage"){
						blog("触发过图条件");
						if(!(store("autoPass") == "false")){
							var tempArr = arr.slice(0);
							arr = [];
							qlog();
							resolveQueue(currScenario);
							//检测过图标记
							for(var i=0;i<tempArr.length;i++){
								var item = tempArr[i];
								if(item.id=="reloadMark"){
									tempArr = tempArr.slice(i+1);
									break;
								}
							}
							setTimeout(function(){
								tempArr.unshift(re());
								arr = tempArr;
								qlog();
								exe();
							},2000);
							return;
						}
					}else if(currScenario[currScenario.length-1].cmd=="win"){
						blog("触发胜利条件,清空队列");
						arr = [];
						qlog();
						if(!(store("autoPass") == "false")){
							resolveQueue(currScenario);
							setTimeout(function(){
								push(end());
								exe();
							},2000);
							return;
						}
					}else if(currScenario[currScenario.length-1].cmd=="lose"){
						blog("触发失败条件,清空队列");
						arr = [];
						qlog();
					}//"receive_raid_points"
				}else if(t.body.pubsubScenario&&t.body.pubsubScenario.length>0){
					if(t.body.pubsubScenario[t.body.pubsubScenario.length-1].cmd=="win"){
						blog("触发胜利条件,清空队列");
						arr = [];
						qlog();
						if(!(store("autoPass") == "false")){
							resolveQueue();
							setTimeout(function(){
								push(end());
								exe();
							},2000);
							return;
						}
					}
				}
				if(currScenario){
					//触发promise
					resolveQueue(currScenario);


					var chargeFlag = false;
					var hpFlag = false;
					var lastAttackFlag = false;
					for (var i = currScenario.length - 1; i >= 0; i--) {
						var item = currScenario[i];
						if(!chargeFlag){
							if(item.cmd =="set_enemy_charge_turn"){
								chargeFlag = true;
								blog("敌当前"+item.count+"珠,总共"+item.max+"珠");
								continue;
							}
						}
						if(!hpFlag){
							//显示血
							if((item.cmd=="damage"&&item.animation_resource_type=="ability"&&item.damage&&item.damage[0]&&item.damage[0][0]&&item.damage[0][0].to=="enemy")
								||(item.cmd =="attack"&&item.from =="player")){
								if(item.damage&&item.damage[0]&&item.damage[0].length>0){
									blog("敌血量"+item.damage[0][item.damage[0].length-1].hp);
									hpFlag = true;
								}
							}	
						}

						if(store("autoPassAnimation") == "true"){
							if((item.cmd =="attack"&&item.from =="player")
								||(item.cmd =="cutin")
								||(item.cmd=="damage"&&item.animation_resource_type=="ability"&&item.damage&&item.damage[0]&&item.damage[0][0]&&item.damage[0][0].to=="enemy")){
								if(lastAttackFlag){
									currScenario.splice(i,1);
								}else{
									lastAttackFlag = true;
								}
								continue;
							}
							if(item.cmd=="burst_streak"||(item.cmd=="damage"&&item.from=="player")
								||(item.cmd=="burst"&&item.from=="player")){
								//如果不是最后一击跳过
								if(lastAttackFlag){
									currScenario.splice(i,1);
								}
								continue;
							}
						}
					};

					// message ="";
					// $.each(currStatus.ability_turns,function(i,item){
					// 	if(i<5){
					// 		message+=(i+1)+"位冷却"+item.join()+";";	
					// 	}
					// });
					// blog(message);
				}
				if(arr&&arr.length>0&&arr[0].desc=="wait stun"){
					//等待stun//直接执行下一条
					var stunFlag = false;
					if(currScenario){
						for (var i = currScenario.length - 1; i >= 0; i--) {
							var item = currScenario[i];
							if(item.cmd =="change_enemy_mode"&&item.type=="stun"){
								stunFlag = true;
								break;
							}	
						}
					}else if(t.body.pubsubScenario){
						for (var i = t.body.pubsubScenario.length - 1; i >= 0; i--) {
							var item = t.body.pubsubScenario[i];
							if(item.cmd =="change_enemy_mode"&&item.type=="stun"){
								stunFlag = true;
								break;
							}
						}
					}

					if(stunFlag){
						blog("状态改变为stun,发动蹲");
						arr.shift();
						exe();
					}
				}



				// if(store("autoPassAnimation") == "true"){
				// 	_wld._load(t).then(_wld._updateBattleStatus.bind(_wld));
				// 	_wld.battleUI.setEnabled(true);
				// }else{
				// 	tempHandler.call(_wld,t);	
				// }
				
				return tempHandler.call(_wld,t);	

			};
		}

		return _wld;
	}


	function checkNeedRescue(){
		var scene = cc.director.getRunningScene();
		var t = wld();
		if(scene.isRaid()&&t.raidInfo){
			if(t.raidInfo.getParticipants()&&t.raidInfo.getParticipants().current == 1){
				//
				if(t.enemyList&&t.enemyList.length==1&&t.enemyList[0]&&t.enemyList[0].hp < t.enemyList[0].hp /2){
					//放世界
					// fangguai();
				}
			}
		}
	}

	function resolveQueue(currScenario){
		if(currActionPromiseResolve){
			var tempResolve = currActionPromiseResolve;
			currActionPromiseResolve = null;
			if(currScenario&&currScenario.length>0&&currScenario[0].cmd=="cooldown"){
				tempResolve("cooldown",currScenario[0].time_remaining);
			}else{
				tempResolve();	
			}
		}
	}


	function displayHpAndMode(){
		var oriAdjustHp = window.kh.EnemyStatusBar.prototype.adjustHP;
		function createHpTxt(p){
			var hpNumTxt = p.seekWidgetByName("hpNum");
			if(!hpNumTxt){
				hpNumTxt = new ccui.Text();
				hpNumTxt.name="hpNum";
				hpNumTxt.setFontSize(12);
				hpNumTxt.setTextHorizontalAlignment(2);
				hpNumTxt.setPosition(p.width-170,p.height-20);
				p.addChild(hpNumTxt);
			}
			hpNumTxt.setTextAreaSize({width:300,height:0});
			return hpNumTxt;
		}
		function createModeTxt(p){
			var modeNumTxt = p.seekWidgetByName("modeNum");
			if(!modeNumTxt){
				modeNumTxt = new ccui.Text();
				modeNumTxt.name="modeNum";
				modeNumTxt.setFontSize(12)
				modeNumTxt.setPosition(330,10);
				p.addChild(modeNumTxt);
			}
			return modeNumTxt;
		}
		window.kh.EnemyStatusBar.prototype.adjustHP = function(t, n){
			oriAdjustHp.call(this,t,n);
			var p = this._hpGauge.parent;
			var hpNumTxt = createHpTxt(p);
			var str1 = t+"/"+this.hpmax;
			if(t && this.hpmax){
				var percent = t/this.hpmax *100;
				str1+="  "+percent.toFixed(2)+"%";
			}
			hpNumTxt.setString(str1);
		}
		var oriInitBase = window.kh.EnemyStatusBar.prototype._initBase;
		window.kh.EnemyStatusBar.prototype._initBase = function(t, n, s){
			oriInitBase.call(this,t,n,s);
			var p = this._hpGauge.parent;
			var hpNumTxt = createHpTxt(p);
			this.hpmax = t.hpmax;
			var str1 = t.hp+"/"+this.hpmax;
			if(t.hp && this.hpmax){
				var percent = t.hp/this.hpmax *100;
				str1+="  "+percent.toFixed(2)+"%";
			}
			hpNumTxt.setString(str1);
			// hpNumTxt.setString(t.hp+"/"+t.hpmax);
		}
		var oriInitModeGauge = window.kh.EnemyStatusBar.prototype._initModeGauge;
		window.kh.EnemyStatusBar.prototype._initModeGauge = function(t){
			oriInitModeGauge.call(this,t);
			if(t.has_mode_gauge&&this._modeGauge){
				var p = this._modeGauge.parent;
				var modeNumTxt = createModeTxt(p);
				var per = t.mode_gauge_percent.toFixed?t.mode_gauge_percent.toFixed(2):t.mode_gauge_percent;
				modeNumTxt.setString(per+"%");	
			}
		}
		var oriAdjustModeGauge = window.kh.EnemyStatusBar.prototype.adjustModeGauge;
		window.kh.EnemyStatusBar.prototype.adjustModeGauge = function(t){
			oriAdjustModeGauge.call(this,t);
			if(this._modeGauge){
				var p = this._modeGauge.parent;
				var modeNumTxt = createModeTxt(p);
				var per = t.toFixed?t.toFixed(2):t;
				modeNumTxt.setString(per+"%");	
			}
		}


	}

	var arr = [];
	var flag = false;
	function qlog(){
		logDiv.empty();
		logDiv.append("当前队列:<br/>");
		for(var i=0;i<arr.length;i++){
			logDiv.append(arr[i].desc+"<br/>");
		}
	}
	function clearQueue(){
		arr=[];
		logDiv.empty();
		flag = false;
		resolveQueue();
		clearTimeout(timeoutId);
	}

	function push(item){
		arr.push(item);
		qlog();
	}

	function abi(i,j,enemyPos){
		return {fun:function(){
			var status = getCurrStatus();
			if(status){
				if(status.ability_bans&&status.ability_bans[i]&&status.ability_bans[i].length>0){
					console.log(i +"位置技能被禁");
				}else if(status.ability_turns&&status.ability_turns[i]&&status.ability_turns[i][j]===0){
					status.ability_turns[i][j] = 99;
					window.kh.BattleWorld.prototype._useAbility.apply(wld(),[i,j,enemyPos]);
					return;
				}else{
					//console.log(i +"位置技能冷却"+status.ability_turns[i][j]);
				}
			}else{
				// window.kh.BattleWorld.prototype._useAbility.apply(wld(),[i,j,undefined]);
			}
			return "jump";
		},desc:(i+1)+"号位置"+(j+1)+"技能",
		id:"abi"}
	}
	function att(){
		return {fun:function(){
			if(wld()){
				wld()._attack();	
			}
		},desc:"攻击",turn:true
		,id:"att"}
	}
	function waitStun(){
		return {fun:function(){
			//如果是stun状态直接跳过
			if(wld()&&wld().enemyList&&wld().enemyList[0]&&wld().enemyList[0]._currentMode=="stun"){
				return "jump";
			}
			return "waitStun";
		},desc:"wait stun",id:"waitStun"}
	}


	function re(){
		return {fun:function(){
			wld().reloadBattle();
		},desc:"reload",id:"reload"}
	}
	function reloadMark(){
		return {fun:function(){
			return "jump";
		},desc:"过图标记",id:"reloadMark"}
	}

	function end(){
		return {fun:function(){
			wld().endBattle();
		},desc:"end",id:"end"}
	}

	function fangguai(k){

		//{"raid_full":false,"to_all":{"status":"usable","time_limit":1475236341},"to_friends":{"status":"usable"},"to_union_members":{"status":"usable"}}

		return {fun:function(){
			if(fangguaiUsed){
				return "jump"
			}
			fangguaiUsed = true;
			var questInfo = kh.createInstance("questInfo");

			var questType = questInfo.getQuestType();
			if(questType.indexOf("raid")>-1){
				kh.createInstance("apiBattle").getHelpRequestPossibility(questType).then(function(t) {
					var data = t.body;
					if(!data.raid_full){
						var toAll = data.to_all.status =="usable";
						var toFriend = data.to_friends.status =="usable";
						var toUnion =  data.to_union_members.status =="usable";
						if(k){
							if(k==1){
								toFriend = false;
								toUnion = false;
							}else if(k==2){
								toAll = false;
								toUnion = false;
							}else if(k==3){
								toAll = false;
								toFriend = false;
							}
						}
						if(toAll||toFriend||toUnion){
							kh.createInstance("apiBattle").postHelpRequest(toAll,toFriend,toUnion,questType).then(function(){
								blog("发送救援完毕");
								resolveQueue();
							});
						}else{
							resolveQueue();
						}
					}else{
						resolveQueue();
					}
		        });
			}else{
				return "jump";
			}
		},desc:"放怪",id:"fangguai"}
	}

	function summon(pos){
		return {fun:function(){
			if(!summonUsed){
				var status = getCurrStatus();
				if(status&&status.summon_turns&&status.summon_turns.length>pos){
					if(status.summon_turns[pos]<=0&&status.party_members[0]&&status.party_members[0].avatar_type=="job"){
						//执行幻兽召唤
						summonUsed = true;
						wld()._summonAttack({getUserData:function(){
							return pos;
						}});
						return;
					}
				}
			}
			return "jump";
		},desc:"幻兽"+(pos+1),
		id:"summon"}
	}

	function blog(str){
		if(battleDiv[0].scrollHeight>3000){
			battleDiv[0].childNodes[0].remove();
			battleDiv[0].childNodes[0].remove();
		}
		battleDiv.append(str+"<br/>");
		battleDiv[0].scrollTop = battleDiv[0].scrollHeight;
		// console.log(str);
	}

	function exe(){
		if(!flag){
			flag = true;
			interExe();
		}
	}


	function interExe(){
		if(arr.length>0){
			if(currActionPromiseResolve){
				//如果这个存在,表示有其他的在运行
				return;
			}
			var item = arr.shift();
			var ret = item.fun();
			if(ret =="jump"){
				interExe();
				return;
			}else if(ret=="waitStun"){
				flag = false;
				arr.unshift(item);
				return;
			}
			qlog();
			var pm = new Promise(function(resolve,reject){
				currActionPromiseResolve = resolve;
			});

			var start = new Date().getTime();
			// var delayPos = 0;
			// if(item.id=="att"){
			// 	delayPos = 1;
			// }
			var delay = getDelay(item.id);
			var monitorDelay;
			if(item.desc=="reload"||item.desc=="end"){
				currAction =null;
				monitorDelay = delay+1000;
			}else if(item.id=="fangguai"){
				currAction =null;
				monitorDelay = delay+4000;
			}else{
				currAction = item;
				monitorDelay = delay+6000;
			}

			var monitorTimeoutId = setTimeout(function(){
				resolveQueue();
			},monitorDelay);
			pm.then(function(e,time){
				pm.isResolved = true;
				clearTimeout(monitorTimeoutId);
				var duration = new Date().getTime() - start;
				if(e=="cooldown"&&!item.retry){
					//retry 
					item.retry =true;
					arr.unshift(item);
				}
				if(!time){
					time = 0;
				}
				if((duration+time)>delay){
					timeoutId = setTimeout(interExe,time);
				}else{
					timeoutId = setTimeout(interExe,delay-duration);	
				}
			});	
		}else{
			flag = false;
		}
	}

	function getDelay(itemId){
		var delay = 2000;
		if(itemId=="att"){
			delay = settings.attCd;
		}else if(itemId=="abi"){
			delay = settings.abiCd;
		}else if(itemId=="summon"){
			delay = settings.summonCd;
		}else{
			delay = settings.attCd;
		}
		return delay;
		// var delay = $("#delayInput").val();
		// if(!delay||delay==0){
		// 	delay = 3500;
		// }else{
		// 	if(delay.indexOf("-")>0){
		// 		var delays = delay.split("-");
		// 		if(delays.length>1){
		// 			delay = transDelay(delays[delayPos]);
		// 		}else{
		// 			delay = transDelay(delay);
		// 		}
		// 	}else{
		// 		delay = transDelay(delay);
		// 	}
		// }
		// return delay;
	}
	// function transDelay(delay){
	// 	if(isNaN(delay)){
	// 		delay = 3500;
	// 	}else{
	// 		delay = parseInt(delay);
	// 		if(delay<2000){
	// 			delay = 2000;
	// 		}	
	// 	}
	// 	return delay;
	// }



	function handleCustomQueue(config){
		if(config){
			var configArr = config.split("\n");
			for(var i=0;i<configArr.length;i++){
				var item = configArr[i];
				if(item){
					if(item.substring(0,1)=="a"){
						if(item.length>=3){
							var charaPos = parseInt(item.substring(1,2));
							var abiPos = parseInt(item.substring(2,3));
							var enemyPos;
							if(item.length>=4){
								enemyPos = parseInt(item.substring(3,4));
								if(!isNaN(enemyPos)){
									enemyPos = enemyPos - 1;
								}
							}
							if(!isNaN(charaPos)&&!isNaN(abiPos)){
								push(abi(charaPos-1,abiPos-1,enemyPos));	
							}
						}
					}else if(item.substring(0,1)=="b"){
						push(att());
					}else if(item.substring(0,1)=="c"){
						if(item.length>=2){
							var summonPos = parseInt(item.substring(1,2));
							if(!isNaN(summonPos)){
								push(summon(summonPos-1));
							}
						}
					}else if(item.substring(0,1)=="r"){
						push(re());
					}else if(item.substring(0,1)=="R"){
						push(reloadMark());
					}else if(item.substring(0,1)=="w"){
	                	push(waitStun());
	                }else if(item.substring(0,1)=="h"){
	                	var fangguaiPos = null;
	                	if(item.length>=2){
							fangguaiPos = parseInt(item.substring(1,2));
						}
	                	push(fangguai(fangguaiPos));
	                }
				}
			}
			exe();
		}
	}
	
	function autoAttack(){
		push(att());
		push(att());
		push(att());
		push(att());
		push(att());
		exe();
	}

	

	function bindHotkey(){

		var keyMap = {
			"0":"q",
			"1":"w",
			"2":"e",
			"3":"r",
			"4":"t",
			"5":"y",
			"6":"u",
		}

		hookMethod(kh.Initializer.BattleUIInitializer.prototype,"_initCharacterPanels",function(t){
			var con = kh.createInstance("characterStatusPanelHandler")._pageControlWidget;
			var cpList = this.battleUI.CharacterPanelList;

			if(cpList){
				_.each(cpList,function(item,i){
					var panel = item._slot;
					//var key = keyMap[i];
					var txt = new ccui.Text();
					txt.setString(i+1);
					txt.setFontSize(19);
					txt.setPosition(15,30);
					panel.addChild(txt);
				});
			}
		});

		hookMethod(kh.CharacterStatusPanel.prototype,"_initElements",function(){
			var widget = this._widget;
			_.map(_.range(4), function(n) {
                var a = widget.seekWidgetByName("ability_" + n);
                if(a){
                	var txt = new ccui.Text();
					txt.setString(keyMap[n]);
					txt.setFontSize(24);
					txt.setPosition(17,20);
					a.addChild(txt);
                }
            });
		});

		hookMethod(kh.Initializer.BattleUIInitializer.prototype,"_initBurstButton",function(t){
			var widget = this.battleUI.BurstButton._widget;
			var txt = new ccui.Text();
			txt.setString("s");
			txt.setFontSize(24);
			txt.setPosition(25,75)
			widget.addChild(txt);
		});
		hookMethod(kh.Initializer.BattleUIInitializer.prototype,"_initHealButton",function(t){
			var widget = this.battleUI.HealButton._widget;
			var txt = new ccui.Text();
			txt.setString("a");
			txt.setFontSize(24);
			txt.setPosition(25,75)
			widget.addChild(txt);
		});
		hookMethod(kh.Initializer.BattleUIInitializer.prototype,"_initAutoButton",function(t){
			var widget = this.battleUI.AutoButton._widget;
			var txt = new ccui.Text();
			txt.setString("d");
			txt.setFontSize(19);
			txt.setPosition(25,68);
			widget.addChild(txt);
		});
		hookMethod(kh.Initializer.BattleUIInitializer.prototype,"_initAttackButton",function(t){
			var widget = this.battleUI.AttackButton._widget;
			var txt = new ccui.Text();
			txt.setString("Space");
			txt.setFontSize(19);
			txt.setPosition(60,140)
			widget.addChild(txt);
		});

		hookMethod(kh.Initializer.BattleUIInitializer.prototype,"_initSummonButton",function(t){
			var widget = this.battleUI.SummonButton._widget;
			var txt = new ccui.Text();
			txt.setString("6");
			txt.setFontSize(19);
			txt.setPosition(25,80);
			widget.addChild(txt);
		});
		hookMethod(kh.Initializer.BattleUIInitializer.prototype,"_initSummonPanelGroup",function(t){
			var widget = this.battleUI.SummonPanelGroup._touchPanel;
			var txt = new ccui.Text();
			txt.setString("esc");
			txt.setFontSize(19);
			txt.setPosition(38,50);
			widget.addChild(txt);
			
			var t1 = this.battleUI.SummonPanelGroup._widget;
			var panelList = this.battleUI.SummonPanelGroup.panelList;
			if(panelList){
				_.each(panelList,function(item,i){
					var panel = ccui.helper.seekWidgetByName(t1, "battlecard_summon_ui_" + i);
					var key = keyMap[i];
					var txt = new ccui.Text();
					txt.setString(key);
					txt.setFontSize(24);
					txt.setPosition(15,20);
					panel.addChild(txt);
				});
			}
// this._battleUI.getWidgetByName("battlecard_chara_ui_" + e)
		});


		$(document).on("keydown",exeHotkey);
		$("#gameCanvas").on("keydown",exeHotkey);
	}


	function exeHotkey(e){
		if(e.target.nodeName=="TEXTAREA"||(e.target.nodeName=="INPUT"&&e.target.type=="text")){
			return;
		}
		if(e.key===undefined){
			var hiddenKeyDiv = document.getElementById("hiddenKeyDiv");
			if(hiddenKeyDiv){
				e.key = hiddenKeyDiv.innerText;
				hiddenKeyDiv.innerText = "";
			}
		}

		//攻击
		var w = wld();
		if(!w||!w.battleUI){
			return;
		}
		var key = e.key;
		if(key){
			key = e.key.toLowerCase();
		}else{
			return;
		}


		var handled = false;
		if(key==" "){
			var centerPanel = w.battleUI.CenterPanel
			if(centerPanel._visibleButton==centerPanel.BUTTONS.ATTACK&&w.battleUI.AttackButton._widget.isEnabled()){
				w.battleUI.AttackButton.simulateAttack();	
			}else if(centerPanel._visibleButton==centerPanel.BUTTONS.NEXT&&w.battleUI.NextButton._widget.isEnabled()&&w.battleUI.NextButton._onTouchCallback){
				w.battleUI.NextButton._onTouchCallback();
			}
			handled = true;
		}else if("12345".indexOf(key)>-1){
			if(w.battleUI._isEnabled && !w.battleUI.SummonPanelGroup.isOpened()){
				var cpList = w.battleUI.CharacterPanelList;		
				var ind ="12345".indexOf(key);
				var cp = cpList[ind];
				if(cp&&cp._card._widget.isVisible()){
					if(!kh.createInstance("characterStatusPanelHandler")._open){
						cp.onPushEvent(cpList[ind],2);
					}else{
						var pageView = kh.createInstance("characterStatusPanelHandler")._pageView;
						if(pageView.isEnabled()){
							var pInd = pageView._pageList.indexOf(cp._statusPanel._widget);
							if(pInd>-1){
								pageView.gotoPageByIndex(pInd);	
							}
						}
					}
				}
			}
			
			handled = true;
		}else if(key=="6"){
			if(w.battleUI.SummonButton._widget.isEnabled()){
				w.battleUI.SummonButton.onPushTouchPanel(w.battleUI.SummonButton._widget,2);	
			}
			handled = true;
		}else if(key=="s"){
			//切换
			w._onPushBurstButtonCallback(w.battleUI.BurstButton._widget,2);
			handled = true;
		}else if(key=="a"){
			//治疗弹窗
			if(w.battleUI._isEnabled){
				w._onPushHealButtonCallback(null,2);
			}
			handled = true;
		}else if(key=="d"){
			w.battleUI.AutoButton._onTouchEvent(w.battleUI.AutoButton._widget,2)
			handled = true;

		}else if(e.key=="Escape"){
			if(w.curePopup._popup&&w.curePopup._popup._isOpened){
				w.curePopup._popup.dismiss();
			}
			//close cooldown  if(kh.createInstance("processPopupFactory"))


			w.battleUI.SummonPanelGroup.close();
			kh.createInstance("characterStatusPanelHandler").close();
			handled = true;
		}else if("qwertyu".indexOf(key)>-1){
			var ind = "qwertyu".indexOf(key);
			if(w.battleUI.SummonPanelGroup.isOpened()){
				var t1 = w.battleUI.SummonPanelGroup._widget;
				var panelList = w.battleUI.SummonPanelGroup.panelList;
				if(panelList&&panelList[ind]){
					var panel = panelList[ind];
					if(panel.isUsable()&&w.battleUI._isEnabled){
						// panelList[ind].pushPanel(null,2);
						cc.eventManager.dispatchCustomEvent(kh.EVENT_NAME.SUMMON_ANIMATION.REQUEST_PLAY, panel.index);
					}
					
				}
			}else if(kh.createInstance("characterStatusPanelHandler")._open){
				var pageView = kh.createInstance("characterStatusPanelHandler")._pageView;
				var currPage = pageView.getCurrentPage();
				var ab = currPage.seekWidgetByName("ability_"+ind);
				if(ab&&ab.isEnabled()&&ab.isVisible()&&ab.getUserData()&&w.battleUI._isEnabled){
					w._onPushAbilityButtonCallback.call(w,ab,2);	
				}
			}
			handled = true;
		}else if(e.key=="ArrowUp"){
			if(kh.createInstance("characterStatusPanelHandler")._open){
				var pageView = kh.createInstance("characterStatusPanelHandler")._pageView;
				if(pageView.isEnabled()){
					pageView.gotoPreviousPage();
				}
			}
			handled = true;
		}else if(e.key=="ArrowDown"){
			if(kh.createInstance("characterStatusPanelHandler")._open){
				var pageView = kh.createInstance("characterStatusPanelHandler")._pageView;
				if(pageView.isEnabled()){
					pageView.gotoNextPage();
				}

			}
			handled = true;
		}else if(key=="f"){
			if(w.enemyStatusBarList&&w.enemyStatusBarList.length>1){
				var ind = w.getTarget();
				if(ind<=0){
					nextInd = w.enemyStatusBarList.length-1;
				}else{
					nextInd = ind-1;
				}
				w.enemyStatusBarList[nextInd]._targetEnemy(w.enemyStatusBarList[nextInd],2);
				
			}			
		}else if(key=="g"){
			if(w.enemyStatusBarList&&w.enemyStatusBarList.length>1){
				var ind = w.getTarget();
				var nextInd;
				if(ind==-1||ind>=w.enemyStatusBarList.length-1){
					nextInd = 0;
				}else{
					nextInd = ind+1;
				}
				w.enemyStatusBarList[nextInd]._targetEnemy(w.enemyStatusBarList[nextInd],2);
			}
		}
		return !handled;
	}

	

});