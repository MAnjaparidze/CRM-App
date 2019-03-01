import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import {connect} from 'react-redux';
import CompanyItem from './CompanyItem';

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

class CompanyList extends Component {
  static navigationOptions = {
    tabBarLabel: 'Companies',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name={'business'}
        size={45}
        style={{ color: tintColor }}
      />
    )
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.companies);
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.dataSource}
          style={styles.listView}
          renderRow={(rowData) =>
            <CompanyItem companies={rowData} />
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

  const companies = 
   _.chain(people)
   .groupBy('company')
   .map((value, key) => {
     return {
       company: key,
       names: value,
     };
   })
   .value();

   return {
     companies,
   };
};

export default connect(mapStateToProps)(CompanyList);