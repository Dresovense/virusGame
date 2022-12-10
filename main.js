/* import game_data_export from "data/game_data.js" */
let game_data = game_data_export();
let active_virus = []

let game_container = document.createElement("div");
game_container.className = "game_container";
document.body.appendChild(game_container);

//!!!!randomize part!!!!
create_screen(game_container, {room: 0, part: 0})




function split_virus_screen(game_screen){
    //remove everything inside the div
    game_screen.innerHTML = "";
    
    //create two new viruses
    let game_screen_id = game_screen.id;
    create_screen(game_screen, {room: active_virus[game_screen_id].room, part: active_virus[game_screen_id].part})
    create_screen(game_screen, {room: active_virus[game_screen_id].room, part: active_virus[game_screen_id].part})

    //remove parent div from active_virus
    active_virus[game_screen_id] = undefined
    
    //split in the largest measure
    if(game_screen.offsetWidth < game_screen.offsetHeight){
        game_screen.style.flexDirection = "column";
    }
    
}

function create_screen(parent_div, choice){
    //div for the screen
    let game_screen = document.createElement("div");
    game_screen.className = "game_screen";
    game_screen.id = `${active_virus.length}`
    parent_div.appendChild(game_screen);

    //change stats if they exist
    active_virus.push({screen: game_screen, room: choice.room, part: choice.part, attaque: undefined, resistance: undefined, mutation: undefined});

    //screen contents div
    let game_screen_contents = document.createElement("div");
    game_screen_contents.className = "game_screen_contents";
    game_screen_contents.id = game_screen.id;
    game_screen.appendChild(game_screen_contents)

    
    //create elements in the screen
    create_mitosis_button(game_screen)
    virus_text(game_screen_contents, active_virus.length - 1)
}

function create_mitosis_button(game_screen){
    //make div for the button
    let mitosis_button = document.createElement("button");
    mitosis_button.innerText = "Mitose";
    mitosis_button.addEventListener("click", () => {
        split_virus_screen(game_screen);
    })
    game_screen.firstChild.appendChild(mitosis_button);
}

function virus_text(game_screen, screen_id){
    //create div for the text
    let text_div = document.createElement("div");
    text_div.className = "text_div";
    game_screen.appendChild(text_div);

    //insert text in div
    room = active_virus[screen_id].room
    part = active_virus[screen_id].part
    for(let i = 0; i < game_data.rooms[room].parts[part].story.length; i++){
        //check requirements
        if(game_data.rooms[room].parts[part].story[i].requirements(active_virus[screen_id])){
            text_div.innerText += game_data.rooms[room].parts[part].story[i].text;
        }

    }

    //create div for choices
    let choices_div = document.createElement("div");
    choices_div.className = "choices_div";
    game_screen.appendChild(choices_div);

    //choose stats
    if(game_data.rooms[room].parts[part].choices[0].text == "stats_choice"){
        choose_stats(choices_div, text_div, screen_id, game_screen);
        //randomizer ce choix
    }
    else{   
        //insert choices
        for(let i = 0; i < game_data.rooms[room].parts[part].choices.length; i++){
            //check requirements
            console.log(game_data.rooms[room].parts[part].choices[i].path.requirements(active_virus[screen_id]))
            console.log(active_virus[screen_id].resistance)
            if(game_data.rooms[room].parts[part].choices[i].path.requirements(active_virus[screen_id])){
                let choice_div = document.createElement("div");
                choice_div.className = "choice_div";
                choices_div.appendChild(choice_div);
                choice_div.innerText = game_data.rooms[room].parts[part].choices[i].text
                choice_div.addEventListener("click", () => {
                    //apply modifiers
                    for(let j = 0; j < Object.keys(game_data.rooms[room].parts[part].choices[i].path.modifiers).length; j++){
                        console.log(Object.keys(game_data.rooms[room].parts[part].choices[i].path.modifiers)[j])
                        if(Object.keys(game_data.rooms[room].parts[part].choices[i].path.modifiers)[j] == "resistance"){
                            console.log("here")
                            active_virus[screen_id].resistance += game_data.rooms[room].parts[part].choices[i].path.modifiers.resistance
                            if(active_virus[screen_id].resistance < 1){
                                active_virus[screen_id].resistance = 1;
                            }
                        }
                        if(Object.keys(game_data.rooms[room].parts[part].choices[i].path.modifiers)[j] == "attaque"){
                            active_virus[screen_id].attaque += game_data.rooms[room].parts[part].choices[i].path.modifiers.attaque
                            if(active_virus[screen_id].attaque < 1){
                                active_virus[screen_id].attaque = 1;
                            }
                        }
                        if(Object.keys(game_data.rooms[room].parts[part].choices[i].path.modifiers)[j] == "mutation"){
                            active_virus[screen_id].mutation += game_data.rooms[room].parts[part].choices[i].path.modifiers.mutation
                        }
                    }


                    //send to next choice
                    text_div.innerHTML = "";
                    choices_div.innerHTML = "";
                    active_virus[screen_id].previous_room = game_data.rooms[room].name
                    active_virus[screen_id].room = game_data.rooms[room].parts[part].choices[i].path.room;  
                    active_virus[screen_id].part = game_data.rooms[room].parts[part].choices[i].path.part;
                    virus_text(game_screen, screen_id)
                })
            }
        }
    }
}

function choose_stats(choices_div, text_div, screen_id, game_screen){
    let number_of_points = 12;
    let attaque = 1;
    let resistance = 1;
    let mutation = 9;

    //attaque
    let input_attaque_div = document.createElement("div");
    choices_div.appendChild(input_attaque_div);

    let attaque_name = document.createElement("div");
    attaque_name.innerText = "Attaque:";
    input_attaque_div.appendChild(attaque_name);

    let add_attaque = document.createElement("button");
    add_attaque.innerText = "+1";
    add_attaque.addEventListener("click", () => {
        if(attaque < 8 && number_of_points > 0){
            attaque++;
            number_of_points--;
            attaque_stat.innerText = attaque;
            number_of_points_div.innerText = number_of_points;
        }
    })
    input_attaque_div.appendChild(add_attaque);

    let attaque_stat = document.createElement("div");
    attaque_stat.innerText = "1";
    input_attaque_div.appendChild(attaque_stat);

    let remove_attaque = document.createElement("button");
    remove_attaque.innerText = "-1";
    remove_attaque.addEventListener("click", () => {
        if(attaque > 1){
            attaque--;
            number_of_points++;
            attaque_stat.innerText = attaque;
            number_of_points_div.innerText = number_of_points;
        }
    })
    input_attaque_div.appendChild(remove_attaque);


    //resistance
    let input_resistance_div = document.createElement("div");
    choices_div.appendChild(input_resistance_div);

    let resistance_name = document.createElement("div");
    resistance_name.innerText = "Resistance:";
    input_resistance_div.appendChild(resistance_name);

    let add_resistance = document.createElement("button");
    add_resistance.innerText = "+1";
    add_resistance.addEventListener("click", () => {
        if(resistance < 8 && number_of_points > 0){
            resistance++;
            number_of_points--;
            resistance_stat.innerText = resistance;
            number_of_points_div.innerText = number_of_points;
        }
    })
    input_resistance_div.appendChild(add_resistance);

    let resistance_stat = document.createElement("div");
    resistance_stat.innerText = "1";
    input_resistance_div.appendChild(resistance_stat);

    let remove_resistance = document.createElement("button");
    remove_resistance.innerText = "-1";
    remove_resistance.addEventListener("click", () => {
        if(resistance > 1){
            resistance--;
            number_of_points++;
            resistance_stat.innerText = resistance;
            number_of_points_div.innerText = number_of_points;
        }
    })
    input_resistance_div.appendChild(remove_resistance);

    
    //mutation
    let input_mutation_div = document.createElement("div");
    choices_div.appendChild(input_mutation_div);

    let mutation_name = document.createElement("div");
    mutation_name.innerText = "Mutation:";
    input_mutation_div.appendChild(mutation_name);

    let add_mutation = document.createElement("button");
    add_mutation.innerText = "+1";
    add_mutation.addEventListener("click", () => {
        if(mutation < 9){
            mutation++;
            number_of_points++;
            mutation_stat.innerText = mutation;
            number_of_points_div.innerText = number_of_points;
        }
    })
    input_mutation_div.appendChild(add_mutation);

    let mutation_stat = document.createElement("div");
    mutation_stat.innerText = "9";
    input_mutation_div.appendChild(mutation_stat);

    let remove_mutation = document.createElement("button");
    remove_mutation.innerText = "-1";
    remove_mutation.addEventListener("click", () => {
        if(mutation > 1 && number_of_points > 0){
            mutation--;
            number_of_points--;
            mutation_stat.innerText = mutation;
            number_of_points_div.innerText = number_of_points;
        }
    })
    input_mutation_div.appendChild(remove_mutation);

    let number_of_points_div = document.createElement("div");
    number_of_points_div.innerText = number_of_points;
    choices_div.appendChild(number_of_points_div);


    let confirm_button = document.createElement("button");
    confirm_button.innerText = "Confirmer choix";
    confirm_button.addEventListener("click", () => {
        active_virus[0].attaque = attaque;
        active_virus[0].resistance = resistance;
        active_virus[0].mutation = mutation;

        
        text_div.innerHTML = "";
        choices_div.innerHTML = "";
        active_virus[screen_id].room = game_data.rooms[room].parts[part].choices[0].path.room;  
        active_virus[screen_id].part = game_data.rooms[room].parts[part].choices[0].path.part;
        virus_text(game_screen, screen_id)
    });
    choices_div.appendChild(confirm_button);
}