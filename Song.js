import { buildCodeAsync } from 'expo-auth-session/build/PKCE';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Colors from "./Themes/colors";
 
export default function Song({ preview_url, name, artists, id, album, duration_ms }) {
 return (
   <View style={styles.bigbox}>
    <View style={styles.id}>
      <Text style={styles.text}>{id + 1}</Text>
    </View>
    <View style={styles.imagebox}>
      <Image style={styles.image} source={{uri: String(preview_url)}}></Image> 
    </View>
    <View style={styles.nameartist}>
      <View>
        <Text numberOfLines={1} style={styles.text}>{name}</Text>
      </View>
      <View>
        <Text style={styles.artisttext}>{artists}</Text>
      </View>
    </View>
    <View style={styles.album}>
      <Text numberOfLines={1} style={styles.text}>{album}</Text>
    </View>
    <View style={styles.duration_ms}>
      <Text style={styles.text}>{duration_ms}</Text>
    </View>
   </View>
 );
}
const styles = StyleSheet.create({
  bigbox: {
    alignItems: 'center',
    width: '95%',
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    color: Colors.gray,
    fontSize: 12,
    fontWeight: "700",
  },
  artisttext: {
    color: Colors.gray,
    fontSize: 11,
    fontWeight: '300'
  },
  id: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '7%',
  },
  imagebox: {
    width: '18%',
    marginBottom: 7,
    marginRight: 5,
  },
  image: {
    width: 65,
    height: 65,
  },
  nameartist: {
    width: '35%',
    justifyContent: 'center',
    marginRight: 10,
  },
  album: {
    width: '28%',
    marginRight: 10,
    justifyContent: 'center',
  },
  duration_ms: {
    width: '10%',
    justifyContent: 'center',
  },
});