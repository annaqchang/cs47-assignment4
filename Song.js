import { buildCodeAsync } from 'expo-auth-session/build/PKCE';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Colors from "./Themes/colors";
import { Ionicons } from '@expo/vector-icons';
 
export default function Song({ preview_url, name, artists, album, duration_ms, navigation, item }) {
 return (
    <View style={styles.bigbox}>
      <Pressable
        onPress={(e) => {
        e.stopPropagation();
        navigation.navigate('Screen3', {current: item})
        }}
      >
        <View>
          <Ionicons name="play-circle" size={23} color={Colors.spotify} />
        </View>
      </Pressable>
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
    width: '92%',
    flexDirection: 'row',
    marginLeft: 2,
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
  imagebox: {
    width: '18%',
    marginBottom: 8,
    marginRight: 8,
    marginLeft: 8,
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