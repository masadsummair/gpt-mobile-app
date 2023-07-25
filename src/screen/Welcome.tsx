import {
  Icon,
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  Datepicker,
} from '@ui-kitten/components';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Theme from '../styles/Theme';
import { normalize } from '../styles/Style';
import { onboardingVerification } from '../store/action/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../../assets/logo.svg";
import { IWelcomeInfo } from '../store/slices/UserSlice';




export default function Welcome({ navigation }) {
  const [option, setOption] = useState<number>(0);
  const [prevOptions, setPrevOptions] = useState<number>(-1);
  const [week, setWeek] = useState<number>(1);
  const [dob, setDob] = useState<Date>(new Date());
  const [welcomeInfo, setWelcomeInfo] = useState<IWelcomeInfo>({
    question1: '',
    question2: '',
    expert: 'lena',
  });
  const dispatch = useDispatch();
  const { firstname, lastname } = useSelector(({ userSlice }) =>
    userSlice.user,
  );
  const handleStart = async () => {

    if (welcomeInfo.question1 === 'I am pregnant') {
      setWelcomeInfo((prevState) => ({ ...prevState, question2: `week of my pregnancy is ${week}` }))
    } else {

      setWelcomeInfo((prevState) => ({ ...prevState, question2: `birthdate of my child is ${dob.toDateString()}` }))
    }
    dispatch(onboardingVerification(welcomeInfo))
  }
  return (
    <Layout style={Style.container} level="2">
      <Logo width={normalize(200)} height={normalize(60)} />
      <View style={Style.section}>
        {option === 0 && (
          <Text category="h3" style={Style.text}>
            Welcome {"\n"} {firstname ? firstname : "" + " " + lastname ? lastname : ""}
          </Text>
        )}

        <View style={{ width: '90%' }}>
          {/* card1 */}
          {option === 0 ? (
            <View style={Style.card}>
              <Pressable
                onPress={() => {
                  setOption(1);
                  setPrevOptions(0);
                  setWelcomeInfo({ ...welcomeInfo, question1: 'I m a new mom' });
                }}
                style={Style.option}>
                <Text category="h6">I m a new mom</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setOption(1);
                  setPrevOptions(0);
                  setWelcomeInfo({ ...welcomeInfo, question1: 'I am pregnant' });
                }}
                style={Style.option}>
                <Text category="h6">I am pregnant</Text>
              </Pressable>
            </View>
          ) : option === 1 && welcomeInfo.question1 === 'I am pregnant' ? (
            <View style={Style.card}>
              <Text style={Style.text}>
                In which week of pregnancy are you currently?
              </Text>
              <ButtonGroup
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    if (week <= 1) {
                      return;
                    }
                    setWeek(week - 1);
                  }}
                  style={Style.button}
                  accessoryLeft={(props) => (<Icon style={Style.icon}
                    fill={Theme.color.white} name="minus-outline" />)}

                />
                <View>
                  <Input
                    placeholder="2"
                    style={{
                      backgroundColor: Theme.color.white,
                      borderWidth: 0,
                      textAlign: 'center',
                      marginLeft: normalize(5)
                    }}
                    value={String(week)}
                    onChangeText={nextValue =>
                      Number(nextValue) <= 40 &&
                      Number(nextValue) >= 1 &&
                      setWeek(Number(nextValue))
                    }
                  />
                </View>
                <Button
                  onPress={() => {
                    if (week >= 40) {
                      return;
                    }
                    setWeek(week + 1);
                  }}
                  style={Style.button}
                  accessoryLeft={(props) => (<Icon style={Style.icon}
                    fill={Theme.color.white} name="plus-outline" />)}
                ></Button>
              </ButtonGroup>
            </View>
          ) : option === 1 && welcomeInfo.question1 === 'I m a new mom' ? (
            <View style={Style.card}>
              <Text style={Style.text}>
                What is the birthdate of your child?
              </Text>
              <Datepicker
                style={{
                  borderWidth: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                date={dob}
                min={new Date(1900, 0, 0)}
                max={new Date()}
                onSelect={nextDate => setDob(nextDate)}
              />
            </View>
          ) : option === 2 ? (
            <>
              <Text style={{ fontSize: normalize(24), textAlign: 'center' }}>
                Select your expert
              </Text>
              <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Pressable
                  onPress={() => {
                    setOption(3);
                    setPrevOptions(2);
                    setWelcomeInfo({ ...welcomeInfo, expert: 'lena' });
                  }}
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={Style.avatar}
                    source={require('../../assets/lena.png')}
                  />
                  <Text category="h3">Lena</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setOption(3);
                    setPrevOptions(2);
                    setWelcomeInfo({ ...welcomeInfo, expert: 'nia' });
                  }}
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={Style.avatar}
                    source={require('../../assets/nia.png')}
                  />
                  <Text category="h3">Nia</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <View
              style={{ alignItems: 'center', flexDirection: 'column', gap: 20 }}>
              {welcomeInfo.expert === 'lena' ? (
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
                style={{ fontSize: normalize(26), textAlign: 'center' }}>
                Hi {firstname ? firstname : "" + " " + lastname ? lastname : ""},Nice to meet you!
              </Text>
              <Button
                onPress={handleStart}
                size="large"
                style={{
                  backgroundColor: Theme.color.MediumBlack,
                  width: '60%',
                }}>
                Let’s Start
              </Button>
            </View>
          )}
        </View>
      </View>
      {prevOptions !== -1 ? (
        <View style={Style.pagination}>
          <Pressable
            onPress={() => {
              setOption(prevOptions);
              setPrevOptions(prevOptions - 1);
            }}
            style={Style.paginationSection}
          >
            <Icon
              style={Style.icon}
              fill={Theme.color.secondary}
              name="arrow-ios-back-outline"
            />
          </Pressable>
          {prevOptions !== 2 && (
            <Pressable
              onPress={() => {
                setOption(option + 1);
                setPrevOptions(option);
              }}
              style={Style.paginationSection}>
              <Icon
                style={Style.icon}
                fill={Theme.color.secondary}
                name="arrow-ios-forward-outline"
              />
            </Pressable>
          )}
        </View>
      ) : (
        <></>
      )}
    </Layout>
  );
}
const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: normalize(20),
    paddingTop: normalize(20),
  },
  logo: {},
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize(20),
    width: '100%',
    flex: 1,
  },
  text: {
    // fontSize: normalize(16),
    textAlign: 'center',
    paddingHorizontal: normalize(10)
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
    width: '100%',
    flexDirection: 'column',
    gap: 20,
    padding: 40,
  },
  option: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Theme.color.lightGray,
    padding: 20,
    alignItems: 'center',
  },
  pagination: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: Theme.color.MediumBlack,
  },
  paginationSection: {
    backgroundColor: Theme.color.MediumBlack,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    elevation: 5,
    borderRadius: 30,
    borderWidth: 0,
  },
  icon: {
    width: normalize(32),
    height: normalize(32),
  },
  avatar: {
    width: normalize(150),
    height: normalize(150),
  },
  selectAvatar: {
    width: normalize(160),
    height: normalize(160),
  },
  icon: {
    width: normalize(26),
    height: normalize(26),
  },
});
