
import games from '../data/gamedata.json';

export async function loadGamesFromJson() {
    try {
        localStorage.setItem('boardGames', JSON.stringify(games));
        return games;
    } catch (error) {
        console.error('Error loading games:', error);
        return [];
    }
}