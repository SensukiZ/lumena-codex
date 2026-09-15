export const moveDatabase = {
    version: `0.1`,
    notes: {
        power: `null means the move does not directly deal damage or has variable power.`,
        accuracy: `null means it always succeeds unless blocked by battle rules.`,
        pp: `How many times the move can be used before replenishing at a Center.`,
        categories: [`physical`, `special`, `status`],
        suggested_types: [`Normal`, `Fire`, `Water`, `Electric`, `Grass`, `Ice`, `Fighting`, `Poison`, `Ground`, `Flying`, `Psychic`, `Bug`, `Rock`, `Ghost`, `Dragon`, `Dark`, `Steel`, `Fairy`],
        cooldown_ms: `Real-time cooldown used by legendary rift world combat. Server-enforced; lower values mean faster repeat use.`
    },
    moves: [{
        id: `struggle`,
        name: `Struggle`,
        type: `Normal`,
        category: `physical`,
        power: 50,
        accuracy: null,
        pp: 1,
        effect: {
            typeless_damage: !0,
            recoil_max_hp: .25
        },
        description: `A desperate neutral attack used only when no learned move can be selected. It costs one quarter of the Lumen's maximum HP.`,
        cooldown_ms: 3e3
    }, {
        id: `tiny_tackle`,
        name: `Tiny Tackle`,
        type: `Normal`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A simple body charge used by many young creatures.`,
        cooldown_ms: 2900
    }, {
        id: `quick_nudge`,
        name: `Quick Nudge`,
        type: `Normal`,
        category: `physical`,
        power: 35,
        accuracy: 100,
        pp: 25,
        effect: {
            priority: 1
        },
        description: `Your Lumen moves first with a fast little strike.`,
        cooldown_ms: 2300
    }, {
        id: `wild_scratch`,
        name: `Wild Scratch`,
        type: `Normal`,
        category: `physical`,
        power: 45,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `Your Lumen attacks with small claws or sharp paws.`,
        cooldown_ms: 3e3
    }, {
        id: `head_bonk`,
        name: `Head Bonk`,
        type: `Normal`,
        category: `physical`,
        power: 60,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 20,
            target_status: `flinch`
        },
        description: `A blunt headbutt that may make the opposing Lumen flinch.`,
        cooldown_ms: 3200
    }, {
        id: `heavy_slam`,
        name: `Heavy Slam`,
        type: `Normal`,
        category: `physical`,
        power: 85,
        accuracy: 90,
        pp: 10,
        effect: null,
        description: `Your Lumen throws its full weight into the opposing Lumen.`,
        cooldown_ms: 3800
    }, {
        id: `last_stand`,
        name: `Last Stand`,
        type: `Normal`,
        category: `physical`,
        power: null,
        accuracy: 100,
        pp: 10,
        effect: {
            variable_power: `Power increases as your Lumen's HP gets lower.`
        },
        description: `A desperate attack that grows stronger when your Lumen is weakened.`,
        cooldown_ms: 3600
    }, {
        id: `friendly_charge`,
        name: `Friendly Charge`,
        type: `Normal`,
        category: `physical`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            variable_power: `Power increases as your Lumen's HP gets lower.`
        },
        description: `A loyal charge that becomes fiercer when your Lumen is cornered.`,
        cooldown_ms: 3600
    }, {
        id: `focus_pose`,
        name: `Focus Pose`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 30,
        effect: {
            user_stat_changes: {
                attack: 1
            }
        },
        description: `Your Lumen focuses and raises its Attack.`,
        cooldown_ms: 5e3
    }, {
        id: `guard_curl`,
        name: `Guard Curl`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 35,
        effect: {
            user_stat_changes: {
                defense: 1
            }
        },
        description: `Your Lumen curls up and raises its Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `mocking_chirp`,
        name: `Mocking Chirp`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                attack: -1
            }
        },
        description: `A teasing call that lowers the opposing Lumen's Attack.`,
        cooldown_ms: 5e3
    }, {
        id: `ember_nip`,
        name: `Ember Nip`,
        type: `Fire`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 10,
            target_status: `burn`
        },
        description: `A small flame bite that may burn the opposing Lumen.`,
        cooldown_ms: 2900
    }, {
        id: `candle_flicker`,
        name: `Candle Flicker`,
        type: `Fire`,
        category: `special`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: {
            chance: 20,
            target_stat_changes: {
                accuracy: -1
            }
        },
        description: `A flickering burst of flame that may disturb the opposing Lumen's aim.`,
        cooldown_ms: 3100
    }, {
        id: `flame_dash`,
        name: `Flame Dash`,
        type: `Fire`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 10,
            target_status: `burn`
        },
        description: `Your Lumen rushes forward wrapped in flame.`,
        cooldown_ms: 3300
    }, {
        id: `blaze_fang`,
        name: `Blaze Fang`,
        type: `Fire`,
        category: `physical`,
        power: 75,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 20,
            target_status: `burn`
        },
        description: `A burning bite that may leave the opposing Lumen burned.`,
        cooldown_ms: 3600
    }, {
        id: `furnace_crash`,
        name: `Furnace Crash`,
        type: `Fire`,
        category: `physical`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            user_stat_changes: {
                defense: -1
            }
        },
        description: `Your Lumen slams forward with furnace-hot force, lowering its own Defense.`,
        cooldown_ms: 4100
    }, {
        id: `rising_flame`,
        name: `Rising Flame`,
        type: `Fire`,
        category: `special`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            user_stat_changes: {
                special_attack: 1
            }
        },
        description: `A rising flame column that may boost your Lumen's Special Attack.`,
        cooldown_ms: 3600
    }, {
        id: `heatwave_howl`,
        name: `Heatwave Howl`,
        type: `Fire`,
        category: `special`,
        power: 90,
        accuracy: 90,
        pp: 10,
        effect: {
            chance: 10,
            target_status: `burn`,
            target_scope: `all_opponents`
        },
        description: `A roaring wave of hot air that may burn all opposing Lumens.`,
        cooldown_ms: 3900
    }, {
        id: `solar_flare`,
        name: `Solar Flare`,
        type: `Fire`,
        category: `special`,
        power: 120,
        accuracy: 85,
        pp: 5,
        effect: {
            recharge: !0
        },
        description: `A massive burst of heat. Your Lumen must recover next turn.`,
        cooldown_ms: 4600
    }, {
        id: `sunny_signal`,
        name: `Sunny Signal`,
        type: `Fire`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            weather: `sun`,
            duration_turns: 5
        },
        description: `Summons strong sunlight for five turns.`,
        cooldown_ms: 6200
    }, {
        id: `kindle_up`,
        name: `Kindle Up`,
        type: `Fire`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                attack: 1,
                speed: 1
            }
        },
        description: `Your Lumen heats up, raising its Attack and Speed.`,
        cooldown_ms: 5e3
    }, {
        id: `ash_veil`,
        name: `Ash Veil`,
        type: `Fire`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 15,
        effect: {
            target_stat_changes: {
                accuracy: -1
            }
        },
        description: `Your Lumen scatters warm ash to lower the opposing Lumen's Accuracy.`,
        cooldown_ms: 5e3
    }, {
        id: `leaf_tap`,
        name: `Leaf Tap`,
        type: `Grass`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 10,
        effect: null,
        description: `A simple strike using a leaf, vine, or sprout.`,
        cooldown_ms: 2900
    }, {
        id: `vine_snare`,
        name: `Vine Snare`,
        type: `Grass`,
        category: `physical`,
        power: 45,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 20,
            target_stat_changes: {
                speed: -1
            }
        },
        description: `Your Lumen lashes vines that may slow the opposing Lumen.`,
        cooldown_ms: 3e3
    }, {
        id: `seed_shot`,
        name: `Seed Shot`,
        type: `Grass`,
        category: `physical`,
        power: 20,
        accuracy: 95,
        pp: 25,
        effect: {
            multi_hit: {
                min: 2,
                max: 5
            }
        },
        description: `Shoots several hard seeds in quick succession.`,
        cooldown_ms: 2400
    }, {
        id: `bloom_burst`,
        name: `Bloom Burst`,
        type: `Grass`,
        category: `special`,
        power: 65,
        accuracy: 100,
        pp: 15,
        effect: null,
        description: `Your Lumen releases a burst of pollen and petals.`,
        cooldown_ms: 3500
    }, {
        id: `root_drain`,
        name: `Root Drain`,
        type: `Grass`,
        category: `special`,
        power: 75,
        accuracy: 100,
        pp: 10,
        effect: {
            drain: .5
        },
        description: `Drains energy from the opposing Lumen and restores half the damage dealt.`,
        cooldown_ms: 3700
    }, {
        id: `thorn_rush`,
        name: `Thorn Rush`,
        type: `Grass`,
        category: `physical`,
        power: 80,
        accuracy: 95,
        pp: 15,
        effect: {
            recoil: .25
        },
        description: `A thorn-covered charge that also hurts your Lumen a little.`,
        cooldown_ms: 3700
    }, {
        id: `ancient_grove`,
        name: `Ancient Grove`,
        type: `Grass`,
        category: `special`,
        power: 100,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 20,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `Calls on old forest energy to strike the opposing Lumen.`,
        cooldown_ms: 4200
    }, {
        id: `sprout_guard`,
        name: `Sprout Guard`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                defense: 1,
                special_defense: 1
            }
        },
        description: `Your Lumen grows protective leaves to raise both defenses.`,
        cooldown_ms: 5e3
    }, {
        id: `pollen_daze`,
        name: `Pollen Daze`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: 75,
        pp: 15,
        effect: {
            target_status: `sleep`
        },
        description: `A calming pollen cloud may put the opposing Lumen to sleep.`,
        cooldown_ms: 5e3
    }, {
        id: `synthesis_glow`,
        name: `Synthesis Glow`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            heal: .5,
            weather_scaling: !0
        },
        description: `Restores HP. Healing improves in sunlight and weakens in bad weather.`,
        cooldown_ms: 5e3
    }, {
        id: `bubble_bop`,
        name: `Bubble Bop`,
        type: `Water`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 10,
            target_stat_changes: {
                speed: -1
            }
        },
        description: `A playful bubble attack that may lower Speed.`,
        cooldown_ms: 2900
    }, {
        id: `water_slap`,
        name: `Water Slap`,
        type: `Water`,
        category: `physical`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: null,
        description: `Your Lumen strikes with a water-coated tail or fin.`,
        cooldown_ms: 3100
    }, {
        id: `riptide_ram`,
        name: `Riptide Ram`,
        type: `Water`,
        category: `physical`,
        power: 85,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 20,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `Your Lumen drives forward on a crushing current that may lower the opposing Lumen's Defense.`,
        cooldown_ms: 3900
    }, {
        id: `tide_pulse`,
        name: `Tide Pulse`,
        type: `Water`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_status: `confuse`
        },
        description: `A pulsing wave that may confuse the opposing Lumen.`,
        cooldown_ms: 3300
    }, {
        id: `jet_current`,
        name: `Jet Current`,
        type: `Water`,
        category: `special`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            priority: 1
        },
        description: `A sudden water jet that lets your Lumen strike first.`,
        cooldown_ms: 3100
    }, {
        id: `whirlpool_lock`,
        name: `Whirlpool Lock`,
        type: `Water`,
        category: `special`,
        power: 35,
        accuracy: 85,
        pp: 15,
        effect: {
            trap: {
                duration_min: 4,
                duration_max: 5,
                damage_per_turn: .125
            }
        },
        description: `Traps the opposing Lumen in a whirlpool for several turns.`,
        cooldown_ms: 2600
    }, {
        id: `tidal_wave`,
        name: `Tidal Wave`,
        type: `Water`,
        category: `special`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: null,
        description: `A strong wave of water crashes into the opposing Lumen.`,
        cooldown_ms: 4100
    }, {
        id: `deep_surge`,
        name: `Deep Surge`,
        type: `Water`,
        category: `special`,
        power: 110,
        accuracy: 85,
        pp: 5,
        effect: {
            chance: 20,
            target_stat_changes: {
                speed: -1
            }
        },
        description: `A heavy surge from the depths that may slow the opposing Lumen.`,
        cooldown_ms: 4400
    }, {
        id: `ventburst_maelstrom`,
        name: `Ventburst Maelstrom`,
        type: `Water`,
        category: `special`,
        power: 100,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `burn`
        },
        description: `Cindergill vents superheated trench water from its furnace gills, blasting the opposing Lumen with a scalding maelstrom that may burn.`,
        cooldown_ms: 7200
    }, {
        id: `rain_signal`,
        name: `Rain Signal`,
        type: `Water`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            weather: `rain`,
            duration_turns: 5
        },
        description: `Summons rain for five turns.`,
        cooldown_ms: 6200
    }, {
        id: `mist_screen`,
        name: `Mist Screen`,
        type: `Water`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            team_buff: {
                special_defense: 1
            },
            duration_turns: 5
        },
        description: `Creates a protective mist that helps your entire party resist special attacks.`,
        cooldown_ms: 5e3
    }, {
        id: `cleanse_splash`,
        name: `Cleanse Splash`,
        type: `Water`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            cleanse_status: `self`
        },
        description: `Your Lumen washes away its status condition.`,
        cooldown_ms: 5e3
    }, {
        id: `bug_bite`,
        name: `Bug Bite`,
        type: `Bug`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small but reliable bite from a bug creature.`,
        cooldown_ms: 2900
    }, {
        id: `silk_trip`,
        name: `Silk Trip`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: 95,
        pp: 30,
        effect: {
            target_stat_changes: {
                speed: -1
            }
        },
        description: `Sticky silk slows the opposing Lumen.`,
        cooldown_ms: 5e3
    }, {
        id: `stinger_jab`,
        name: `Stinger Jab`,
        type: `Bug`,
        category: `physical`,
        power: 55,
        accuracy: 100,
        pp: 20,
        effect: {
            chance: 20,
            target_status: `poison`
        },
        description: `A sharp sting that may poison the opposing Lumen.`,
        cooldown_ms: 3200
    }, {
        id: `cocoon_brace`,
        name: `Cocoon Brace`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 30,
        effect: {
            user_stat_changes: {
                defense: 2
            }
        },
        description: `Your Lumen hardens its shell to sharply raise Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `flutter_dust`,
        name: `Flutter Dust`,
        type: `Bug`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 30,
            target_stat_changes: {
                accuracy: -1
            }
        },
        description: `A dusting of wing powder that may lower Accuracy.`,
        cooldown_ms: 3300
    }, {
        id: `hive_rush`,
        name: `Hive Rush`,
        type: `Bug`,
        category: `physical`,
        power: 25,
        accuracy: 95,
        pp: 20,
        effect: {
            multi_hit: {
                min: 2,
                max: 5
            }
        },
        description: `A swarm of quick strikes hits multiple times.`,
        cooldown_ms: 2400
    }, {
        id: `needle_storm`,
        name: `Needle Storm`,
        type: `Bug`,
        category: `physical`,
        power: 90,
        accuracy: 85,
        pp: 10,
        effect: {
            chance: 20,
            target_status: `poison`
        },
        description: `A storm of sharp needles that may poison the opposing Lumen.`,
        cooldown_ms: 3900
    }, {
        id: `metamorph`,
        name: `Metamorph`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            user_stat_changes: {
                attack: 1,
                special_attack: 1,
                speed: 1
            }
        },
        description: `Your Lumen changes form slightly, raising its offensive stats and Speed.`,
        cooldown_ms: 5e3
    }, {
        id: `web_lock`,
        name: `Web Lock`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 10,
        effect: {
            prevents_switching: !0
        },
        description: `The opposing Lumen is trapped and cannot switch out.`,
        cooldown_ms: 5e3
    }, {
        id: `wing_flick`,
        name: `Wing Flick`,
        type: `Flying`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A quick wing strike.`,
        cooldown_ms: 2900
    }, {
        id: `gust_spiral`,
        name: `Gust Spiral`,
        type: `Flying`,
        category: `special`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: null,
        description: `Your Lumen whips up a small spiral of wind.`,
        cooldown_ms: 3100
    }, {
        id: `peck_dive`,
        name: `Peck Dive`,
        type: `Flying`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 10,
            target_status: `flinch`
        },
        description: `A fast diving peck that may cause flinching.`,
        cooldown_ms: 3300
    }, {
        id: `tailwind_path`,
        name: `Tailwind Path`,
        type: `Flying`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 15,
        effect: {
            team_buff: {
                speed_multiplier: 2
            },
            duration_turns: 4
        },
        description: `A helpful wind doubles your party's Speed for a few turns.`,
        cooldown_ms: 5e3
    }, {
        id: `aero_cut`,
        name: `Aero Cut`,
        type: `Flying`,
        category: `special`,
        power: 75,
        accuracy: 95,
        pp: 15,
        effect: {
            high_crit: !0
        },
        description: `A sharp blade of air with a high critical-hit chance.`,
        cooldown_ms: 3600
    }, {
        id: `sky_drop`,
        name: `Sky Drop`,
        type: `Flying`,
        category: `physical`,
        power: 85,
        accuracy: 90,
        pp: 10,
        effect: null,
        description: `Your Lumen lifts and drops the opposing Lumen with strong aerial force.`,
        cooldown_ms: 3800
    }, {
        id: `stormcall`,
        name: `Stormcall`,
        type: `Flying`,
        category: `special`,
        power: 110,
        accuracy: 70,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `confuse`
        },
        description: `A wild storm blast that may confuse the opposing Lumen.`,
        cooldown_ms: 4400
    }, {
        id: `feather_guard`,
        name: `Feather Guard`,
        type: `Flying`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                evasion: 1
            }
        },
        description: `Your Lumen drifts lightly and raises its Evasion.`,
        cooldown_ms: 5e3
    }, {
        id: `static_nip`,
        name: `Static Nip`,
        type: `Electric`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 10,
            target_status: `paralyze`
        },
        description: `A small electrified bite that may paralyze.`,
        cooldown_ms: 2900
    }, {
        id: `spark_pounce`,
        name: `Spark Pounce`,
        type: `Electric`,
        category: `physical`,
        power: 65,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 30,
            target_status: `paralyze`
        },
        description: `Your Lumen leaps with charged fur or scales.`,
        cooldown_ms: 3500
    }, {
        id: `arc_rush`,
        name: `Arc Rush`,
        type: `Electric`,
        category: `physical`,
        power: 85,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 10,
            target_status: `paralyze`
        },
        description: `Your Lumen surges forward wrapped in live current that may paralyze.`,
        cooldown_ms: 3900
    }, {
        id: `bolt_beam`,
        name: `Bolt Beam`,
        type: `Electric`,
        category: `special`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 10,
            target_status: `paralyze`
        },
        description: `A focused electric blast that may paralyze.`,
        cooldown_ms: 4100
    }, {
        id: `overcharge`,
        name: `Overcharge`,
        type: `Electric`,
        category: `special`,
        power: 120,
        accuracy: 85,
        pp: 5,
        effect: {
            recoil: .25
        },
        description: `A huge electric discharge that damages your Lumen too.`,
        cooldown_ms: 4600
    }, {
        id: `battery_boost`,
        name: `Battery Boost`,
        type: `Electric`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                special_attack: 1,
                speed: 1
            }
        },
        description: `Your Lumen charges itself, raising Special Attack and Speed.`,
        cooldown_ms: 5e3
    }, {
        id: `short_circuit`,
        name: `Short Circuit`,
        type: `Electric`,
        category: `status`,
        power: null,
        accuracy: 90,
        pp: 15,
        effect: {
            target_status: `paralyze`
        },
        description: `A disruptive charge attempts to paralyze the opposing Lumen.`,
        cooldown_ms: 5e3
    }, {
        id: `mud_flick`,
        name: `Mud Flick`,
        type: `Ground`,
        category: `special`,
        power: 30,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                accuracy: -1
            }
        },
        description: `Your Lumen flicks mud into the opposing Lumen's eyes.`,
        cooldown_ms: 2600
    }, {
        id: `sand_snare`,
        name: `Sand Snare`,
        type: `Ground`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                speed: -1
            }
        },
        description: `Your Lumen tangles the opposing Lumen in shifting sand, lowering its Speed.`,
        cooldown_ms: 4300
    }, {
        id: `earth_spike`,
        name: `Earth Spike`,
        type: `Ground`,
        category: `physical`,
        power: 75,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 30,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A jagged ground strike that can crack the opposing Lumen's Defense.`,
        cooldown_ms: 3600
    }, {
        id: `burrow_strike`,
        name: `Burrow Strike`,
        type: `Ground`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            charge_turn: !0,
            semi_invulnerable: `underground`
        },
        description: `Your Lumen digs underground, then strikes on the next turn.`,
        cooldown_ms: 3600
    }, {
        id: `quake_step`,
        name: `Quake Step`,
        type: `Ground`,
        category: `physical`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            target_scope: `all_adjacent`,
            hits_semi_invulnerable: `underground`,
            semi_invulnerable_damage_multiplier: 2
        },
        description: `Your Lumen stomps the ground and hits all nearby Lumens.`,
        cooldown_ms: 4100
    }, {
        id: `stone_toss`,
        name: `Stone Toss`,
        type: `Rock`,
        category: `physical`,
        power: 50,
        accuracy: 90,
        pp: 20,
        effect: null,
        description: `Your Lumen hurls a small stone at the opposing Lumen.`,
        cooldown_ms: 3e3
    }, {
        id: `crystal_spike`,
        name: `Crystal Spike`,
        type: `Rock`,
        category: `physical`,
        power: 80,
        accuracy: 95,
        pp: 15,
        effect: {
            high_crit: !0
        },
        description: `A sharp crystal strike with a high critical-hit chance.`,
        cooldown_ms: 3700
    }, {
        id: `rockfall`,
        name: `Rockfall`,
        type: `Rock`,
        category: `physical`,
        power: 100,
        accuracy: 80,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `flinch`
        },
        description: `Heavy stones crash down and may make the opposing Lumen flinch.`,
        cooldown_ms: 4200
    }, {
        id: `sand_signal`,
        name: `Sand Signal`,
        type: `Rock`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            weather: `sandstorm`,
            duration_turns: 5
        },
        description: `Summons a sandstorm for five turns.`,
        cooldown_ms: 6200
    }, {
        id: `metal_tap`,
        name: `Metal Tap`,
        type: `Steel`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small metallic strike.`,
        cooldown_ms: 2900
    }, {
        id: `vault_bash`,
        name: `Vault Bash`,
        type: `Steel`,
        category: `physical`,
        power: 70,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 20,
            user_stat_changes: {
                defense: 1
            }
        },
        description: `A heavy armored hit that may raise your Lumen's Defense.`,
        cooldown_ms: 3400
    }, {
        id: `iron_snap`,
        name: `Iron Snap`,
        type: `Steel`,
        category: `physical`,
        power: 85,
        accuracy: 90,
        pp: 10,
        effect: {
            chance: 20,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A sharp metallic clamp that may lower Defense.`,
        cooldown_ms: 3800
    }, {
        id: `lock_plating`,
        name: `Lock Plating`,
        type: `Steel`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 15,
        effect: {
            user_stat_changes: {
                defense: 2
            }
        },
        description: `Your Lumen reinforces itself and sharply raises Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `needle_armor`,
        name: `Needle Armor`,
        type: `Steel`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            contact_damage: .125,
            duration_turns: 5
        },
        description: `Covers your Lumen in sharp armor that hurts opposing Lumens on contact.`,
        cooldown_ms: 5e3
    }, {
        id: `ghost_tap`,
        name: `Ghost Tap`,
        type: `Ghost`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small spiritual strike.`,
        cooldown_ms: 2900
    }, {
        id: `haunt`,
        name: `Haunt`,
        type: `Ghost`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 15,
        effect: {
            target_status: `curse`,
            damage_per_turn: .125
        },
        description: `A haunting presence slowly drains the opposing Lumen each turn.`,
        cooldown_ms: 5e3
    }, {
        id: `soul_spark`,
        name: `Soul Spark`,
        type: `Ghost`,
        category: `special`,
        power: 65,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A spiritual spark that may weaken special defenses.`,
        cooldown_ms: 3500
    }, {
        id: `mirror_wisp`,
        name: `Mirror Wisp`,
        type: `Ghost`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            copy_target_stat_changes: !0
        },
        description: `Your Lumen copies the opposing Lumen's current stat changes.`,
        cooldown_ms: 5e3
    }, {
        id: `final_echo`,
        name: `Final Echo`,
        type: `Ghost`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            if_user_faints_this_turn_target_faints: !0
        },
        description: `If your Lumen faints this turn, the opposing Lumen is taken down too.`,
        cooldown_ms: 5e3
    }, {
        id: `shadow_swipe`,
        name: `Shadow Swipe`,
        type: `Dark`,
        category: `physical`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: null,
        description: `A quick swipe from your Lumen's shadow.`,
        cooldown_ms: 3100
    }, {
        id: `dark_bargain`,
        name: `Dark Bargain`,
        type: `Dark`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            hp_cost: .5,
            user_stat_changes: {
                attack: 2,
                special_attack: 2
            }
        },
        description: `Your Lumen sacrifices half its HP to sharply boost both offenses.`,
        cooldown_ms: 5e3
    }, {
        id: `night_bite`,
        name: `Night Bite`,
        type: `Dark`,
        category: `physical`,
        power: 80,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A dark bite that may lower Defense.`,
        cooldown_ms: 3800
    }, {
        id: `sneak_hit`,
        name: `Sneak Hit`,
        type: `Dark`,
        category: `physical`,
        power: 60,
        accuracy: null,
        pp: 15,
        effect: {
            never_misses: !0
        },
        description: `A sneaky attack that ignores Accuracy and Evasion.`,
        cooldown_ms: 3300
    }, {
        id: `mind_ping`,
        name: `Mind Ping`,
        type: `Psychic`,
        category: `special`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: null,
        description: `A small psychic pulse.`,
        cooldown_ms: 3100
    }, {
        id: `future_ping`,
        name: `Future Ping`,
        type: `Psychic`,
        category: `special`,
        power: 120,
        accuracy: 100,
        pp: 10,
        effect: {
            delayed_damage_turns: 2
        },
        description: `Damage lands two turns after this move is used.`,
        cooldown_ms: 4800
    }, {
        id: `brain_fog`,
        name: `Brain Fog`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            target_status: `confuse`
        },
        description: `Clouds the opposing Lumen's thoughts and causes confusion.`,
        cooldown_ms: 5e3
    }, {
        id: `reflective_mind`,
        name: `Reflective Mind`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            screen: `special_damage_reduction`,
            duration_turns: 5
        },
        description: `Creates a mental screen that reduces special damage.`,
        cooldown_ms: 6200
    }, {
        id: `mental_rebound`,
        name: `Mental Rebound`,
        type: `Psychic`,
        category: `special`,
        power: null,
        accuracy: 100,
        pp: 15,
        effect: {
            counter_special_damage_multiplier: 2,
            priority: -5
        },
        description: `Moves last; returns double damage after a special hit.`,
        cooldown_ms: 3600
    }, {
        id: `toxin_spit`,
        name: `Toxin Spit`,
        type: `Poison`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 30,
            target_status: `poison`
        },
        description: `A toxic spray that may poison the opposing Lumen.`,
        cooldown_ms: 2900
    }, {
        id: `venom_jab`,
        name: `Venom Jab`,
        type: `Poison`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 30,
            target_status: `poison`
        },
        description: `A venomous strike that may poison the opposing Lumen.`,
        cooldown_ms: 3600
    }, {
        id: `corrode_bite`,
        name: `Corrode Bite`,
        type: `Poison`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 30,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A caustic bite that can eat through the opposing Lumen's Defense.`,
        cooldown_ms: 3400
    }, {
        id: `sludge_pop`,
        name: `Sludge Pop`,
        type: `Poison`,
        category: `special`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 30,
            target_status: `poison`
        },
        description: `A bursting sludge attack that may poison the opposing Lumen.`,
        cooldown_ms: 4100
    }, {
        id: `venom_barbs`,
        name: `Venom Barbs`,
        type: `Poison`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            entry_hazard: `poison_barbs`
        },
        description: `Scatters toxic barbs that poison grounded Lumens entering the opposing field. Grounded Poison Lumens clear them.`,
        cooldown_ms: 5600
    }, {
        id: `toxic_cloud`,
        name: `Toxic Cloud`,
        type: `Poison`,
        category: `status`,
        power: null,
        accuracy: 90,
        pp: 10,
        effect: {
            target_status: `bad_poison`
        },
        description: `Badly poisons the opposing Lumen, increasing damage each turn.`,
        cooldown_ms: 5e3
    }, {
        id: `gleam_tap`,
        name: `Gleam Tap`,
        type: `Fairy`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small burst of clean light.`,
        cooldown_ms: 2900
    }, {
        id: `prism_beam`,
        name: `Prism Beam`,
        type: `Fairy`,
        category: `special`,
        power: 80,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A refracted beam that may lower Special Defense.`,
        cooldown_ms: 3800
    }, {
        id: `heal_glow`,
        name: `Heal Glow`,
        type: `Fairy`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            heal: .5
        },
        description: `Your Lumen restores half of its max HP.`,
        cooldown_ms: 5e3
    }, {
        id: `party_bell`,
        name: `Party Bell`,
        type: `Fairy`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            cleanse_status: `party`
        },
        description: `Clears status conditions from your entire party.`,
        cooldown_ms: 5e3
    }, {
        id: `safe_circle`,
        name: `Safe Circle`,
        type: `Fairy`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 25,
        effect: {
            team_status_immunity: !0,
            duration_turns: 5
        },
        description: `Protects your entire party from new status conditions for five turns.`,
        cooldown_ms: 5e3
    }, {
        id: `origin_pulse`,
        name: `Origin Pulse`,
        type: `Psychic`,
        category: `special`,
        power: 80,
        accuracy: 95,
        pp: 5,
        effect: {
            type_targets_weakness: !0
        },
        description: `Originu reads the opposing Lumen's pattern and shifts this pulse into the type that hurts most.`,
        cooldown_ms: 3300
    }, {
        id: `leviathan_crush`,
        name: `Leviathan Crush`,
        type: `Water`,
        category: `physical`,
        power: 150,
        accuracy: 90,
        pp: 5,
        effect: {
            recharge: !0
        },
        description: `A massive crushing wave. Your Lumen must recover next turn.`,
        cooldown_ms: 5400
    }, {
        id: `frost_tap`,
        name: `Frost Tap`,
        type: `Ice`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small burst of cold that chills the opposing Lumen.`,
        cooldown_ms: 2900
    }, {
        id: `snow_veil`,
        name: `Snow Veil`,
        type: `Ice`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                evasion: 1
            }
        },
        description: `Your Lumen hides in swirling snow and raises its Evasion.`,
        cooldown_ms: 5e3
    }, {
        id: `ice_fang`,
        name: `Ice Fang`,
        type: `Ice`,
        category: `physical`,
        power: 65,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 10,
            target_status: `freeze`
        },
        description: `A cold bite that may freeze the opposing Lumen.`,
        cooldown_ms: 3300
    }, {
        id: `glacier_crash`,
        name: `Glacier Crash`,
        type: `Ice`,
        category: `physical`,
        power: 90,
        accuracy: 90,
        pp: 10,
        effect: {
            chance: 20,
            target_status: `flinch`
        },
        description: `Your Lumen slams the opposing Lumen with heavy glacial force.`,
        cooldown_ms: 3900
    }, {
        id: `crystal_freeze`,
        name: `Crystal Freeze`,
        type: `Ice`,
        category: `special`,
        power: 100,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 20,
            target_status: `freeze`
        },
        description: `Sharp cold crystals burst around the opposing Lumen and may freeze it.`,
        cooldown_ms: 4200
    }, {
        id: `blizzard_call`,
        name: `Blizzard Call`,
        type: `Ice`,
        category: `special`,
        power: 110,
        accuracy: 70,
        pp: 5,
        effect: {
            chance: 30,
            target_stat_changes: {
                speed: -1
            }
        },
        description: `Calls a fierce blizzard that may slow the opposing Lumen.`,
        cooldown_ms: 4400
    }, {
        id: `scale_swipe`,
        name: `Scale Swipe`,
        type: `Dragon`,
        category: `physical`,
        power: 45,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A quick draconic swipe with hardened scales.`,
        cooldown_ms: 3e3
    }, {
        id: `dragon_breath`,
        name: `Dragon Breath`,
        type: `Dragon`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_status: `paralyze`
        },
        description: `A focused draconic breath that may paralyze the opposing Lumen.`,
        cooldown_ms: 3300
    }, {
        id: `ancient_roar`,
        name: `Ancient Roar`,
        type: `Dragon`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                attack: -1,
                special_attack: -1
            }
        },
        description: `An old roar that weakens the opposing Lumen's offenses.`,
        cooldown_ms: 5e3
    }, {
        id: `wyrm_coil`,
        name: `Wyrm Coil`,
        type: `Dragon`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            user_stat_changes: {
                attack: 1,
                defense: 1
            }
        },
        description: `Your Lumen coils with ancient strength, raising its Attack and Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `mythic_claw`,
        name: `Mythic Claw`,
        type: `Dragon`,
        category: `physical`,
        power: 90,
        accuracy: 95,
        pp: 10,
        effect: {
            high_crit: !0
        },
        description: `A mythical claw strike with a high critical-hit chance.`,
        cooldown_ms: 3900
    }, {
        id: `origin_roar`,
        name: `Origin Roar`,
        type: `Dragon`,
        category: `special`,
        power: 120,
        accuracy: 85,
        pp: 5,
        effect: {
            recharge: !0
        },
        description: `A primal roar of origin energy. Your Lumen must recover next turn.`,
        cooldown_ms: 4600
    }, {
        id: `code_break`,
        name: `Code Break`,
        type: `Psychic`,
        category: `special`,
        power: 100,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A forbidden psychic strike that disrupts the opposing Lumen's inner pattern.`,
        cooldown_ms: 4200
    }, {
        id: `firewall`,
        name: `Firewall`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            priority: 4,
            protect: !0
        },
        description: `Raises an instant barrier that blocks the incoming move. Repeated use is likely to fail.`,
        cooldown_ms: 5e3
    }, {
        id: `defrag`,
        name: `Defrag`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            heal: 1,
            self_status: `sleep`,
            sleep_turns: 2
        },
        description: `Fully restores your Lumen's HP, but it goes dormant for two turns to rebuild itself.`,
        cooldown_ms: 5e3
    }, {
        id: `cinder_hex`,
        name: `Cinder Hex`,
        type: `Fire`,
        category: `status`,
        power: null,
        accuracy: 85,
        pp: 15,
        effect: {
            target_status: `burn`
        },
        description: `A smoldering sigil that burns the opposing Lumen, sapping its physical power.`,
        cooldown_ms: 5e3
    }, {
        id: `deep_focus`,
        name: `Deep Focus`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                special_attack: 1,
                special_defense: 1
            }
        },
        description: `Your Lumen calms its mind, raising its Special Attack and Special Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `reset_pulse`,
        name: `Reset Pulse`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 30,
        effect: {
            clears_all_stat_changes: !0
        },
        description: `A neutralizing pulse that erases every stat change on both battlers.`,
        cooldown_ms: 5e3
    }, {
        id: `frost_signal`,
        name: `Frost Signal`,
        type: `Ice`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            weather: `snow`,
            duration_turns: 5
        },
        description: `Summons a snowfall that blankets the battlefield for five turns.`,
        cooldown_ms: 6200
    }, {
        id: `bulwark_field`,
        name: `Bulwark Field`,
        type: `Steel`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            screen: `physical_damage_reduction`,
            duration_turns: 5
        },
        description: `Projects a hardened field that softens physical blows against your entire party.`,
        cooldown_ms: 6200
    }, {
        id: `compiled_power`,
        name: `Compiled Power`,
        type: `Psychic`,
        category: `special`,
        power: 20,
        accuracy: 100,
        pp: 10,
        effect: {
            power_per_boost: 20,
            max_power: 140
        },
        description: `Unleashes stored momentum, growing stronger with every stat boost your Lumen has compiled.`,
        cooldown_ms: 2400
    }, {
        id: `hijack`,
        name: `Hijack`,
        type: `Dark`,
        category: `physical`,
        power: 90,
        accuracy: 100,
        pp: 15,
        effect: {
            uses_target_attack: !0
        },
        description: `Turns the opposing Lumen's own strength against it — the stronger it is, the harder this move hits.`,
        cooldown_ms: 4100
    }, {
        id: `checksum`,
        name: `Checksum`,
        type: `Normal`,
        category: `special`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            fixed_damage: `level`
        },
        description: `Deals exact damage equal to your Lumen's level. No more, no less.`,
        cooldown_ms: 3600
    }, {
        id: `bitshift`,
        name: `Bitshift`,
        type: `Dark`,
        category: `special`,
        power: null,
        accuracy: 90,
        pp: 10,
        effect: {
            halves_target_hp: !0
        },
        description: `A corrupting strike that cuts the opposing Lumen's remaining HP in half.`,
        cooldown_ms: 3400
    }, {
        id: `load_balance`,
        name: `Load Balance`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            average_hp_with_target: !0
        },
        description: `Redistributes vitality, averaging your Lumen's and the opposing Lumen's remaining HP.`,
        cooldown_ms: 5e3
    }, {
        id: `cheap_shot`,
        name: `Cheap Shot`,
        type: `Dark`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 5,
        effect: {
            priority: 1,
            fails_if_target_not_attacking: !0
        },
        description: `A vicious pre-emptive strike. Fails unless the opposing Lumen is readying an attack.`,
        cooldown_ms: 3100
    }, {
        id: `rampart_press`,
        name: `Rampart Press`,
        type: `Steel`,
        category: `physical`,
        power: 80,
        accuracy: 100,
        pp: 10,
        effect: {
            uses_stat: `defense`
        },
        description: `Crushes the opposing Lumen under sheer bulk, using your Lumen's Defense instead of Attack.`,
        cooldown_ms: 3800
    }, {
        id: `siphon_spores`,
        name: `Siphon Spores`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: 90,
        pp: 10,
        effect: {
            leech: .125
        },
        description: `Seeds the opposing Lumen with spores that siphon HP to your Lumen every turn.`,
        cooldown_ms: 5e3
    }, {
        id: `echo_lock`,
        name: `Echo Lock`,
        type: `Ghost`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            disable_last_move_turns: 3
        },
        description: `Locks the opposing Lumen's last-used move behind a spectral echo for three turns.`,
        cooldown_ms: 6200
    }, {
        id: `jeering_static`,
        name: `Jeering Static`,
        type: `Dark`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            taunt_turns: 3
        },
        description: `Goads the opposing Lumen with grating static. It can only use damaging moves for three turns.`,
        cooldown_ms: 5e3
    }, {
        id: `temporal_drift`,
        name: `Temporal Drift`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            field_tempo: `inverted`,
            duration_turns: 5
        },
        description: `Twists the flow of time so slower battlers act first. Lasts five turns.`,
        cooldown_ms: 6200
    }, {
        id: `crystal_snare`,
        name: `Crystal Snare`,
        type: `Rock`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            entry_hazard: `shards`
        },
        description: `Scatters jagged crystal shards that wound Lumens entering the opposing field.`,
        cooldown_ms: 6200
    }, {
        id: `scout_dash`,
        name: `Scout Dash`,
        type: `Bug`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            switch_after_attack: !0
        },
        description: `Strikes fast, then retreats so another Lumen from your party can take over.`,
        cooldown_ms: 3600
    }, {
        id: `banish_howl`,
        name: `Banish Howl`,
        type: `Dark`,
        category: `status`,
        power: null,
        accuracy: 90,
        pp: 10,
        effect: {
            forces_switch: !0
        },
        description: `A dreadful howl that drives the opposing Lumen out of battle.`,
        cooldown_ms: 6200
    }, {
        id: `overclock`,
        name: `Overclock`,
        type: `Electric`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            user_stat_changes: {
                special_attack: 2,
                speed: 1
            },
            hp_cost: .25
        },
        description: `Pushes the core far past its limits — huge power at the cost of a quarter of max HP.`,
        cooldown_ms: 5e3
    }, {
        id: `jab_pop`,
        name: `Jab Pop`,
        type: `Fighting`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A quick little punch that snaps forward before the opposing Lumen can settle.`,
        cooldown_ms: 2700
    }, {
        id: `step_kick`,
        name: `Step Kick`,
        type: `Fighting`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: null,
        description: `Your Lumen steps in with a clean kick powered by practiced footwork.`,
        cooldown_ms: 3100
    }, {
        id: `tempo_sweep`,
        name: `Tempo Sweep`,
        type: `Fighting`,
        category: `physical`,
        power: 55,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                speed: -1
            }
        },
        description: `A low sweeping strike that knocks the opposing Lumen off rhythm and lowers its Speed.`,
        cooldown_ms: 3200
    }, {
        id: `brace_up`,
        name: `Brace Up`,
        type: `Fighting`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                attack: 1,
                defense: 1
            }
        },
        description: `Your Lumen plants its stance, raising its Attack and Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `guard_break`,
        name: `Guard Break`,
        type: `Fighting`,
        category: `physical`,
        power: 70,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 30,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A sharp strike that can crack the opposing Lumen's guard and lower its Defense.`,
        cooldown_ms: 3500
    }, {
        id: `meteor_clinch`,
        name: `Meteor Clinch`,
        type: `Fighting`,
        category: `physical`,
        power: 95,
        accuracy: 90,
        pp: 10,
        effect: null,
        description: `Your Lumen grabs its opening and crashes in with a decisive finishing blow.`,
        cooldown_ms: 4100
    }, {
        id: `consensus_prism`,
        name: `Consensus Prism`,
        type: `Psychic`,
        category: `special`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A synchronized prism burst that can fracture the opposing Lumen's focus.`,
        cooldown_ms: 4400
    }, {
        id: `neon_fork`,
        name: `Neon Fork`,
        type: `Electric`,
        category: `special`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `paralyze`
        },
        description: `A spectral neon split that races through the opposing Lumen's nerves.`,
        cooldown_ms: 4400
    }, {
        id: `genesis_stampede`,
        name: `Genesis Stampede`,
        type: `Rock`,
        category: `physical`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `Your Lumen charges like the first block of a mountain, cracking the opposing Lumen's guard.`,
        cooldown_ms: 4400
    }, {
        id: `capsule_bloom`,
        name: `Capsule Bloom`,
        type: `Fairy`,
        category: `special`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            user_stat_changes: {
                special_attack: 1
            }
        },
        description: `The sealed prism opens into a burst of light, sometimes raising your Lumen's Special Attack.`,
        cooldown_ms: 4400
    }, {
        id: `core_overdrive`,
        name: `Core Overdrive`,
        type: `Electric`,
        category: `special`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `paralyze`
        },
        description: `Your Lumen's core spins past its limiter and fires a bright surge that may paralyze the opposing Lumen.`,
        cooldown_ms: 4400
    }, {
        id: `thunder_ram`,
        name: `Thunder Ram`,
        type: `Electric`,
        category: `physical`,
        power: 110,
        accuracy: 100,
        pp: 10,
        effect: {
            recoil: .25
        },
        description: `Your Lumen drives its charged armored body into the target, taking recoil equal to a quarter of the damage dealt.`,
        cooldown_ms: 4600
    }, {
        id: `root_circuit`,
        name: `Root Circuit`,
        type: `Grass`,
        category: `special`,
        power: 70,
        accuracy: 100,
        pp: 10,
        effect: {
            conditional_power: {
                power: 105,
                when: `target_last_move_type`,
                type: `Electric`
            }
        },
        description: `Roots crackle with stored charge. Power jumps to 105 if the opposing Lumen's last move was Electric.`,
        cooldown_ms: 3500,
        introduced: `season_one`
    }, {
        id: `grounding_bloom`,
        name: `Grounding Bloom`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            absorb_type: {
                type: `Electric`,
                heal: .25
            },
            duration_turns: 2
        },
        description: `Blooms a grounding petal that absorbs one Electric attack until the end of next turn and heals your Lumen.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `thorn_turn`,
        name: `Thorn Turn`,
        type: `Grass`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            switch_after_attack: !0
        },
        description: `A thorny lash that lets your Lumen switch out after it lands.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `seed_pantry`,
        name: `Seed Pantry`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            side_entry_effect: {
                heal: .25
            },
            duration_turns: 5
        },
        description: `Stores a seed on your side for a few turns. The next Lumen you send in eats it to recover HP.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `canopy_drop`,
        name: `Canopy Drop`,
        type: `Grass`,
        category: `physical`,
        power: 80,
        accuracy: 95,
        pp: 10,
        effect: {
            hits_semi_invulnerable: `airborne`,
            semi_invulnerable_damage_multiplier: 1.5
        },
        description: `Drops a heavy canopy from above and hits airborne Lumens even harder.`,
        cooldown_ms: 3700,
        introduced: `season_one`
    }, {
        id: `solar_bloom`,
        name: `Solar Bloom`,
        type: `Grass`,
        category: `special`,
        power: 120,
        accuracy: 100,
        pp: 5,
        effect: {
            charge_turn: !0,
            skip_charge_in_weather: `sun`
        },
        description: `Gathers sunlight for a turn, then releases it in a blinding bloom. Fires at once in sunny weather.`,
        cooldown_ms: 4500,
        introduced: `season_one`
    }, {
        id: `undertow_cut`,
        name: `Undertow Cut`,
        type: `Water`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            high_crit: !0
        },
        description: `A slicing undertow with a high critical-hit chance.`,
        cooldown_ms: 3500,
        introduced: `season_one`
    }, {
        id: `low_tide`,
        name: `Low Tide`,
        type: `Water`,
        category: `special`,
        power: 65,
        accuracy: 100,
        pp: 15,
        effect: {
            conditional_power: {
                power: 100,
                when: `target_below_half_hp`
            }
        },
        description: `Drags the opposing Lumen down. Power rises to 100 when the opposing Lumen is below half HP.`,
        cooldown_ms: 3400,
        introduced: `season_one`
    }, {
        id: `pressure_current`,
        name: `Pressure Current`,
        type: `Water`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            target_stat_changes: {
                attack: -1
            }
        },
        description: `A crushing current that lowers the opposing Lumen's Attack.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `acid_signal`,
        name: `Acid Signal`,
        type: `Poison`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 15,
        effect: {
            target_stat_changes: {
                special_defense: -2
            }
        },
        description: `A corrosive signal that harshly lowers the opposing Lumen's Sp. Def.`,
        cooldown_ms: 2900,
        introduced: `season_one`
    }, {
        id: `toxin_feast`,
        name: `Toxin Feast`,
        type: `Poison`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 10,
        effect: {
            conditional_power: {
                power: 105,
                when: `target_status_in`,
                statuses: [`poison`, `bad_poison`]
            }
        },
        description: `Feeds on venom. Power rises to 105 against a poisoned Lumen.`,
        cooldown_ms: 3500,
        introduced: `season_one`
    }, {
        id: `purging_fumes`,
        name: `Purging Fumes`,
        type: `Poison`,
        category: `special`,
        power: 50,
        accuracy: null,
        pp: 10,
        effect: {
            never_misses: !0,
            clears_target_stat_changes: !0
        },
        description: `Never-missing fumes that wipe away every stat change on the opposing Lumen.`,
        cooldown_ms: 3100,
        introduced: `season_one`
    }, {
        id: `venom_lash`,
        name: `Venom Lash`,
        type: `Poison`,
        category: `physical`,
        power: 80,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 30,
            target_status: `poison`
        },
        description: `A venomous lash that may poison the opposing Lumen.`,
        cooldown_ms: 3700,
        introduced: `season_one`
    }, {
        id: `corrosion_hymn`,
        name: `Corrosion Hymn`,
        type: `Poison`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            corrosive_turns: 3
        },
        description: `For a few turns your Lumen's Poison attacks corrode Steel, hitting it for neutral damage.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `caustic_guard`,
        name: `Caustic Guard`,
        type: `Poison`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            priority: 4,
            protect: !0,
            protect_contact_status: `poison`
        },
        description: `Protects your Lumen this turn and poisons any Lumen whose physical attack hits the guard.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `counterweight`,
        name: `Counterweight`,
        type: `Normal`,
        category: `physical`,
        power: 80,
        accuracy: 100,
        pp: 10,
        effect: {
            uses_stat: `defense`
        },
        description: `Throws your Lumen's full weight into the opposing Lumen, using its Defense instead of Attack.`,
        cooldown_ms: 3700,
        introduced: `season_one`
    }, {
        id: `last_word`,
        name: `Last Word`,
        type: `Normal`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            conditional_power: {
                power: 90,
                when: `target_moved_this_turn`
            }
        },
        description: `A closing retort. Power rises to 90 if the opposing Lumen already moved this turn.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `second_wind`,
        name: `Second Wind`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            heal: .3333,
            clears_user_negative_stages: !0
        },
        description: `Your Lumen catches its breath, restoring a third of its max HP and shaking off stat drops.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `echo_relay`,
        name: `Echo Relay`,
        type: `Normal`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            switch_after_attack: !0
        },
        description: `A bouncing echo that lets your Lumen switch out after it lands.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `fault_pulse`,
        name: `Fault Pulse`,
        type: `Ground`,
        category: `special`,
        power: 85,
        accuracy: 100,
        pp: 15,
        effect: null,
        description: `A steady seismic pulse with no side effect.`,
        cooldown_ms: 3800,
        introduced: `season_one`
    }, {
        id: `dust_cannon`,
        name: `Dust Cannon`,
        type: `Ground`,
        category: `special`,
        power: 110,
        accuracy: 85,
        pp: 5,
        effect: {
            chance: 20,
            target_stat_changes: {
                accuracy: -1
            }
        },
        description: `A blinding blast of dust that may lower the opposing Lumen's Accuracy.`,
        cooldown_ms: 4300,
        introduced: `season_one`
    }, {
        id: `quicksand_turn`,
        name: `Quicksand Turn`,
        type: `Ground`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 10,
        effect: {
            target_stat_changes: {
                speed: -1
            },
            switch_after_attack: !0
        },
        description: `Sinks the opposing Lumen's footing to lower its Speed, then your Lumen switches out.`,
        cooldown_ms: 2900,
        introduced: `season_one`
    }, {
        id: `seismic_relay`,
        name: `Seismic Relay`,
        type: `Ground`,
        category: `physical`,
        power: 35,
        accuracy: 100,
        pp: 15,
        effect: {
            multi_hit: {
                min: 2,
                max: 2
            }
        },
        description: `Two quick tremors in a row. Each hit deals damage separately.`,
        cooldown_ms: 2800,
        introduced: `season_one`
    }, {
        id: `tremor_sense`,
        name: `Tremor Sense`,
        type: `Ground`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            user_stat_changes: {
                accuracy: 1
            },
            clear_target_positive_stages: [`evasion`]
        },
        description: `Your Lumen feels every footstep, raising its Accuracy and removing the opposing Lumen's Evasion boosts.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `subduction`,
        name: `Subduction`,
        type: `Ground`,
        category: `special`,
        power: 100,
        accuracy: 100,
        pp: 10,
        effect: {
            user_stat_changes: {
                speed: -1
            }
        },
        description: `Drags a plate of earth over the opposing Lumen. Lowers your Lumen's Speed afterwards.`,
        cooldown_ms: 4100,
        introduced: `season_one`
    }, {
        id: `rooted_stance`,
        name: `Rooted Stance`,
        type: `Ground`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            rooted: {
                heal_per_turn: .0625
            },
            duration_turns: 5
        },
        description: `Your Lumen digs in for a few turns, healing a little each turn but unable to switch out.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `earthstar_cannon`,
        name: `Earthstar Cannon`,
        type: `Ground`,
        category: `special`,
        power: 140,
        accuracy: 90,
        pp: 5,
        effect: {
            charge_turn: !0
        },
        description: `Charges a core of compressed earth for a turn, then fires it.`,
        cooldown_ms: 4900,
        introduced: `season_one`
    }, {
        id: `resonant_stone`,
        name: `Resonant Stone`,
        type: `Rock`,
        category: `special`,
        power: 80,
        accuracy: 100,
        pp: 15,
        effect: null,
        description: `A humming stone beam with no side effect.`,
        cooldown_ms: 3700,
        introduced: `season_one`
    }, {
        id: `geode_burst`,
        name: `Geode Burst`,
        type: `Rock`,
        category: `special`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            user_stat_changes: {
                special_defense: -1
            }
        },
        description: `Shatters a geode in a burst of crystal. Lowers your Lumen's Sp. Def afterwards.`,
        cooldown_ms: 4300,
        introduced: `season_one`
    }, {
        id: `lithic_recovery`,
        name: `Lithic Recovery`,
        type: `Rock`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            heal: .5
        },
        description: `Your Lumen regrows its stone, restoring half of its max HP.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `prism_alignment`,
        name: `Prism Alignment`,
        type: `Rock`,
        category: `special`,
        power: 120,
        accuracy: 100,
        pp: 5,
        effect: {
            charge_turn: !0,
            screen_pierce: !0
        },
        description: `Aligns a prism for a turn, then fires a beam that passes straight through screens.`,
        cooldown_ms: 4500,
        introduced: `season_one`
    }, {
        id: `fault_chime`,
        name: `Fault Chime`,
        type: `Rock`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            target_stat_changes: {
                speed: -1
            }
        },
        description: `A ringing tremor that lowers the opposing Lumen's Speed.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `flashover`,
        name: `Flashover`,
        type: `Fire`,
        category: `special`,
        power: 120,
        accuracy: 90,
        pp: 5,
        effect: {
            user_stat_changes: {
                special_attack: -2
            }
        },
        description: `Everything ignites at once. Harshly lowers your Lumen's Sp. Atk afterwards.`,
        cooldown_ms: 4500,
        introduced: `season_one`
    }, {
        id: `cinder_reprisal`,
        name: `Cinder Reprisal`,
        type: `Fire`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 10,
        effect: {
            conditional_power: {
                power: 105,
                when: `user_status_in`,
                statuses: [`burn`, `poison`, `bad_poison`, `paralyze`]
            }
        },
        description: `A burning grudge. Power rises to 105 while your Lumen is burned, poisoned or paralyzed.`,
        cooldown_ms: 3500,
        introduced: `season_one`
    }, {
        id: `scorch_audit`,
        name: `Scorch Audit`,
        type: `Fire`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 10,
        effect: {
            conditional_target_status: {
                status: `burn`,
                when: `target_has_positive_stage`
            }
        },
        description: `Scorches any Lumen that has been boosting. Burns the opposing Lumen if it has a raised stat.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `furnace_finale`,
        name: `Furnace Finale`,
        type: `Fire`,
        category: `physical`,
        power: 150,
        accuracy: 90,
        pp: 5,
        effect: {
            recharge: !0
        },
        description: `A furnace-hot slam. Your Lumen must recover next turn.`,
        cooldown_ms: 5100,
        introduced: `season_one`
    }, {
        id: `magma_breach`,
        name: `Magma Breach`,
        type: `Fire`,
        category: `physical`,
        power: 90,
        accuracy: 100,
        pp: 5,
        effect: {
            on_survive: {
                target_stat_changes: {
                    defense: -1
                }
            },
            on_ko: {
                user_stat_changes: {
                    speed: 1
                }
            }
        },
        description: `Vulcavyrm's signature eruption. Lowers the opposing Lumen's Defense, or raises your Lumen's Speed if it knocks the opposing Lumen out.`,
        cooldown_ms: 3900,
        introduced: `season_one`
    }, {
        id: `rampart_break`,
        name: `Rampart Break`,
        type: `Fighting`,
        category: `physical`,
        power: 75,
        accuracy: 100,
        pp: 15,
        effect: {
            removes_opponent_screens: !0
        },
        description: `Removes the opposing team's damage-reducing barriers, such as Bulwark Field, Reflective Mind, and Aurora Screen, before dealing physical Fighting damage. These barriers stay removed after the attack.`,
        cooldown_ms: 3600,
        introduced: `season_one`
    }, {
        id: `crater_palm`,
        name: `Crater Palm`,
        type: `Fighting`,
        category: `physical`,
        power: 80,
        accuracy: 100,
        pp: 10,
        effect: {
            uses_stat: `defense`
        },
        description: `A grounded palm strike that uses your Lumen's Defense instead of Attack.`,
        cooldown_ms: 3700,
        introduced: `season_one`
    }, {
        id: `aura_knuckle`,
        name: `Aura Knuckle`,
        type: `Fighting`,
        category: `special`,
        power: 75,
        accuracy: null,
        pp: 15,
        effect: {
            never_misses: !0
        },
        description: `A fist of focused aura that never misses.`,
        cooldown_ms: 3600,
        introduced: `season_one`
    }, {
        id: `reprisal_stance`,
        name: `Reprisal Stance`,
        type: `Fighting`,
        category: `physical`,
        power: null,
        accuracy: 100,
        pp: 5,
        effect: {
            counter_physical_damage_multiplier: 2,
            priority: -5
        },
        description: `Your Lumen braces, then returns double the physical damage it took this turn.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `pressure_wave`,
        name: `Pressure Wave`,
        type: `Fighting`,
        category: `special`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 20,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A wave of fighting spirit that may lower the opposing Lumen's Sp. Def.`,
        cooldown_ms: 3900,
        introduced: `season_one`
    }, {
        id: `shoulder_check`,
        name: `Shoulder Check`,
        type: `Fighting`,
        category: `physical`,
        power: 60,
        accuracy: 90,
        pp: 10,
        effect: {
            priority: -6,
            forces_switch: !0
        },
        description: `A late, heavy shove that forces the opposing Lumen to switch out.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `shard_sprint`,
        name: `Shard Sprint`,
        type: `Ice`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 20,
        effect: {
            priority: 1
        },
        description: `A quick dash of ice shards that strikes first.`,
        cooldown_ms: 2900,
        introduced: `season_one`
    }, {
        id: `rime_reversal`,
        name: `Rime Reversal`,
        type: `Ice`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 10,
        effect: {
            conditional_power: {
                power: 100,
                when: `user_damaged_this_turn`
            }
        },
        description: `Turns a hit back as frost. Power rises to 100 if your Lumen was damaged earlier this turn.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `frost_hammer`,
        name: `Frost Hammer`,
        type: `Ice`,
        category: `physical`,
        power: 100,
        accuracy: 90,
        pp: 10,
        effect: {
            user_stat_changes: {
                speed: -1
            }
        },
        description: `A crushing hammer of ice. Lowers your Lumen's Speed afterwards.`,
        cooldown_ms: 4100,
        introduced: `season_one`
    }, {
        id: `aurora_screen`,
        name: `Aurora Screen`,
        type: `Ice`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            screen: `all_damage_reduction`,
            duration_turns: 4,
            requires_weather: `snow`
        },
        description: `Only works in snow. Halves damage to your side for a few turns.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `whiteout_exit`,
        name: `Whiteout Exit`,
        type: `Ice`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            weather: `snow`,
            duration_turns: 5,
            switch_after_use: !0
        },
        description: `Whips up a snowstorm, then your Lumen switches out.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `snowplow`,
        name: `Snowplow`,
        type: `Ice`,
        category: `physical`,
        power: 50,
        accuracy: 100,
        pp: 10,
        effect: {
            clear_hazards: `own`,
            on_clear: {
                user_stat_changes: {
                    speed: 1
                }
            }
        },
        description: `Plows away the hazards on your side. Raises your Lumen's Speed if it cleared any.`,
        cooldown_ms: 3100,
        introduced: `season_one`
    }, {
        id: `permafrost`,
        name: `Permafrost`,
        type: `Ice`,
        category: `special`,
        power: 60,
        accuracy: 95,
        pp: 10,
        effect: {
            trap: {
                duration_min: 3,
                duration_max: 3,
                damage_per_turn: .0625
            }
        },
        description: `Locks the opposing Lumen in ice for a few turns, chipping away HP each turn.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `crystal_volley`,
        name: `Crystal Volley`,
        type: `Ice`,
        category: `physical`,
        power: 25,
        accuracy: 90,
        pp: 10,
        effect: {
            multi_hit: {
                min: 2,
                max: 5
            }
        },
        description: `A volley of crystal shards that hits 2 to 5 times.`,
        cooldown_ms: 2600,
        introduced: `season_one`
    }, {
        id: `glacial_echo`,
        name: `Glacial Echo`,
        type: `Ice`,
        category: `special`,
        power: 70,
        accuracy: 100,
        pp: 10,
        effect: {
            conditional_power: {
                power: 105,
                when: `target_repeated_move`
            }
        },
        description: `Freezes a repeated pattern. Power rises to 105 if the opposing Lumen used the same move two turns running.`,
        cooldown_ms: 3500,
        introduced: `season_one`
    }, {
        id: `glacial_terminus`,
        name: `Glacial Terminus`,
        type: `Ice`,
        category: `special`,
        power: 150,
        accuracy: 90,
        pp: 5,
        effect: {
            recharge: !0
        },
        description: `A final glacier that ends the argument. Your Lumen must recover next turn.`,
        cooldown_ms: 5100,
        introduced: `season_one`
    }, {
        id: `final_stone`,
        name: `Final Stone`,
        type: `Ice`,
        category: `physical`,
        power: 80,
        accuracy: 100,
        pp: 5,
        effect: {
            uses_stat: `defense`,
            conditional_power: {
                power: 120,
                when: `user_damaged_this_turn`
            }
        },
        description: `Rinkolos's signature stone. Uses your Lumen's Defense, and power rises to 120 if your Lumen was damaged earlier this turn.`,
        cooldown_ms: 3700,
        introduced: `season_one`
    }, {
        id: `clear_skies`,
        name: `Clear Skies`,
        type: `Flying`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            clear_field: `both`
        },
        description: `A clearing wind that sweeps hazards and screens from both sides.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `dive_feint`,
        name: `Dive Feint`,
        type: `Flying`,
        category: `physical`,
        power: 60,
        accuracy: null,
        pp: 15,
        effect: {
            never_misses: !0,
            hits_semi_invulnerable: `airborne`
        },
        description: `A feinting dive that never misses and reaches airborne Lumens.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `pressure_draft`,
        name: `Pressure Draft`,
        type: `Flying`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            target_stat_changes: {
                attack: -1
            }
        },
        description: `A draft of pressure that lowers the opposing Lumen's Attack.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `gale_lance`,
        name: `Gale Lance`,
        type: `Flying`,
        category: `special`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            high_crit: !0
        },
        description: `A piercing lance of wind with a high critical-hit chance.`,
        cooldown_ms: 3900,
        introduced: `season_one`
    }, {
        id: `cloudbreaker`,
        name: `Cloudbreaker`,
        type: `Flying`,
        category: `physical`,
        power: 120,
        accuracy: 100,
        pp: 5,
        effect: {
            recoil: .3333
        },
        description: `Breaks the sky with a full-speed dive. Your Lumen takes a third of the damage as recoil.`,
        cooldown_ms: 4500,
        introduced: `season_one`
    }, {
        id: `stat_exchange`,
        name: `Stat Exchange`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 10,
        effect: {
            stat_swap: `speed`
        },
        description: `Swaps Speed changes between your Lumen and the opposing Lumen.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `prediction_tax`,
        name: `Prediction Tax`,
        type: `Psychic`,
        category: `special`,
        power: 70,
        accuracy: 100,
        pp: 10,
        effect: {
            conditional_power: {
                power: 105,
                when: `target_chose_status_move`
            }
        },
        description: `Punishes hesitation. Power rises to 105 if the opposing Lumen chose a status move this turn.`,
        cooldown_ms: 3500,
        introduced: `season_one`
    }, {
        id: `vector_crush`,
        name: `Vector Crush`,
        type: `Psychic`,
        category: `physical`,
        power: 80,
        accuracy: 100,
        pp: 15,
        effect: null,
        description: `A crushing psychic force with no side effect.`,
        cooldown_ms: 3700,
        introduced: `season_one`
    }, {
        id: `quiet_interval`,
        name: `Quiet Interval`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            no_positive_stages_turns: 2
        },
        description: `For a short while, no Lumen on either side can raise its stats.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `fable_crash`,
        name: `Fable Crash`,
        type: `Fairy`,
        category: `physical`,
        power: 90,
        accuracy: 90,
        pp: 10,
        effect: {
            chance: 10,
            target_stat_changes: {
                attack: -1
            }
        },
        description: `A storybook charge that may lower the opposing Lumen's Attack.`,
        cooldown_ms: 3900,
        introduced: `season_one`
    }, {
        id: `heartbreak_rush`,
        name: `Heartbreak Rush`,
        type: `Fairy`,
        category: `physical`,
        power: 65,
        accuracy: 100,
        pp: 15,
        effect: {
            target_stat_changes: {
                special_attack: -1
            }
        },
        description: `A rush that lowers the opposing Lumen's Sp. Atk.`,
        cooldown_ms: 3400,
        introduced: `season_one`
    }, {
        id: `ribbon_ward`,
        name: `Ribbon Ward`,
        type: `Fairy`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            super_effective_ward: !0,
            duration_turns: 3
        },
        description: `Ties a ribbon ward around your side that halves the next super-effective hit.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `little_mercy`,
        name: `Little Mercy`,
        type: `Fairy`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            heal_reserve: .25
        },
        description: `Heals a resting party member by a quarter of its max HP.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `fable_finale`,
        name: `Fable Finale`,
        type: `Fairy`,
        category: `physical`,
        power: 140,
        accuracy: 90,
        pp: 5,
        effect: {
            charge_turn: !0
        },
        description: `Gathers a tale's ending for a turn, then unleashes it.`,
        cooldown_ms: 4900,
        introduced: `season_one`
    }, {
        id: `relay_spark`,
        name: `Relay Spark`,
        type: `Electric`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            switch_after_attack: !0
        },
        description: `A spark that lets your Lumen switch out after it lands.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `static_net`,
        name: `Static Net`,
        type: `Electric`,
        category: `status`,
        power: null,
        accuracy: 90,
        pp: 10,
        effect: {
            target_stat_changes: {
                speed: -1
            },
            prevents_switching: !0,
            duration_turns: 2,
            respects_type_immunity: !0
        },
        description: `A crackling net that lowers the opposing Lumen's Speed and stops it from switching for a while.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `capacitor_drain`,
        name: `Capacitor Drain`,
        type: `Electric`,
        category: `special`,
        power: 65,
        accuracy: 100,
        pp: 10,
        effect: {
            drain: .5
        },
        description: `Drains charge from the opposing Lumen, restoring half of the damage dealt.`,
        cooldown_ms: 3400,
        introduced: `season_one`
    }, {
        id: `arc_step`,
        name: `Arc Step`,
        type: `Electric`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            user_stat_changes: {
                speed: 1
            }
        },
        description: `A quick electric step that raises your Lumen's Speed.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `circuit_snip`,
        name: `Circuit Snip`,
        type: `Electric`,
        category: `special`,
        power: 55,
        accuracy: 100,
        pp: 15,
        effect: {
            ends_opponent_speed_buff: !0
        },
        description: `Snips the opposing side's Tailwind Path.`,
        cooldown_ms: 3200,
        introduced: `season_one`
    }, {
        id: `alloy_ray`,
        name: `Alloy Ray`,
        type: `Steel`,
        category: `special`,
        power: 85,
        accuracy: 100,
        pp: 15,
        effect: null,
        description: `A steady ray of molten alloy with no side effect.`,
        cooldown_ms: 3800,
        introduced: `season_one`
    }, {
        id: `rivet_rush`,
        name: `Rivet Rush`,
        type: `Steel`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 20,
        effect: {
            priority: 1
        },
        description: `A rapid rivet strike that goes first.`,
        cooldown_ms: 2900,
        introduced: `season_one`
    }, {
        id: `alloy_cataclysm`,
        name: `Alloy Cataclysm`,
        type: `Steel`,
        category: `special`,
        power: 150,
        accuracy: 90,
        pp: 5,
        effect: {
            recharge: !0
        },
        description: `Floods the field with molten alloy. Your Lumen must recover next turn.`,
        cooldown_ms: 5100,
        introduced: `season_one`
    }, {
        id: `resonance_cannon`,
        name: `Resonance Cannon`,
        type: `Steel`,
        category: `special`,
        power: 80,
        accuracy: 100,
        pp: 10,
        effect: {
            uses_stat: `defense`
        },
        description: `Fires resonance from your Lumen's armor, using its Defense instead of Sp. Atk.`,
        cooldown_ms: 3700,
        introduced: `season_one`
    }, {
        id: `clockwork_guard`,
        name: `Clockwork Guard`,
        type: `Steel`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            priority: 3,
            protect: !0,
            priority_guard: !0,
            on_block: {
                user_stat_changes: {
                    speed: 1
                }
            }
        },
        description: `Guards your Lumen for the turn. If the attack it blocks was a priority move, your Lumen's Speed rises.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `grave_mend`,
        name: `Grave Mend`,
        type: `Ghost`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            heal_if_target_has_status: {
                yes: .5,
                no: .25
            }
        },
        description: `Mends from beyond. Restores a quarter of your Lumen's max HP, or half if the opposing Lumen has a status condition.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `grave_lunge`,
        name: `Grave Lunge`,
        type: `Ghost`,
        category: `physical`,
        power: 85,
        accuracy: 100,
        pp: 15,
        effect: null,
        description: `A cold lunge from the grave with no side effect.`,
        cooldown_ms: 3800,
        introduced: `season_one`
    }, {
        id: `phantom_feint`,
        name: `Phantom Feint`,
        type: `Ghost`,
        category: `physical`,
        power: 45,
        accuracy: 100,
        pp: 10,
        effect: {
            ignore_protection: !0
        },
        description: `A phantom strike that slips past protection.`,
        cooldown_ms: 3e3,
        introduced: `season_one`
    }, {
        id: `borrowed_glory`,
        name: `Borrowed Glory`,
        type: `Ghost`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 5,
        effect: {
            steal_one_stage: !0
        },
        description: `Steals one stat boost from the opposing Lumen after hitting.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `possession_exit`,
        name: `Possession Exit`,
        type: `Ghost`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            switch_after_attack: !0
        },
        description: `A parting possession that lets your Lumen switch out after it lands.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `funeral_bell`,
        name: `Funeral Bell`,
        type: `Ghost`,
        category: `special`,
        power: 70,
        accuracy: 100,
        pp: 10,
        effect: {
            heal_block_turns: 2
        },
        description: `A mournful bell that stops the opposing Lumen from healing until the end of next turn.`,
        cooldown_ms: 3500,
        introduced: `season_one`
    }, {
        id: `sabotage`,
        name: `Sabotage`,
        type: `Dark`,
        category: `physical`,
        power: 55,
        accuracy: 100,
        pp: 10,
        effect: {
            item_suppress: !0
        },
        description: `Sabotages the opposing Lumen's held item until it switches out.`,
        cooldown_ms: 3200,
        introduced: `season_one`
    }, {
        id: `envy_pulse`,
        name: `Envy Pulse`,
        type: `Dark`,
        category: `special`,
        power: 70,
        accuracy: 100,
        pp: 10,
        effect: {
            conditional_power: {
                power: 105,
                when: `target_has_positive_stage`
            }
        },
        description: `Envy that feeds on boosts. Power rises to 105 against a Lumen with a raised stat.`,
        cooldown_ms: 3500,
        introduced: `season_one`
    }, {
        id: `trapdoor`,
        name: `Trapdoor`,
        type: `Dark`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            priority: 4,
            reflect_trap_or_phaze: !0
        },
        description: `Springs a trapdoor that bounces back the next trapping or forced-switch effect this turn.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `parting_jeer`,
        name: `Parting Jeer`,
        type: `Dark`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 10,
        effect: {
            target_stat_changes: {
                attack: -1,
                special_attack: -1
            },
            switch_after_use: !0
        },
        description: `A jeer that lowers the opposing Lumen's Attack and Sp. Atk, then your Lumen switches out.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `ambush_tax`,
        name: `Ambush Tax`,
        type: `Dark`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 10,
        effect: {
            intercept_switch_power: 90
        },
        description: `Ambushes a Lumen on its way out. Hits harder if the opposing Lumen switches out manually.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `cocoon_pulse`,
        name: `Cocoon Pulse`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            user_stat_changes: {
                defense: 2,
                special_defense: 1,
                speed: -1
            }
        },
        description: `Hardens a cocoon. Sharply raises your Lumen's Defense and raises its Sp. Def, but lowers its Speed.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `web_reversal`,
        name: `Web Reversal`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            swap_field: !0
        },
        description: `Reverses the field, swapping hazards and screens between the two sides.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `silk_salvage`,
        name: `Silk Salvage`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            clear_hazards: `own`,
            on_clear: {
                heal: .2
            },
            fails_without_clear: !0
        },
        description: `Salvages the hazards on your side into silk. Heals your Lumen if it cleared any.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `brood_parcel`,
        name: `Brood Parcel`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            side_entry_effect: {
                stat_changes: {
                    special_defense: 1
                }
            },
            duration_turns: 3
        },
        description: `Leaves a parcel for the next Lumen you send in, raising its Sp. Def.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `signal_buzz`,
        name: `Signal Buzz`,
        type: `Bug`,
        category: `special`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 10,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A piercing buzz that may lower the opposing Lumen's Sp. Def.`,
        cooldown_ms: 3900,
        introduced: `season_one`
    }, {
        id: `final_sting`,
        name: `Final Sting`,
        type: `Bug`,
        category: `physical`,
        power: 50,
        accuracy: 100,
        pp: 10,
        effect: {
            on_ko: {
                user_stat_changes: {
                    attack: 2
                }
            }
        },
        description: `A last sting. Sharply raises your Lumen's Attack if it knocks the opposing Lumen out.`,
        cooldown_ms: 3100,
        introduced: `season_one`
    }, {
        id: `pattern_break`,
        name: `Pattern Break`,
        type: `Bug`,
        category: `special`,
        power: 75,
        accuracy: 100,
        pp: 15,
        effect: {
            screen_pierce: !0
        },
        description: `A pattern that slips through screens without removing them.`,
        cooldown_ms: 3600,
        introduced: `season_one`
    }, {
        id: `scale_tribute`,
        name: `Scale Tribute`,
        type: `Dragon`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            consume_stage_heal: {
                stat: `defense`,
                heal: .3
            }
        },
        description: `Sheds one Defense boost to restore a good chunk of your Lumen's max HP.`,
        cooldown_ms: 5e3,
        introduced: `season_one`
    }, {
        id: `scale_resonance`,
        name: `Scale Resonance`,
        type: `Dragon`,
        category: `special`,
        power: 110,
        accuracy: 100,
        pp: 5,
        effect: {
            user_stat_changes: {
                defense: -1
            }
        },
        description: `A resonant dragon pulse. Lowers your Lumen's Defense afterwards.`,
        cooldown_ms: 4300,
        introduced: `season_one`
    }, {
        id: `wyrm_break`,
        name: `Wyrm Break`,
        type: `Dragon`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            target_stat_changes: {
                attack: -1
            }
        },
        description: `A wyrm's strike that lowers the opposing Lumen's Attack.`,
        cooldown_ms: 3300,
        introduced: `season_one`
    }, {
        id: `elder_spiral`,
        name: `Elder Spiral`,
        type: `Dragon`,
        category: `special`,
        power: 100,
        accuracy: 100,
        pp: 10,
        effect: {
            user_stat_changes: {
                speed: -1
            }
        },
        description: `An ancient spiral of dragon force. Lowers your Lumen's Speed afterwards.`,
        cooldown_ms: 4100,
        introduced: `season_one`
    }]
};
export const moves = moveDatabase.moves;
export const moveById = new Map(moves.map(move => [move.id, move]));
