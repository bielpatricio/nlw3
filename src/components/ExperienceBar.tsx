import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){
    const {currentExperience, experiencetoNextLevel} = useContext(ChallengesContext);
    
    const porcentToNextLevel = Math.round(currentExperience * 100) / experiencetoNextLevel;
    
    return (
        <header className={styles.experienceBar}> 
            {/* poderia ser uma div */}
            <span>0 xp</span>
            <div>
               <div style={{ width: `${porcentToNextLevel}%` }}/>
                <span className={styles.currentExperience} style={{left: `${porcentToNextLevel}%` }}>
                    {currentExperience}xp
                </span>
            </div>
            <span>{experiencetoNextLevel} xp</span>
        </header>
    );
}