//modifiers order:  0: 

data = {
    "rooms":[
        {
            "name": "entree",
            "parts": [
                {
                    "name": "entree",
                    "story":[
                        {
                            "text": "Tu fais parti d'un groupe de virus colons qui a réussi à infiltrer un organisme.\n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "Tu te sens encore un peu faible, et alors que les autres partent à leur aventure, tu choisis de te reposer un petit moment et planifier ton approche.\n",
                            "requirements": function(virus){return true}
                        }
                    ],
                    "choices":[
                        {
                            "text": "A l'aventure!",
                            "path": {
                                "room": 0,
                                "part": 1,
                                "modifiers": {},
                                "requirements": function(virus){return true}
                            }
                        }
                    ]
                },
                {
                    "name": "stats0",
                    "story":[
                        {
                            "text": "Le but de la colonie est simple: Se multiplier. Pour le faire tu as un avantage indéniable: \n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "\tLa Mitose\n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "Ce phénomène te permet de te transformer en deux versions de toi-même! Ton essence est ainsi partagée par ces nouvelles entités et tu en possédes le contrôle!\n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "Parfois, lors d'une mitose, quelque chose d'étrange peut se passer: \n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "\tLa Mutation\n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "Lors de ce phénomène, tes statistiques peuvent changer (dans le bon ou mauvais sens). Ceci peut être un avantage, tout comme un incovéniant.\n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "Mais il faudra faire attention! Le corps étranger fera tout pour vous en empêcher de multiplier.\n",
                            "requirements": function(virus){return true}
                        }
                    ],
                    "choices":[
                        {
                            "text": "Mes forces reviennent",
                            "path": {
                                "room": 0,
                                "part": 2,
                                "modifiers": {},
                                "requirements": function(virus){return true}
                            }
                        }
                    ]
                },
                {
                    "name": "stats1",
                    "story":[
                        {
                            "text": "Tu as 12 points à distribuer sur 3 stats: attaque, résistance et mutation.\n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "L'attaque représente à quel point le virus est aggressif.\n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "La résistance représente à quel point le virus est résistant aux attaques de l'organisme.\n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "La mutation représente le nombre de tours qu'il faut attendre avant de procéder à une mutation.\n",
                            "requirements": function(virus){return true}
                        }
                    ],
                    "choices":[
                        {
                            "text": "stats_choice",
                            "path": {
                                "room": 1,
                                "part": 0,
                                "modifiers": {},
                                "requirements": function(virus){return true}
                            }
                        }
                    ]
                }
            ]
        },
        {
            "name": "bouche",
            "parts": [
                {
                    "name": "bouche_entree",
                    "story":[
                        {
                            "text": "Tu t'es donc retrouvé dans la bouche de l'organisme. C'est un espace très humide, mais une entrée parfaite pour ton attaque.\nTu sens la cavité trembler. La masse liquide bouge et tu est entraîné avec elle vers l'oesophage.",
                            "requirements": function(virus){return true}
                        }
                    ],
                    "choices":[
                        {
                            "text": "Je m'accroche à ce que je peux pour rester où je suis.",
                            "path": {
                                "room": 1,  //!!pas fait!!
                                "part": 1,
                                "modifiers": {resistance: -1},
                                "requirements": (virus) => {if(virus.resistance >= 4){return true}else{return false}}
                            }
                        },
                        {
                            "text": "Je m'accroche à ce que je peux pour rester où je suis.",
                            "path": {
                                "room": 4,  //!!death!!
                                "part": 0,
                                "modifiers": {resistance: -1},
                                "requirements": (virus) => {if(virus.resistance < 4){return true}else{return false}}
                            }
                        },
                        {
                            "text": "Je me laisse entrâiner.",
                            "path": {
                                "room": 2,
                                "part": 0,
                                "modifiers": {},
                                "requirements": function(virus){return true}
                            }
                        }
                    ]
                }
            ]
        },
        {
            "name": "oesophage",
            "parts": [
                {
                    "name": "oesophage0",
                    "story":[
                        {
                            "text": "Tu sais qu'il ne sert à rien de lutter contre une telle force. Tu te résignes donc à aller avec le courant.\nAprès quelques secondes de frayeur, tu arrives dans un long couloir descendant. Alors que le liquide poursuit sa route, tu es projeté vers la paroi et arrives à te placer sur son relief. Tu es désormais dans l'oesophage.\n",
                            "requirements": function(virus){if(virus.previous_room == "bouche"){return true}else{return false}}
                        },
                        {
                            "text": "Un long corridor vertical se trouve devant toi. Il est si long que tu ne peux distinguer le fond. Tu es au-dessus d'une des nombreuses falaises qui donnent vers le vide. Chaque 5 à 10 secondes, un liquide",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": ", tel celui qui t'a amené jusqu'ici",
                            "requirements": function(virus){if(virus.previous_room == "bouche"){return true}else{return false}}
                        },
                        {
                            "text": " tombe à travers le corridor prennant tout ce qui se trouve devant lui. Tu as de la chance, car la plateforme au-dessus de toi t'en protége et tu n'es pas ",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "re",
                            "requirements": function(virus){if(virus.previous_room == "bouche"){return true}else{return false}}
                        },
                        {
                            "text": "pris dans le courant.\n",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "Tu regardes désormais la plateforme de plus près. Celle-ci est paticulièrement vide de vie. Quelques vaisseaux sanguins se dessinent. Des cellules se trouvent partout aux alentours.",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": " Rentrer dans l'une d'entre-elles pourrait-être utile pour se protéger lors d'une mitose.",
                            "requirements": function(virus){if(virus.previous_room == "bouche"){return true}else{return false}}
                        }
                    ],
                    "choices":[
                        {
                            "text": "Rentrer dans les vaisseaux",
                            "path": {
                                "room": 0,      //!!pas fait!!
                                "part": 0,
                                "modifiers": {},
                                "requirements": function(virus){return true}
                            },
                        },
                        {
                            "text": "Rentrer dans une cellule",
                            "path": {
                                "room": 0,      //!!pas fait!!
                                "part": 0,
                                "modifiers": {},
                                "requirements": function(virus){return true}
                            },
                        },
                        {
                            "text": "Sauter dans le trou",
                            "path": {
                                "room": 4,      //!!death!!
                                "part": 1,
                                "modifiers": {},
                                "requirements": function(virus){if(virus.resistance <= 1){return true}else{return false}}
                            },
                        },
                        {
                            "text": "Sauter dans le trou",
                            "path": {
                                "room": 4,      //!!death!!
                                "part": 2,
                                "modifiers": {},
                                "requirements": function(virus){if(virus.resistance <= 3 && virus.resistance > 1){return true}else{return false}}
                            }, 
                        },
                        { 
                            "text": "Sauter dans le trou",
                            "path": {
                                "room": 3,
                                "part": 0,
                                "requirements": function(virus){if(virus.resistance >= 4){return true}else{return false}},
                                "modifiers": {resistance: -10, attaque: -3}
                            }
                        }
                    ]
                }
            ]
        },
        {
            "name": "estomac",
            "parts": [
                {
                    "name": "estomac0",
                    "story":[
                        {
                            "text": "Tu sautes sans peur dans le trou. Après quelques secondes de chute libre, tu tombes sur un liquide acide. Heureusement, ta membrane est assez solide pour résister à l'acidité, et tu arrives à remonter à la surface. Toutefois tu es très mal en point.",
                            "requirements": function(virus){return true}
                        }
                    ],
                    "choices":[
                        {
                            "text": "Ca pourraît être pire ...",
                            "path": {
                                "room": 3,
                                "part": 1,
                                "requirements": function(virus){return true},
                                "modifiers": {}
                            }
                        }
                    ]
                },
                {
                    "name": "estomac1",
                    "story":[
                        {
                            "text": "Un grand lac rempli d'acide. Tel est la vue qui se dresse devant toi. Ce n'est pas plaisant à voir. Quelques petites îles se trouvent dans cette immensité, qui sont petit à petit rongées par le liquide. Chaque certain temps, des éléments tombent ",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "par le même trou que toi ",
                            "requirements": function(virus){if(virus.previous_room == "oesophage"){return true}else{return false}}
                        },
                        {
                            "text": " par le trou se trouvant au plafond ",
                            "requirements": function(virus){if(virus.previous_room != "oesophage"){return true}else{return false}}
                        },
                        {
                            "text": " et provoquent une vague acidulée.",
                            "requirements": function(virus){return true}
                        },
                        {
                            "text": "\n",
                            "requirements": function(virus){return true}
                        }
                    ],
                    "choices":[
                        {
                            "text": "Rentrer dans les vaisseaux",
                            "path": {
                                "room": 0,      //!!pas fait!!
                                "part": 0,
                                "modifiers": {},
                                "requirements": function(virus){return true}
                            },
                        },
                        {
                            "text": "Rentrer dans une cellule",
                            "path": {
                                "room": 0,      //!!pas fait!!
                                "part": 0,
                                "modifiers": {},
                                "requirements": function(virus){return true}
                            },
                        },
                        {
                            "text": "Trouver un chemin jusqu'au trou du plafond",
                            "path": {
                                "room": 3,      //!!pas fait!!
                                "part": 2,
                                "modifiers": {},
                                "requirements": function(virus){return true}
                            },
                        },
                        {
                            "text": "Aller vers le siphon",
                            "path": {
                                "room": 4,      //!!pas fait!!  !!death!!
                                "part": 2,
                                "modifiers": {},
                                "requirements": function(virus){if(virus.resistance < 5){return true}else{return false}}
                            }, 
                        },
                        {
                            "text": "Aller vers le siphon",
                            "path": {
                                "room": 4,      //!!pas fait!!
                                "part": 2,
                                "modifiers": {},
                                "requirements": function(virus){if(virus.resistance >= 5){return true}else{return false}}
                            }, 
                        },
                        { 
                            "text": "Explorer l'estomac",
                            "path": {
                                "room": 3,  //!!pas fait!!
                                "part": 0,
                                "requirements": function(virus){return true},
                                "modifiers": {}
                            }
                        }
                    ]
                }
            ]
        },
        {
            "name": "death",
            "parts": [
                {
                    "name": "death_bouche_entree",
                    "story":[
                        {
                            "text": "Tu essaies de résister à la force, mais celle-ci est bien trop forte. Elle bat contre ta protection et fini par la détruire.\nLa vie de ce virus s'arrête ici.",
                            "requirements": function(virus){return true}
                        }
                    ],
                    "choices":[
                        {
                            "text": "death"
                        }
                    ]
                },
                {
                    "name": "death_oesophage0",
                    "story":[
                        {
                            "text": "Tu essaies de résister à la force, mais celle-ci est bien trop forte. Elle bat contre ta protection et fini par la détruire.\nLa vie de ce virus s'arrête ici.",
                            "requirements": function(virus){return true}
                        }
                    ],
                    "choices":[
                        {
                            "text": "death"
                        }
                    ]
                },
                {
                    "name": "death_oesophage0",
                    "story":[
                        {
                            "text": "Tu sautes sans peur dans le trou. Après quelques secondes de chute libre, tu tombes sur un liquide acide. Malheureusement, ta membrane n'est pas assez solide pour résister à l'acidité.\nTu finis désintégré.",
                            "requirements": function(virus){return true}
                        }
                    ],
                    "choices":[
                        {
                            "text": "death"
                        }
                    ]
                }
            ]
        }
    ]
}

function game_data_export(){
    return data
}

