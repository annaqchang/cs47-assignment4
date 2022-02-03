import { StyleSheet, Text, SafeAreaView, View, Pressable, Image, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors";
import images from "./Themes/images";
import Song from "./Song";
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds";

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {

  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      myTopTracks(setTracks, token);
      //albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);

  const renderItem = (item) => {
    return (
      <Song
        preview_url={item.item.album.images[0].url}
        name={item.item.name}
        artists={item.item.album.artists[0].name}
        id={item.index}
        album={item.item.album.name}
        duration_ms={millisToMinutesAndSeconds(item.item.duration_ms)}
      />
    )
  }

  const SpotifyAuthButton = () => {
    return (
      <View>
        <Pressable
          style={styles.button}
          onPress= {()=> {promptAsync()}}
        >
          <View style={styles.buttonpiece}>
            <Image
              style={styles.smalllogo}
              source={images.spotify}
            />
          </View>
          <View style={styles.buttonpiece}>
            <Text style={styles.spotifytext}>
              CONNECT WITH SPOTIFY
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }
 
  const MyList = () => {
    return (
      <View>
        <View style={styles.topbox}>
          <View>
            <Image
              style={styles.biglogo}
              source={images.spotify}
            />
          </View>
          <View>
            <Text style={styles.toptext}>My Top Tracks</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={tracks}
            renderItem={(item) => renderItem(item)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
          <View style={styles.bottom}></View>
        </View>
      </View>
    );
  }

  let contentDisplayed = null;
    if (token) {
      contentDisplayed = <MyList />
    } else {
      contentDisplayed = <SpotifyAuthButton />
    }

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    backgroundColor: Colors.spotify,
    borderRadius: 99999,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 6,
   
  },
  spotifytext: {
    color: 'white',
  },
  smalllogo: {
    height: 15,
    width: 15,
  },
  biglogo: {
    height: 22,
    width: 22,
  },
  buttonpiece: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 2,
  },
  toptext: {
    color: 'white',
    fontSize: 22,
    fontWeight: "700",
    padding: 7,
  },
  topbox: {
    marginTop: 30,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    padding: 6,
  },
  bottom: {
    height: 110,
  }
});