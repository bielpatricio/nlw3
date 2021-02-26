import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import LevelUpModal from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number; 
}

interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experiencetoNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number; 
    currentExperience: number; 
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider( {children, ...rest} : ChallengesProviderProps ){
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ??0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ??0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experiencetoNextLevel = Math.pow((level+1)*4, 2)

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, []) //array vazio roda uma unica vez quando chamado

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp(){
    setLevel(level +1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengesIndex];
    
    setActiveChallenge(challenge)
    new Audio('/notification.mp3').play();
    if(Notification.permission === 'granted'){ //mdnNotification
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge){
      return;
    }

    const {amount} = activeChallenge;

    let finalExpetience = currentExperience + amount;

    if(finalExpetience >= experiencetoNextLevel){
      finalExpetience = finalExpetience - experiencetoNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExpetience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }

  return (
    <ChallengesContext.Provider value={{
        level, 
        currentExperience, 
        experiencetoNextLevel,
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal
    }}
    >
        {children}
        {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}