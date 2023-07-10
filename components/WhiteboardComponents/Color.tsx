import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { useWhiteboardStore } from "./WhiteboardStore";
import { TouchableOpacity } from "react-native";

const Color = ({
    onPress, 
    color,
    id, 
}: {
    onPress: (event: GestureResponderEvent) => void;
    color: string;
    id: number;
}) => {
    
    return (
        <TouchableOpacity
            activeOpacity={ 0.6 }
            onPress={onPress}
            style = {{
                height: '20%', 
                width: '20%', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: color,
                margin: '2%',

            }}>
            <View
                style = {{
                    height: '100%', 
                    width: '100%', 
                    borderColor: 'black', 
                    borderWidth: 1, 
                    borderStyle: 'solid',
                }}
            ></View>


        </TouchableOpacity>
    );
};


export default Color;