/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { NativeModules, NativeEventEmitter, Platform, StyleSheet, Dimensions, Text, View, Button, TouchableOpacity, SectionList, ScrollView } from 'react-native';

import JSONTree from 'react-native-json-tree'
import Contacts from 'react-native-contacts';
import slowlog from 'react-native-slowlog';
import * as R from "ramda";
import ContactsWrapper from 'react-native-contacts-wrapper';
import { ContactExample } from './ContactExample';
import AtoZList from 'react-native-atoz-list';

const _Contacts = NativeModules.Contacts;
const eventEmitter = new NativeEventEmitter(_Contacts);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// datat1979

let subscription;

export default class App extends Component {
  constructor(props) {
    super(props);
    slowlog(this, /.*/, { verbose: true });

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
    const { contacts, showRaw, showList, showLargeList, showAtoZList, changed, changedData, importedContact, subscribed = false } = this.state;
    const transformToSection = R.pipe(
      R.groupBy(contact => Math.floor(parseInt(contact.middleName) / 10)),
      R.toPairs,
      R.map(([title, data]) => ({ title, data }))
    );

    const _contacts = contacts || [];
    const comp = this;

    if (showAtoZList) {
      let names = require('./names');
      names = R.groupBy((name) => name[0].toUpperCase(), names);
      return (
        <View style={styles.listContainer}>
          <Button
            style={styles.button}
            onPress={() => this.setState({ showAtoZList: !showAtoZList })}
            title="Hide A-to-Z List"
            color="#222222"
          />
          <AtoZList
            incrementDelay={10}
            initialNumToRender={20}
            pageSize={Platform.OS === 'ios' ? 15 : 8}
            maxNumToRender={200}
            numToRenderAhead={100}
            numToRenderBehind={10}
            sectionHeaderHeight={20}
            cellHeight={40}
            data={names}
            renderCell={this._renderCell}
            renderSection={this._renderHeader}
          />
        </View>
      );
    }

    if (showLargeList) {
      return (
        <View style={styles.listContainer}>
          <Button
            style={styles.button}
            onPress={() => this.setState({ showLargeList: !showLargeList })}
            title="Hide Large List"
            color="#222222"
          />
          <ContactExample native />
        </View>
      );
    }

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
        <TouchableOpacity style={styles.instructions} onPress={this._import.bind(this)}>
          <Text style={{ fontWeight: "bold" }}>Import Contact</Text>
          {importedContact && <JSONTree data={importedContact} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={() => this.setState({ showRaw: !showRaw })}>
          <Text style={{ fontWeight: "bold" }}>Toggle JSON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={() => this.setState({ showList: !showList })}>
          <Text style={{ fontWeight: "bold" }}>Toggle Section List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={() => this.setState({ showLargeList: !showLargeList })}>
          <Text style={{ fontWeight: "bold" }}>Load Large List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={() => this.setState({ showAtoZList: !showAtoZList })}>
          <Text style={{ fontWeight: "bold" }}>Load A-to-Z List</Text>
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

  async _import() {
    try {
      const importedContact = await ContactsWrapper.getContact();
      this.setState({ importedContact });
    } catch (e) {
      this.setState({ importedContact: e.message });
    }
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
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width
  },
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
  name: {
    fontSize: 15,
  },
  button: {
    width: 100,
    padding: 0,
    margin: 0,
    fontWeight: "bold"
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
