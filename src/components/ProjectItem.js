import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';


const theme = getTheme();

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
    },
    title: {
        top: 20,
        left: 80,
        fontSize: 26,
    },
    image: {
        height: 100,
        width: '100%',
    },
    action: {
        backgroundColor: 'black',
        color: 'white',
        paddingBottom: 10,
        paddingTop: 10,
    },
    icon: {
        position: 'absolute',
        top: 15,
        left: 0,
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0)',
    },
});

const ProjectItem = (props) => {
    return (
        <View>


            <View style={[theme.cardStyle, styles.card]}>
                <Image
                    source={require('../images/background.jpg')}
                    style={[theme.cardImageStyle, styles.image]}
                />
                <Icon
                    name={'assignment'}
                    size={80}
                    style={styles.icon}
                />
                <Text style={[theme.cardTitleStyle, styles.title]}>{props.projects.project}</Text>
                {props.projects.names.map((name) => {
                  
                    return (
                        <Text
                            key={name.uid}
                            style={[theme.cardActionStyle, styles.action]}>
                            {name.first_name} {name.last_name} -Company: {name.company}
                        </Text>
                    );
                })}
            </View>
        </View>
    );
};

export default ProjectItem;