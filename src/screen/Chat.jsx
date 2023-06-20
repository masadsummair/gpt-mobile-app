/* eslint-disable react-native/no-inline-styles */
import {
  Icon,
  IconElement,
  IconProps,
  Input,
  Layout,
  Text,
} from '@ui-kitten/components';
import { FlatList, Keyboard, Pressable, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SCREEN_WIDTH, normalize } from '../styles/Style';
import { Image } from 'react-native';
import { View } from 'react-native';
import Theme from '../styles/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { TypingAnimation } from 'react-native-typing-animation';
import { chatSlice } from '../store/slices/ChatSlice';
import { askQuestion } from '../store/action/ChatAction';

export default function Chat({ route }) {
  console.log(route)
  const { chat, isTyping } = useSelector(({ chatSlice }) =>
    ({ chat: chatSlice.chat.find((item, index) => route.name === 'chat-' + index)[1], isTyping: chatSlice.isTyping })
  );
  const user = useSelector(({ userSlice }) =>
    userSlice.user
  );

  const [question, setQuestion] = useState('');
  const dispatch = useDispatch();
  const chatRef=useRef();
  const handleNewMessage = async (message) => {
    if(message.length>0)
    {
      dispatch(askQuestion(message))
    }else
   {
    if (question.length <= 0 || isTyping) {
      return;
    }
    dispatch(askQuestion(question))
   }
   setQuestion("");
   Keyboard.dismiss();
   scrollTobBottom();
  };
  const scrollTobBottom = () => {
    chatRef.current?.scrollToEnd();
  };
  useEffect(()=>{
    scrollTobBottom()
  },[])
  return (
    <Layout style={Style.container} level="2">
      {!chat || (chat && chat.length === 0) ? (
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              paddingVertical: 10,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {user.expert === 'lena' ? (
                <Image
                  style={Style.selectAvatar}
                  source={require('../../assets/lena.png')}
                />
              ) : (
                <Image
                  style={Style.selectAvatar}
                  source={require('../../assets/nia.png')}
                />
              )}
              <Text
                category="c2"
                style={{
                  fontSize: normalize(26),
                  textAlign: 'center',
                  paddingHorizontal: normalize(50),
                }}>
                Hi {user.firstname},Nice to meet you!
              </Text>
            </View>
            <View
              style={{ flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <Text category="h2">Example</Text>
              <Pressable  style={Style.card} onPress={()=>{handleNewMessage("I don’t have any energy. What should I do today?")}}>
                <Text style={{ textAlign: 'center' }}>
                I don’t have any energy. What should I do today?
                </Text>
              </Pressable >
              <Pressable  style={Style.card} onPress={()=>{handleNewMessage("Got any creative ideas for a 5 year old’s birthday?")}}>
                <Text style={{ textAlign: 'center' }}>
                Got any creative ideas for a 5 year old’s birthday?
                </Text>
              </Pressable >
              <Pressable  style={Style.card} onPress={()=>{handleNewMessage("Create a plan for a family trip to NYC for 10 days")}}>
                <Text style={{ textAlign: 'center' }}>
                Create a plan for a family trip to NYC for 10 days
                </Text>
              </Pressable >
            </View>
            <View
              style={{ flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <Text category="h2">Capabilities</Text>
              <View style={Style.card}>
                <Text style={{ textAlign: 'center', flexGrow: 1 }}>
                  Remembers what user said earlier in the conversation
                </Text>
              </View>
              <View style={Style.card}>
                <Text style={{ textAlign: 'center', flexGrow: 1 }}>
                  Allows user to provide follow-up corrections
                </Text>
              </View>
              <View style={Style.card}>
                <Text style={{ textAlign: 'center', flexGrow: 1 }}>
                  Trained to decline inappropriate requests
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (

        <>
          {chat && <FlatList
            ref={chatRef}
            inverted 
            style={Style.chats}
            contentContainerStyle={{flexDirection: 'column-reverse', justifyContent: "flex-end", flexGrow: 1, alignSelf: "flex-end", paddingBottom: 20 }}
            data={chat}
            keyExtractor={(item, index) => item.type + index}
            renderItem={({ item, index }) => (
              <View style={Style.message}>
                {item.type === 'question' ? (
                  <View style={Style.rightChat}>
                    <Text selectable>{item.message}</Text>
                  </View>
                ) : (
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    {user.expert === 'lena' ? (
                      <Image
                        style={Style.messageAvatar}
                        source={require('../../assets/lena.png')}
                      />
                    ) : (
                      <Image
                        style={Style.messageAvatar}
                        source={require('../../assets/nia.png')}
                      />
                    )}
                    {isTyping && chat.length - 1 === index ?
                      <View style={Style.typingChat}>
                        <TypingAnimation
                          style={Style.typing}
                          dotColor="black"
                          dotMargin={6}
                          dotAmplitude={3}
                          dotSpeed={0.15}
                          dotRadius={3}
                          dotX={10}
                          dotY={10}
                        />
                      </View> : <View style={Style.leftChat}>
                        <Text style={{ color: Theme.color.MediumBlack }} selectable>
                          {item.message}
                        </Text>
                      </View>}
                  </View>
                )}
              </View>
            )}
          />}</>
      )}
      <Layout style={Style.chat} level="2">
        <Input
          value={question}
          style={Style.input}
          placeholder="Can you help me write a bedtime story?"
          accessoryRight={(props) => (<Pressable onPress={()=>{handleNewMessage("")}}>

            <Icon style={Style.icon}
              fill={Theme.color.darkSecondary} name="paper-plane-outline" />
          </Pressable>)}
          multiline={true}
          onChangeText={nextValue => setQuestion(nextValue)}
          onSubmitEditing={()=>{handleNewMessage("")}}
        />
      </Layout>
    </Layout>
  );
}


const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: normalize(20),
  },
  MenuIcon: {
    width: 30,
    height: 30,
  },
  PlusIcon: {
    width: 40,
    height: 40,
  },
  selectAvatar: {
    width: normalize(160),
    height: normalize(160),
  },
  messageAvatar: {
    width: normalize(30),
    height: normalize(30),
  },
  card: {
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: Theme.color.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: normalize(300),
    flexDirection: 'column',
    gap: 20,
    padding: 20,
  },
  chat: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginHorizontal: normalize(15),
    marginVertical: normalize(10),
    borderWidth: 2,
    borderColor: Theme.color.darkSecondary,
    borderRadius: 10,
  },
  rightChat: {
    borderRadius: 15,
    borderTopRightRadius: 0,
    borderWidth: 0,
    backgroundColor: Theme.color.white,
    alignItems: 'flex-start',
    padding: 10,
    alignSelf: 'flex-end',
    maxWidth: "90%"
  },
  leftChat: {
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderWidth: 2,
    backgroundColor: Theme.color.secondary,
    borderColor: Theme.color.darkSecondary,
    alignItems: 'flex-start',
    padding: 10,
    alignSelf: 'flex-start',
    maxWidth: "90%"
  },
  typingChat: {
    borderRadius: 15,
    borderTopLeftRadius: 0,
    borderWidth: 2,
    backgroundColor: Theme.color.secondary,
    borderColor: Theme.color.darkSecondary,
    alignItems: 'flex-start',
    padding: 10,
    alignSelf: 'flex-start',
    width: 50,
    height: 30,
    paddingBottom: 2
  },
  typing: {
    position: "absolute",
    left: 10
  },
  chats: {
    flex: 1,
    flexGrow: 1,
    height: "100%",
  },
  message: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
    marginVertical:normalize(10)
  },
  icon: {
    width: normalize(26),
    height: normalize(26),
  },
});