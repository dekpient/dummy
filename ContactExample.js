/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/22
 *
 */

import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  LayoutAnimation
} from "react-native";
import { LargeList, NativeLargeList } from "react-native-largelist-v2";
import { contacts, names, alphabets } from "./DataSource";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
// import { SwipeListView } from "react-native-swipe-list-view";
// import DirectorySectionList from "./DirectorySectionList";

class ContactExampleStatic extends React.Component {
  largeList;

  constructor(props) {
    super(props);
    this.state = { data: names };
  }

  render() {
    const List = this.props.native ? NativeLargeList : LargeList;
    return (
      <View style={styles.viewContainer}>
        <List
          ref={ref => (this._listRef = ref)}
          style={styles.container}
          heightForSection={() => 40}
          renderSection={this._renderSection}
          heightForIndexPath={() => 60}
          renderIndexPath={this._renderItem}
          data={this.state.data}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
        />
        {/*<DirectorySectionList
          enabledSections={alphabets}
          onSectionSelect={this.jumpToSection}
        />*/}
      </View>
    );
  }

  jumpToSection = async (sectionTitle, sectionIndex) => {
    this._listRef.scrollToIndexPath({ section: sectionIndex, row: 0 }, false);
  }

  _renderHeader = () => {
    return (
      <TextInput
        style={styles.search}
        placeholder="Please type first letter to search"
        onSubmitEditing={this._search}
        returnKeyType="done"
      />
    );
  };

  _renderFooter = () => {
    return (
      <Text style={{ marginVertical: 20, alignSelf: "center" }}>
        This is the footer
      </Text>
    );
  };

  _renderSection = (section: number) => {
    const contact = this.state.data[section];
    return (
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionText}>
          {contact.header}
        </Text>
      </TouchableOpacity>
    );
  };

  _renderItem = ({ section: section, row: row }) => {
    const contact = this.state.data[section].items[row];
    return (
      <TouchableOpacity style={styles.row}>
        <View style={styles.rContainer}>
          <Text style={styles.title}>
            {contact.name}
          </Text>
          <Text style={styles.subtitle}>
            {contact.phone}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _search = ({ nativeEvent: { text: text } }) => {
    const notFound = names.every(contract => {
      if (contract.header === text) {
        this.setState({ data: [contract] });
        return false;
      }
      return true;
    });
    if (notFound) {
      this.setState({ data: [] });
    }
  };
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20
  },
  container: {
    flex: 1
  },
  search: {
    marginTop: 20,
    fontSize: 18
  },
  section: {
    flex: 1,
    backgroundColor: "#EEE",
    justifyContent: "center"
  },
  sectionText: {
    fontSize: 20,
    marginLeft: 10
  },
  row: { flex: 1, flexDirection: "row", alignItems: "center" },
  image: { marginLeft: 16, width: 44, height: 44 },
  rContainer: { marginLeft: 20 },
  title: { fontSize: 18 },
  subtitle: { fontSize: 14, marginTop: 8 }
});

export const ContactExample = gestureHandlerRootHOC(ContactExampleStatic);
