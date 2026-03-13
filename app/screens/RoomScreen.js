import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView, 
  Text, 
  Platform,
  RefreshControl
} from "react-native";

import colors from "../config/colors";
import textFont from "../config/textFont";
import RoomButton from "../components/rooms/RoomButton";
import LoadingIndicator from "../components/generalComponents/LoadingIndicator";

import roomsApi from "../api/rooms";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

function RoomScreen({ navigation }) {
    const [rooms, setRooms] = useState([]);
    const getRoomsApi = useApi(roomsApi.getRooms);
    const { user } = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    const loadRooms = async () => {
      console.log("in loadRooms");
      //console.log(user);
        const response = await getRoomsApi.request({userId: user.userId});
        setRooms(response.data.rooms);
    }

    const onRefresh = async () => {
      setRefreshing(true);
      await loadRooms();
      setRefreshing(false);
    };

    useEffect(() => {
        loadRooms();
    }, []);

    return (
        <ScrollView 
          style={styles.scrollViewOuter}
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
            <LoadingIndicator visible={getRoomsApi.loading} />
            
            {/* Section with Title and Image */}
            <View style={styles.secondaryContainer}>
                <Text style={textFont.title}>Rooms</Text>
                {rooms.map((room) => (
                    <RoomButton 
                        buttonName={room.room_name} 
                        key={room.room_id}
                        roomId={room.room_id}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  scrollViewOuter: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  scrollView: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: 100,
    backgroundColor: colors.backgroundColor,
  },

  secondaryContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop:40,
     // Added space below title/image to avoid crowding
  },

  graph: {
    marginVertical: 15,
    width: 270,
    height: 250,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
    borderRadius: 20,
  },

  infoContainer: {
    width: "90%", // Prevents stretching on wide screens
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RoomScreen;
