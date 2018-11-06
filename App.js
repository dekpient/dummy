/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NativeModules, NativeEventEmitter, Platform, StyleSheet, Dimensions, Text, View, TouchableOpacity, ListView, SectionList, ScrollView} from 'react-native';

import JSONTree from 'react-native-json-tree'
import Contacts from 'react-native-contacts';
import slowlog from 'react-native-slowlog';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import * as R from "ramda";
import AtoZList from 'react-native-atoz-list';
import AlphabetListView from 'react-native-alphabetlistview';

let names = require('./names');
names = R.groupBy((name) => name[0].toUpperCase(), names);

const _Contacts = NativeModules.Contacts;
const eventEmitter = new NativeEventEmitter(_Contacts);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// datat1979

// TODO
// - Pretty list
// - Semaphore
// - Android
// - Caching?

type Props = {};

type State = {
  contacts: object
};

let subscription;

class SectionHeader extends Component {
  render() {
    // inline styles used for brevity, use a stylesheet when possible
    var textStyle = {
      textAlign:'center',
      color:'#fff',
      fontWeight:'700',
      fontSize:16
    };

    var viewStyle = {
      backgroundColor: '#ccc'
    };
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    return (
      <Text style={{color:'#f00'}}>{this.props.title}</Text>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <View style={{height:30}}>
        <Text>{this.props.item}</Text>
      </View>
    );
  }
}

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    slowlog(this, /.*/, { verbose: true });


    let { width } = Dimensions.get("window");

    this._layoutProvider = new LayoutProvider(
        index => index,
        (type, dim) => {
          dim.width = width;
          dim.height = 20;
        }
    );

    this._rowRenderer = this._rowRenderer.bind(this);
    this._renderCell = this._renderCell.bind(this);
    this._renderHeader = this._renderHeader.bind(this);

    this.state = { showRaw: false, showList: false, changed: false, changedData: null };
    this._getContactsSync();
  }

  _renderHeader(data) {
      return (
          <View style={{ height: 20, justifyContent: 'center', backgroundColor: '#eee', paddingLeft: 10 }}>
              <Text>{data.sectionId}</Text>
          </View>
      )
  }

  _renderCell(data) {
      return (
          <View style={styles.cell}>
            <Text style={styles.name}>{data} {data.split('').reverse().join('')}</Text>
          </View>
      );
  }

  _generateArray(n) {
      let arr = new Array(n);
      for (let i = 0; i < n; i++) {
          arr[i] = i;
      }
      return arr;
  }

  _rowRenderer(type, data) {
      return (
          <View style={styles.container}>
              <Text>{data.givenName} {data.middleName} {data.familyName}</Text>
          </View>
      );
  }

  componentWillMount() {
    const comp = this;
    subscription = eventEmitter.addListener(
      'ContactsChanged',
      (changedData) => comp.setState({ changed: "true", changedData })
    );
  }

  componentWillUnmount() {
    subscription.remove();
  }

  render() {
    const { contacts, showRaw, showList, showLargeList, changed, changedData, subscribed = false } = this.state;
    const transformToSection = R.pipe(
      R.groupBy(contact => Math.floor(parseInt(contact.middleName) / 10)),
      R.toPairs,
      R.map(([title, data]) => ({ title, data }))
    );
    const transformToLargeList = R.pipe(
      R.groupBy(contact => Math.floor(parseInt(contact.middleName) / 10)),
      R.toPairs,
      R.map(([title, data]) => ({ items: data }))
    );

    const _contacts = contacts || [];
    const comp = this;
    const provider = new DataProvider((r1, r2) => !R.equals(r1, r2), (i) => _contacts[i].recordID).cloneWithRows(_contacts);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => !R.equals(r1, r2) });
    this.state = {
      dataSource: ds.cloneWithRows(_contacts),
    };

    /*
            incrementDelay={10}
            initialNumToRender={20}
            pageSize={Platform.OS === 'ios' ? 15 : 8}
            maxNumToRender={200}
            numToRenderAhead={100}
            numToRenderBehind={10}
    */

    if (showLargeList)
      // return (
      //   <AlphabetListView
      //     data={names}
      //     cell={Cell}
      //     cellHeight={30}
      //     sectionListItem={SectionItem}
      //     sectionHeader={SectionHeader}
      //     sectionHeaderHeight={22.5}
      //   />
      // );
      return (
          <AtoZList
              sectionHeaderHeight={20}
              cellHeight={40}
              data={names}
              renderCell={this._renderCell}
              renderSection={this._renderHeader}
              />
      );

      // return (
      //   <ListView
      //     dataSource={this.state.dataSource}
      //     renderRow={(data) => <Text>{data.givenName} {data.middleName} {data.familyName}</Text>}
      //   />
      // );

      // return (
      //   <RecyclerListView
      //     layoutProvider={this._layoutProvider}
      //     dataProvider={provider}
      //     rowRenderer={this._rowRenderer}
      //     renderAheadOffset={20 * (_contacts.length / 2)}
      //   />
      // )

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity style={styles.instructions} onPress={() => Contacts.subscribeToUpdates((err, subscribed) => comp.setState({ subscribed }))}>
          <Text style={{ fontWeight: "bold" }}>Subscribe to changes (Subscribed: {subscribed}, Changed: {changed})</Text>
          {changedData && <Text>{changedData}</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={this._getContacts.bind(this)}>
          <Text style={{ fontWeight: "bold" }}>Get Native Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={() => this.setState({ showRaw: !showRaw })}>
          <Text style={{ fontWeight: "bold" }}>Toggle JSON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={() => this.setState({ showList: !showList })}>
          <Text style={{ fontWeight: "bold" }}>Toggle Section List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={() => this.setState({ showLargeList: !showLargeList })}>
          <Text style={{ fontWeight: "bold" }}>Toggle Large List</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {showRaw && <JSONTree data={contacts} />}
        </ScrollView>
        {showList && <SectionList
          // maxToRenderPerBatch={50}
          initialNumberToRender={contacts.length}
          // windowSize={31}
          // removeClippedSubviews
          renderItem={({item, index, section}) => <Text key={item.recordID}>{item.givenName}</Text>}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
          )}
          sections={transformToSection(contacts)}
          keyExtractor={(item, index) => `${item.recordID}-${index}`}
        />}
      </View>
    );
  }

  _getContactsSync() {
    const comp = this;
    Contacts.getAllWithoutPhotos((err, contacts) => {
        comp.setState({ contacts: R.sortBy(R.prop("middleName"), contacts) });
    });
  }

  async _getContacts() {
    const contacts = await new Promise((resolve, reject) => {
      Contacts.getAllWithoutPhotos((err, contacts) => {
        if (err) {
          return reject(err);
        }
        resolve(contacts);
      });
    });
    this.setState({ contacts });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  contentContainer: {
    paddingVertical: 20,
    width: "100%"
  },
  section: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#EEE"
  },
  swipeContainer: {
  },
  alphabetSidebar: {
      position: 'absolute',
      backgroundColor: 'transparent',
      top: 0,
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
  },
  placeholderCircle: {
      width: 10,
      height: 10,
      backgroundColor: '#ccc',
      borderRadius: 15,
      marginRight: 10,
      marginLeft: 5,
  },
  name: {
      fontSize: 15,
  },
  cell: {
      height: 40,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20
  },
});

// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//    paddingTop: 22
//   },
//   sectionHeader: {
//     paddingTop: 2,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingBottom: 2,
//     fontSize: 14,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(247,247,247,1.0)',
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// });
