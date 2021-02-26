import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json'

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
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider( {children} : ChallengesProviderProps ){
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experiencetoNextLevel = Math.pow((level+1)*4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, []) //array vazio roda uma unica vez quando chamado

  function levelUp(){
  setLevel(level +1)
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
    }}
    >
        {children}
    </ChallengesContext.Provider>
  );
}