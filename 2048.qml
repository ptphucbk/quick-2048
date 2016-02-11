/****************************************************************************
** Game 2048 with QML
****************************************************************************/

import QtQuick 2.0
import "2048.js" as Game

Rectangle {
    id: screen
    width: 350 ; height: 235

    SystemPalette { id: activePalette }

    Rectangle {
        id: play
        property int score: 0
        property int tileSize: 50

        x: 115 ; y: 0
        width: 235 ;  height: 235 ; color: "maroon"

        focus: true
        Keys.onPressed: {
            if (event.key == Qt.Key_Up) {
                Game.handlePress(1);
            } else if (event.key == Qt.Key_Right) {
                Game.handlePress(2);
            } else if (event.key == Qt.Key_Down) {
                Game.handlePress(3);
            } else if (event.key == Qt.Key_Left) {
                Game.handlePress(4);
            } else {
                console.log('Press arrow key');
            }
        }

    }

    Rectangle {
        id: toolBar
        x: 0 ; y: 0
        width: 115 ; height: 235 ; color: "#cedbf6"

        Button {
            id: newGame
            anchors { horizontalCenter: parent.horizontalCenter ;
                verticalCenter: parent.verticalCenter ;
                verticalCenterOffset: -80 }
            text: "New Game"
            onClicked: Game.startGame()
        }

        Text {
            id: score
            anchors { horizontalCenter: parent.horizontalCenter ;
                verticalCenter: parent.verticalCenter ;
                verticalCenterOffset: 40 }
            text: "Score: "
        }
    }

}

