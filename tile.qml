import QtQuick 2.0

Item {
    id: tile
    property int value: 0

    Rectangle {
        width: 50
        height: 50
        // Color for 0: lightslategray - 2: blanchedalmond - 4: peachpuff - 8: pink - 16: salmon
        // 32: sandybrown - 64: red - 128: goldenrod - 256: gold
        // 512: orange - 1024: greenyellow - 2048: mediumslateblue
        color: {
            if (value == 0)
                return "lightslategray"
            else if (value == 2)
                return "blanchedalmond"
            else if (value == 4)
                return "peachpuff"
            else if (value == 8)
                return "pink"
            else if (value == 16)
                return "salmon"
            else if (value == 32)
                return "sandybrown"
            else if (value == 64)
                return "red"
            else if (value == 128)
                return "goldenrod"
            else if (value == 256)
                return "gold"
            else if (value == 512)
                return "orange"
            else if (value == 1024)
                return "greenyellow"
            else if (value == 2048)
                return "orangered"
            else
                return "cyan"
        }
        radius: {
            if (value == 0)
                return 4
            else
                return 2
        }

        Text {
            id: textValue
            color: "saddlebrown"
            text: {
                if (value == 0)
                    return qsTr("")
                else if (value == 2)
                    return qsTr("2")
                else if (value == 4)
                    return qsTr("4")
                else if (value == 8)
                    return qsTr("8")
                else if (value == 16)
                    return qsTr("16")
                else if (value == 32)
                    return qsTr("32")
                else if (value == 64)
                    return qsTr("64")
                else if (value == 128)
                    return qsTr("128")
                else if (value == 256)
                    return qsTr("256")
                else if (value == 512)
                    return qsTr("512")
                else if (value == 1024)
                    return qsTr("1024")
                else if (value == 2048)
                    return qsTr("2048")
                else
                    return "win"
            }
            anchors.fill: parent

            verticalAlignment: Text.AlignVCenter
            horizontalAlignment: Text.AlignHCenter
            font.bold: true
            font.pixelSize: {
                if (value < 100)
                    return 38
                else if (value >= 100 && value < 1000){
                    return 24
                } else {
                    return 20
                }
            }
        }
    }

}

