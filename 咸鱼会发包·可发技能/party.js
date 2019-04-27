
function replacePartyFun(){
    i.assign(t.pc.party.par_001_002_003.SceneDelegate.prototype,{
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
            if (_.isUndefined(s.weapon_id))
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
            else {
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
                }, this)
            }
            _.each(o, function(e, n) {
                if (!(n >= 9)) {
                    var s = a.seekWidgetByName("sub_weapon_blank_" + n)
                      , o = s.seekWidgetByName("par_002_sub_weapon_ui");
                    return o.removeAllChildren(),
                    _.isUndefined(e.weapon_id) ? void kh.setTouchEventHandlers(s, {
                        "TOUCH_ENDED btn_sub_weapon_blank": function() {
                            kh.createInstance("router").navigate("party/par_013", {
                                party_id: this._a_party_id,
                                par_013: {
                                    number: n + 1
                                }
                            })
                        }
                    }, this) : void this._makeSubWeaponNode(o, e, n)
                }
            }, this)
        }
    });
}

