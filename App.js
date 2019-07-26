/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import ImagePicker from "react-native-image-picker";
import FilePickerManager from "react-native-file-picker";

import RNFetchBlob from "rn-fetch-blob";

import axios from "axios";

export default class App extends React.Component {
  state = {
    text: "",
    switchValue: true,
    avatar: null,
    avatarSrc: null
  };
  onTapUpload() {
    const options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    //FilePickerManager.showFilePicker(options, response => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        RNFetchBlob.fetch(
          "POST",
          "http://192.168.1.105:8080/api/upload",
          {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            "Content-Type": "multipart/form-data"
          },
          [
            {
              name: "file",
              filename: response.fileName,
              type: response.typr,
              data: RNFetchBlob.wrap(response.path)
            },
            // elements without property `filename` will be sent as plain text
            //{ name: "empolyee[name]", data: "SANTU KOLEY" }
          ]
        )
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Button
                  onPress={this.onTapUpload.bind(this)}
                  title=" Tap to upload "
                  color="#6c63ff"
                />
              </View>
              <View style={styles.sectionContainer} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  },
});
