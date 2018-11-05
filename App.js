/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NativeModules, NativeEventEmitter, Platform, StyleSheet, Text, View, TouchableOpacity, SectionList, ScrollView} from 'react-native';

import JSONTree from 'react-native-json-tree'
import Contacts from 'react-native-contacts';
import slowlog from 'react-native-slowlog';
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

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    slowlog(this, /.*/, { verbose: true });
    this.state = { showRaw: false, showList: false, changed: false, changedData: null };
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
    const { contacts, showRaw, showList, changed, changedData, subscribed = false } = this.state;
    const transformToSection = R.pipe(
      R.groupBy(contact => Math.floor(parseInt(contact.middleName) / 10)),
      R.toPairs,
      R.map(([title, data]) => ({ title, data }))
    );

    const comp = this;

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
          <Text style={{ fontWeight: "bold" }}>Toggle List</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {showRaw && <JSONTree data={contacts} />}
          {showList && <SectionList
            renderItem={({item, index, section}) => <Text key={index}>{item.givenName}</Text>}
            renderSectionHeader={({section: {title}}) => (
              <Text style={{fontWeight: 'bold'}}>{title}</Text>
            )}
            sections={transformToSection(contacts)}
            keyExtractor={(item, index) => item.middleName}
          />}
        </ScrollView>
      </View>
    );
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
  }
});
