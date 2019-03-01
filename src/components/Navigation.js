import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import PeopleList from './PeopleList';
import ProjectList from './ProjectList';
import CompanyList from './CompanyList';
import AddPerson from './AddPerson';
import Logout from './Logout';

const Navigation = createBottomTabNavigator({
    PeopleList: { screen: PeopleList },
    ProjectList: { screen: ProjectList },
    AddPerson: { screen: AddPerson },
    CompanyList: { screen: CompanyList },
    Logout: {screen: Logout },
}, {
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: '#80cbc4',
            swipeEnabled: true,
            showLabel: false,
            style: {
                backgroundColor: '#26a69a',
            },
        },
    });

const NavigationContainer = createAppContainer(Navigation);

export default class NavigationExporter extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
                <NavigationContainer />
            </View>
        );
    }
}


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    logout: {
        width: 35,
        height: 35,
    }
})

// export default NavigationContainer;