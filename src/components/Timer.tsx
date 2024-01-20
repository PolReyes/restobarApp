import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native'
import { FONTFAMILY, FONTSIZE } from '../theme/Theme';

const Timer = ({ duration }: { duration: number }) => {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        if (time !== 0) {
            setTimeout(() => {
                setTime(time - 1000);
            }, 1000);
        }

    }, [time]);

    const getFormattedTime = (milliseconds: number) => {
        const total_seconds = parseInt(Math.floor(milliseconds / 1000).toString());
        const total_minutes = parseInt(Math.floor(total_seconds / 60).toString());
        const total_hours = parseInt(Math.floor(total_minutes / 60).toString());

        const seconds = parseInt((total_seconds % 60).toString());
        const minutes = parseInt((total_minutes % 60).toString());
        const hours = parseInt((total_hours % 24).toString());

        if (hours !== 0) {
            return `${hours}:${minutes}:${seconds}`;
        }

        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    }

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.fontStyle}>{getFormattedTime(time)}</Text>
        </View>

    )


}
const styles = StyleSheet.create({
    timerContainer: {
        flex: 0.5,
        margin: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex'
    },
    fontStyle: {
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: 50,
        textAlign: 'center'
    }

})

export default Timer;
