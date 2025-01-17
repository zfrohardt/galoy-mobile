import * as React from "react"
import { Text, View } from "react-native"
import { ListItem } from "react-native-elements"
import EStyleSheet from "react-native-extended-stylesheet"
import { FlatList } from "react-native-gesture-handler"
import { Screen } from "../../components/screen"
import { palette } from "../../theme/palette"
import Icon from "react-native-vector-icons/Ionicons"
import { useApolloClient, useQuery } from "@apollo/client"
import { gql } from '@apollo/client';


const styles = EStyleSheet.create({

})

export const ContactsScreen = ({ navigation }) => {
  const client = useApolloClient()
  
  const { data } = useQuery(gql`
    query contacts {
      me {
        contacts {
          id
          name
          prettyName @client
          transactionsCount
        }
      }
    }`
  )

  const contacts = data?.me?.contacts ?? []

  return (
  <Screen backgroundColor={palette.lighterGrey}>
      <FlatList
      style={{paddingTop: 18}}
      data={contacts}
      ListEmptyComponent={() => 
        <View style={{marginHorizontal: 12, marginTop: 32}}>
          <Text style={{fontSize: 18}}>{"No contact yet.\n\nSend or receive payment with a username. Usernames will automatically be added here."}</Text>
        </View>
      }
      renderItem={({ item }) => (
        <ListItem 
          underlayColor={palette.lighterGrey}
          activeOpacity={0.7}
          style={{ marginHorizontal: 32, marginVertical: 8 }}
          containerStyle={{borderRadius: 8}}
          onPress={() => navigation.navigate("contactDetail", {contact: item})}>
          {/* <Avatar source={{uri: .avatar_url}} /> */}
          <Icon name={"ios-person-outline"} size={24} color={palette.green} />
          <ListItem.Content>
            <ListItem.Title>{item.prettyName}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      )}
      keyExtractor={(item) => item.id}
      />
  </Screen>
)}
