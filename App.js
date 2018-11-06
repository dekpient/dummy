/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NativeModules, NativeEventEmitter, Platform, StyleSheet, Dimensions, Text, View, TouchableOpacity, SectionList, ScrollView} from 'react-native';

import JSONTree from 'react-native-json-tree'
import Contacts from 'react-native-contacts';
import slowlog from 'react-native-slowlog';
import { LargeList } from "react-native-largelist-v2";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import * as R from "ramda";

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

const dataProvider = new DataProvider((r1, r2) => !R.equals(r1, r2));

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

    this.state = { showRaw: false, showList: false, changed: false, changedData: null };
    this._getContactsSync();
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

    const comp = this;
    const provider = dataProvider.cloneWithRows(contacts || []);

    return (
      <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={provider} rowRenderer={this._rowRenderer} />
    )

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
            renderItem={({item, index, section}) => <Text key={index}>{item.givenName}</Text>}
            renderSectionHeader={({section: {title}}) => (
              <Text style={{fontWeight: 'bold'}}>{title}</Text>
            )}
            sections={transformToSection(contacts)}
            keyExtractor={(item, index) => item.middleName}
          />}
          {showLargeList && <LargeList
            style={styles.container}
            data={transformToLargeList(contacts)}
            heightForSection={() => 50}
            renderSection={(section) => (
              <View style={styles.section}><Text style={{fontWeight: 'bold'}}>{section}</Text></View>
            )}
            heightForIndexPath={() => 50}
            renderIndexPath={({ section, row: item }) => (<View style={styles.section}><Text key={item.recordID}>{item.givenName}</Text></View>)}
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
  }
});
