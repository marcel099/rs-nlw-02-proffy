import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  Alert, View, Image, Text, TouchableOpacity, StatusBar,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesIcon from '@assets/images/icons/give-classes.png';
import heartIcon from '@assets/images/icons/heart.png';
import studyIcon from '@assets/images/icons/study.png';
import landingImage from '@assets/images/landing.png';

import { useAuth } from '@contexts/AuthContext';
import { AppStackScreenProp } from '@routes/app.stack.routes';
import api from '@services/api';

import { UserAvatar } from '@components/UserAvatar';

import styles from './styles';

export function Landing() {
  const { navigate } =
    useNavigation<AppStackScreenProp<'Landing'>['navigation']>();
  const { signOut, user } = useAuth();

  const [totalConnections, setTotalConnections] = useState(0);

  async function handleSignOut() {
    try {
      signOut();
    } catch (error) {
      Alert.alert('Erro ao deslogar');
    }
  }

  function handleNavigateToMyProfile() {
    navigate('MyProfile');
  }

  function handleNavigateToGiveClasses() {
    navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  useEffect(() => {
    async function fetchNumberOfConnections() {
      try {
        const response = await api.get('/connections');

        const { total } = response.data;

        setTotalConnections(total);
      } catch (error) {
        // console.log(error);
      }
    }

    fetchNumberOfConnections();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#8257e5"
        translucent
      />
      <View
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.userActions}>
            <View style={styles.userInfo}>
              <UserAvatar
                avatar={user?.avatar ?? null}
                size="sm"
              />
              <TouchableOpacity
                onPress={handleNavigateToMyProfile}
              >
                <Text style={styles.userName}>
                  {`${user?.firstName} ${user?.lastName}`}
                </Text>
              </TouchableOpacity>
            </View>
            <RectButton
              onPress={handleSignOut}
              style={styles.signOutButton}
            >
              <Feather name="power" color="#D4C2FF" size={20} />
            </RectButton>
          </View>
          <Image source={landingImage} style={styles.banner} />
        </View>

        <Text style={styles.title}>
          Seja bem-vindo. {'\n'}
          <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleNavigateToStudyPages}
            style={[styles.button, styles.buttonPrimary]}
          >
            <Image source={studyIcon} />
            <Text style={styles.buttonText}>Estudar</Text>
          </RectButton>

          <RectButton
            onPress={handleNavigateToGiveClasses}
            style={[styles.button, styles.buttonSecondary]}
          >
            <Image source={giveClassesIcon} />
            <Text style={styles.buttonText}>Dar aulas</Text>
          </RectButton>
        </View>

        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões{'\n'}já realizadas {' '}
          <Image source={heartIcon} />
        </Text>
      </View>
    </>
  );
}
