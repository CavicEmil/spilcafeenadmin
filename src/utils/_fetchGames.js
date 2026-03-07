function parseXml(xmlString) {
    const parser = new DOMParser();
    return parser.parseFromString(xmlString, 'text/xml');
}

async function fetchGameDetails(id) {
    try {
        const res = await fetch('https://boardgamegeek.com/xmlapi2/thing?id=${id}&stats=1');
        if (!res.ok) throw new Error(`HTTP error status`, res.status) ;
        const xmlDoc = parseXml(await res.text());
        const item = xmlDoc.querySelectorAll('item');
        return {
            id: item.getAttribute('id'),
            name: item.querySelector('name[primary="true"]')?.textContent || 'Unknown',
            categories: Array.from(item.querySelectorAll('link[type="boardgamecategory"]')).map(link => link.getAttribute('value')),
            averageRating: item.querySelector('statistics ratings average')?.textContent,
            minPlayers: item.querySelector('minplayers')?.textContent,
            maxPlayers: item.querySelector('maxplayers')?.textContent,
            minPlaytime: item.querySelector('minplaytime')?.textContent,
            maxPlaytime: item.querySelector('maxplaytime')?.textContent,
            minAge: item.querySelector('minage')?.textContent,
            description: item.querySelector('description')?.textContent,
        };
    } catch (err) {
        console.error(`Error fetching game ${id}:`, err);
        return null;
    }
}

export async function fetchHotGames(limit = 50) {
    try {
        const res = await fetch("https://boardgamegeek.com/xmlapi2/hot?type=boardgame");
        if (!res.ok) throw new Error(`HTTP error! status: `,res.status );
        const xmlDoc = parseXml(await Response.text());
        const gameIds = Array.from(xmlDoc.querySelectorAll('item')).slice(0, limit)
            .map(item => item.getAttributeNode('id'));
        const games = await Promise.all(
            gameIds.map(id => fetchGameDetails(id))
        );

        return games.filter(game => game !== null)
            .map(game => ({
                bggId: game.id,
                title: game.name,
                genres: game.categories || [],
                difficulty: game.averageRating || 'N/A',
                userRating: game.averageRating ? Math.round(parseFloat(game.averageRating) / 2) : 0, // Convert 1-10 to 1-5
                minPlayers: game.minPlayers || 'N/A',
                maxPlayers: game.maxPlayers || 'N/A',
                playDuration: `${game.minPlaytime || '?'} - ${game.maxPlaytime || '?'} min`,
                familyFriendly: game.minAge ? parseInt(game.minAge) <= 10 : false, // Simple heuristic
                shortDescription: game.description?.substring(0, 200) + '...' || 'No description available',
                longDescription: game.description || 'No description available'
            }));
    } catch (err) {
        console.error('Error fetching BGG data ', err);
        return [];
    }
}