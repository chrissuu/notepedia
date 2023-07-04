import React from "react";
import { GestureResponderEvent, View } from "react-native";
import { useWhiteboardStore } from "./WhiteboardStore";
import { TouchableOpacity } from "react-native";

const Stroke = ({
    onPress, 
    stroke,
    id, 
}: {
    onPress: (event: GestureResponderEvent) => void;
    stroke: number;
    id: number;
}) => {
    
    const color = useWhiteboardStore(id, state => state.color);

    return (
        <TouchableOpacity
            activeOpacity={ 0.6 }
            onPress={onPress}
            style = {{
                height: 35, 
                width: 35, 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#358423'

            }}>
            <View
                style = {{
                    width: 25, 
                    backgroundColor: color, 
                    height: stroke, 
                    borderRadius: 10, 
                    transform: [
                        {
                            rotateZ: '-45deg',
                        }
                    ]

                }}
            ></View>


        </TouchableOpacity>
    );
};


export default Stroke;