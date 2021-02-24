import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){
    const hasActiveChallenge = true;

    return(
        <div className={styles.challengeBoxContainer}>
            {hasActiveChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400 px</header>
                    <main>
                        <img src="icons/body.svg" />
                        <strong>Novo desafio</strong>
                        <p>Levante e se alonge</p>
                    </main>
                    <footer>
                        <button type="button"
                                className={styles.challengeFailedButton}
                                >Falhei</button>
                        <button type="button"
                                className={styles.challengeSuccededButton}
                                >Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios.
                    </p>
                </div>
            )}
        </div>
    )
}