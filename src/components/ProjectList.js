import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import { connect } from 'react-redux';
import ProjectItem from './ProjectItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#e5e5e5',
    },
});

class ProjectList extends Component {
    static navigationOptions = {
        tabBarLabel: 'Projects',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name={'assignment'}
                size={45}
                style={{ color: tintColor }}
            />
        )
    }
    render() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.dataSource = ds.cloneWithRows(this.props.projects);
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.dataSource}
                    style={styles.listView}
                    renderRow={(rowData) =>
                        <ProjectItem projects={rowData} />
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const people = _.map(state.people, (val, uid) => {
        return { ...val, uid };
    });

    const projects =
        _.chain(people)
            .groupBy('project')
            .map((value, key) => {
                return {
                    project: key,
                    names: value,
                };
            })
            .value();

    return {
        projects,
    };
};

export default connect(mapStateToProps)(ProjectList);