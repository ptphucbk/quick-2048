
var tileNumer = 16;                 // Number of tiles on board in total
var board = new Array(tileNumer);   // The array represents board
var pos = 0;                        // Create the first tile on board when start game
var newPos = 0;                     // Creat the second tile on board when start game
var value = 2;                      // Value of the tile created
var full = 0;                       // Keep the number of tiles on board
var movable = false;                // Check if the board is movabable to create a new tile
var component;

function startGame() {
    //Initialize Board
    full = 0; // When start there is no tile on board
    board = new Array(tileNumer);
    // Todo with score
    play.score = 0;
    // Create all tiles with value of zero
    for (var iterator = 0; iterator < tileNumer; iterator++) {
        board[iterator] = null;
        createBlock(iterator, 0);
    }
    pos = Math.floor(Math.random() * 16);
    createBlock(pos, 2);
    full += 1;
    newPos = pos;
    while (newPos == pos ){
        newPos = Math.floor(Math.random() * 16);
    }
    value = (Math.floor(Math.random() * 2) + 1)*2;
    createBlock(newPos, value);
    full += 1;
}

function createBlock(iterator, value) {
    if (component == null)
        component = Qt.createComponent("tile.qml");
    if (component.status == Component.Ready) {
        var dynamicObject = component.createObject(play);
        if (dynamicObject == null) {
            console.log("error creating block");
            console.log(component.errorString());
            return false;
        }
        dynamicObject.value = value;
        dynamicObject.x = 8 + Math.floor(iterator/4)*56
        dynamicObject.y = 8 + (iterator%4)*56
        board[iterator] = dynamicObject;
    } else {
        console.log("error loading block component");
        console.log(component.errorString());
        return false;
    }
    return true;
}

function handlePress(dir){
    // direction
    var upDown = 0;
    var rightLeft = 0;
    var newTile = 0;
    var notNull = 0;
    var notNullArray = new Array(4);
    var i = 0, j = 0, k = 0;
    // Up
    if (dir === 1){
        console.log('Key Up was pressed');
        upDown = 1;

        for (i = 0; i < 4; i++){
            notNull = 0;
            for (j = 0; j < 4; j++){
                if (board[j+4*i].value !== 0){
                    notNullArray[notNull] = j+4*i;
                    notNull += 1;
                }
            }
            console.log(notNull);
            // Move tiles in the right directions
            for (k = 0; k < 4; k++){
                if (k < notNull){
                    if ((k + 4*i) !== notNullArray[k]){
                        board[k+4*i].value = board[notNullArray[k]].value;
                        movable = true;
                    }
                } else {
                    board[k+4*i].value = 0;
                }
            }
            // Deal with collision
            if (notNull === 2){
                if (board[4*i].value === board[1 + 4*i].value){
                    board[4*i].value = 2*board[1 + 4*i].value;
                    board[1 + 4*i].value = 0;
                    movable = true;
                    full -= 1;
                }
            }
            if (notNull === 3){
                if (board[4*i].value === board[1 + 4*i].value){
                    board[4*i].value = 2*board[1 + 4*i].value;
                    board[1 + 4*i].value = board[2 + 4*i].value;
                    board[2 + 4*i].value = 0;
                    movable = true;
                    full -= 1;
                }
                if (board[1 + 4*i].value === board[2 + 4*i].value){
                    board[1 + 4*i].value = 2*board[2 + 4*i].value;
                    board[2 + 4*i].value = 0;
                    movable = true;
                    full -= 1;
                }
            }
            if (notNull === 4){
                if (board[4*i].value === board[1 + 4*i].value){
                    board[4*i].value = 2*board[1 + 4*i].value;
                    if (board[2 + 4*i].value === board[3 + 4*i].value){
                        board[1 + 4*i].value = 2*board[2 + 4*i].value;
                        board[2 + 4*i].value = 0;
                        board[3 + 4*i].value = 0;
                        full -= 2
                    } else {
                        board[1 + 4*i].value = board[2 + 4*i].value;
                        board[2 + 4*i].value = board[3 + 4*i].value;
                        board[3 + 4*i].value = 0;
                        full -= 1;
                    }
                    movable = true;
                } else {
                    if (board[1 + 4*i].value === board[2 + 4*i].value){
                        board[1 + 4*i].value = 2*board[2 + 4*i].value;
                        board[2 + 4*i].value = board[3 + 4*i].value;
                        board[3 + 4*i].value = 0;
                        movable = true;
                        full -= 1;
                    } else {
                        if (board[2 + 4*i].value === board[3 + 4*i].value){
                            board[2 + 4*i].value = 2*board[3 + 4*i].value;
                            board[3 + 4*i].value = 0;
                            movable = true;
                            full -= 1;
                        }
                    }
                }
            }
        }
    }
    // Right
    if (dir === 2){
        console.log('Key Right was pressed');
        rightLeft = 1;

        for (i = 0; i < 4; i++){
            notNull = 0;
            for (j = 3; j >= 0; j--){
                if (board[4*j+i].value !== 0){
                    notNullArray[notNull] = 4*j+i;
                    notNull += 1;
                }
            }
            console.log(notNull);
            // Move tiles in the right direction
            for (k = 3; k >= 0; k--){
                if ((3-k) < notNull){
                    if ((4*k + i) !== notNullArray[3-k]){
                        board[4*k+i].value = board[notNullArray[3-k]].value;
                        movable = true;
                    }
                } else {
                    board[4*k+i].value = 0;
                }
            }
            // Deal with collision
            if (notNull === 2){
                if (board[8 + i].value === board[12 + i].value){
                    board[12 + i].value = 2*board[8 + i].value;
                    board[8 + i].value = 0;
                    movable = true;
                    full -= 1;
                }
            }
            if (notNull === 3){
                if (board[12 + i].value === board[8 + i].value){
                    board[12 + i].value = 2*board[8 + i].value;
                    board[8 + i].value = board[4 + i].value;
                    board[4 + i].value = 0;
                    movable = true;
                    full -= 1;
                }
                if (board[8 + i].value === board[4 + i].value){
                    board[8 + i].value = 2*board[4 + i].value;
                    board[4 + i].value = 0;
                    movable = true;
                    full -= 1;
                }
            }
            if (notNull === 4){
                if (board[12 + i].value === board[8 + i].value){
                    board[12 + i].value = 2*board[8 + i].value;
                    if (board[4 + i].value === board[i].value){
                        board[8 + i].value = 2*board[4 + i].value;
                        board[4 + i].value = 0;
                        board[i].value = 0;
                        full -= 2
                    } else {
                        board[8 + i].value = board[4 + i].value;
                        board[4 + i].value = board[i].value;
                        board[i].value = 0;
                        full -= 1;
                    }
                    movable = true;
                } else {
                    if (board[8 + i].value === board[4 + i].value){
                        board[8 + i].value = 2*board[4 + i].value;
                        board[4 + i].value = board[i].value;
                        board[i].value = 0;
                        movable = true;
                        full -= 1;
                    } else {
                        if (board[4 + i].value === board[i].value){
                            board[4 + i].value = 2*board[i].value;
                            board[i].value = 0;
                            movable = true;
                            full -= 1;
                        }
                    }
                }
            }
        }

    }
    // Down
    if (dir === 3){
        console.log('Key Down was pressed');
        upDown = -1

        for (i = 0; i < 4; i++){
            notNull = 0;
            for (j = 3; j >= 0; j--){
                if (board[j+4*i].value !== 0){
                    notNullArray[notNull] = j+4*i;
                    notNull += 1;
                }
            }
            console.log(notNull);
            // Move tiles in the right directions
            for (k = 3; k >= 0; k--){
                if ((3-k) < notNull){
                    if ((k + 4*i) !== notNullArray[3-k]){
                        board[k+4*i].value = board[notNullArray[3-k]].value;
                        movable = true;
                    }
                } else {
                    board[k+4*i].value = 0;
                }
            }
            // Deal with collision
            if (notNull === 2){
                if (board[3+4*i].value === board[2 + 4*i].value){
                    board[3+4*i].value = 2*board[2 + 4*i].value;
                    board[2 + 4*i].value = 0;
                    movable = true;
                    full -= 1;
                }
            }
            if (notNull === 3){
                if (board[3+4*i].value === board[2 + 4*i].value){
                    board[3+4*i].value = 2*board[2 + 4*i].value;
                    board[2 + 4*i].value = board[1 + 4*i].value;
                    board[1 + 4*i].value = 0;
                    movable = true;
                    full -= 1;
                }
                if (board[2 + 4*i].value === board[1 + 4*i].value){
                    board[2 + 4*i].value = 2*board[1 + 4*i].value;
                    board[1 + 4*i].value = 0;
                    movable = true;
                    full -= 1;
                }
            }
            if (notNull === 4){
                if (board[3 + 4*i].value === board[2 + 4*i].value){
                    board[3 + 4*i].value = 2*board[2 + 4*i].value;
                    if (board[1 + 4*i].value === board[4*i].value){
                        board[2 + 4*i].value = 2*board[4*i].value;
                        board[1 + 4*i].value = 0;
                        board[4*i].value = 0;
                        full -= 2
                    } else {
                        board[2 + 4*i].value = board[1 + 4*i].value;
                        board[1 + 4*i].value = board[4*i].value;
                        board[4*i].value = 0;
                        full -= 1;
                    }
                    movable = true;
                } else {
                    if (board[2 + 4*i].value === board[1 + 4*i].value){
                        board[2 + 4*i].value = 2*board[1 + 4*i].value;
                        board[1 + 4*i].value = board[4*i].value;
                        board[4*i].value = 0;
                        movable = true;
                        full -= 1;
                    } else {
                        if (board[1 + 4*i].value === board[4*i].value){
                            board[1 + 4*i].value = 2*board[4*i].value;
                            board[4*i].value = 0;
                            movable = true;
                            full -= 1;
                        }
                    }
                }
            }
        }
    }
    // Left
    if (dir === 4){
        console.log('Key Left was pressed');
        rightLeft = -1

        for (i = 0; i < 4; i++){
            notNull = 0;
            for (j = 0; j < 4; j++){
                if (board[4*j+i].value !== 0){
                    notNullArray[notNull] = 4*j+i;
                    notNull += 1;
                }
            }
            console.log(notNull);
            // Move tiles in the right direction
            for (k = 0; k < 4; k++){
                if (k < notNull){
                    if ((4*k + i) !== notNullArray[k]){
                        board[4*k+i].value = board[notNullArray[k]].value;
                        movable = true;
                    }
                } else {
                    board[4*k+i].value = 0;
                }
            }
            // Deal with collision
            if (notNull === 2){
                if (board[i].value === board[4 + i].value){
                    board[i].value = 2*board[4 + i].value;
                    board[4 + i].value = 0;
                    movable = true;
                    full -= 1;
                }
            }
            if (notNull === 3){
                if (board[i].value === board[4 + i].value){
                    board[i].value = 2*board[4 + i].value;
                    board[4 + i].value = board[8 + i].value;
                    board[8 + i].value = 0;
                    movable = true;
                    full -= 1;
                }
                if (board[4 + i].value === board[8 + i].value){
                    board[4 + i].value = 2*board[8 + i].value;
                    board[8 + i].value = 0;
                    movable = true;
                    full -= 1;
                }
            }
            if (notNull === 4){
                if (board[i].value === board[4 + i].value){
                    board[i].value = 2*board[4 + i].value;
                    if (board[8 + i].value === board[12 + i].value){
                        board[4 + i].value = 2*board[8 + i].value;
                        board[8 + i].value = 0;
                        board[12 + i].value = 0;
                        full -= 2
                    } else {
                        board[4 + i].value = board[8 + i].value;
                        board[8 + i].value = board[12 + i].value;
                        board[12 + i].value = 0;
                        full -= 1;
                    }
                    movable = true;
                } else {
                    if (board[4 + i].value === board[8 + i].value){
                        board[4 + i].value = 2*board[8 + i].value;
                        board[8 + i].value = board[12 + i].value;
                        board[12 + i].value = 0;
                        movable = true;
                        full -= 1;
                    } else {
                        if (board[8 + i].value === board[12 + i].value){
                            board[8 + i].value = 2*board[12 + i].value;
                            board[12 + i].value = 0;
                            movable = true;
                            full -= 1;
                        }
                    }
                }
            }
        }
    }

    // Create a new tile
    do {
        newTile = Math.floor(Math.random() * 16);
    } while (board[newTile].value !== 0 && full < 16)
    if (full < 16 && movable){
        value = (Math.floor(Math.random() * 2) + 1)*2;
        board[newTile].value = value;
        full += 1;
    } else {
        console.log('Game over');
    }
    movable = false;
    console.log(full);

}
