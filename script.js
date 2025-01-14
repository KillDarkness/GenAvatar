const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Lista expandida de palavras para usernames
const words = [
    "Dragon", "Knight", "Wizard", "Shadow", "Pixel", "Craft", "Sky", "Nether", "Ender", "Block", 
    "Mine", "Creeper", "Zombie", "Hero", "Builder", "Digger", "Miner", "Slayer", "Hunter", "Archer",
    "Phoenix", "Storm", "Blaze", "Thunder", "Light", "Dark", "Chaos", "Tiger", "Lion", "Fox", "Eagle", 
    "Bear", "Panda", "Wolf", "Frost", "Fire", "Flame", "Nova", "Void", "Galaxy", "Comet", "Meteor", 
    "Crystal", "Quantum", "Lunar", "Solar", "Echo", "Spirit", "Soul", "Iron", "Steel", "Gold", 
    "Diamond", "Emerald", "Ruby", "Sapphire", "Shadow", "Star", "Astral", "Nebula", "Cosmic", "Hawk", 
    "Falcon", "Volt", "Spark", "Circuit", "Binary", "Cyber", "Code", "Data", "Glitch", "Alpha", 
    "Beta", "Omega", "Legend", "King", "Queen", "Warrior", "Mage", "Paladin", "Rogue", "Priest", 
    "Angel", "Beast", "Ninja", "Samurai", "Demon", "Lord", "Wizard", "Hunter", "Thief", "Heroic", 
    "Astral", "Celestial", "Mystic", "Ethereal", "Astronaut", "Viper", "Blizzard", "Obsidian", "Valkyrie",
    "Titan", "Echo", "Vortex", "Frostbite", "Jade", "Venom", "Abyss", "Vanguard", "Strike", "Nebulon"
];

// Lista de sufixos
const suffixes = ["_", "X", "HD", "YT", "Pro", "MC", "PvP", "Gamer", "King", "Queen", "123", "007", "999", "69", "Elite", "Legend", "Alpha", "Beta", "Omega", "Void", "Storm", "Ghost", "Blaze", "Spark", "Volt"];

// Caminhos para o JSON e pasta de avatares
const jsonPath = path.join(__dirname, 'usernames.json');
const avatarsPath = path.join(__dirname, 'avatars');

// Função para limpar dados antigos
function clearPreviousData() {
    if (fs.existsSync(jsonPath)) fs.unlinkSync(jsonPath);
    // Não limpamos a pasta avatars, apenas adicionamos novos avatares
}

// Função para gerar usernames aleatórios
function generateRandomUsernames(count, existingUsernames) {
    const usernames = [];
    const generatedNames = new Set(existingUsernames); // Set de usernames já existentes (para evitar duplicação)
    while (usernames.length < count) {
        const word = words[Math.floor(Math.random() * words.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const username = `${word}${suffix}`;
        if (!generatedNames.has(username)) {
            usernames.push(username);
            generatedNames.add(username);
        }
    }
    return usernames;
}

// Função para validar usernames e filtrar com skins
async function validateUsernames(usernames) {
    const validUsernames = [];
    for (const username of usernames) {
        try {
            const profileResponse = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
            if (profileResponse.status === 200) {
                const uuid = profileResponse.data.id;
                const skinResponse = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
                const hasSkin = skinResponse.data?.properties?.[0]?.value;
                if (hasSkin) {
                    validUsernames.push({ name: profileResponse.data.name, uuid });
                    if (validUsernames.length >= 200) break; // Para após 200 válidos
                }
            }
        } catch (error) {
            // Ignora usernames inválidos ou sem skin
        }
    }
    return validUsernames;
}

// Função para baixar os avatares 3D
async function downloadAvatars(users) {
    for (const user of users) {
        const avatarPath = path.join(avatarsPath, `${user.name}.png`);
        if (fs.existsSync(avatarPath)) {
            console.log(`Avatar de ${user.name} já foi gerado. Pulando.`);
            continue; // Ignora usuários cujos avatares já foram gerados
        }
        
        try {
            const avatarUrl = `https://crafatar.com/renders/body/${user.uuid}?overlay&scale=10&rotation=-35`; // Avatar girado para a esquerda
            const response = await axios.get(avatarUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(avatarPath, response.data);
            console.log(`Avatar de ${user.name} salvo com sucesso!`);
        } catch (error) {
            console.error(`Erro ao baixar avatar de ${user.name}:`, error.message);
        }
    }
}

// Função principal
(async () => {
    clearPreviousData(); // Limpa dados antigos

    const existingAvatars = fs.readdirSync(avatarsPath).map(file => path.parse(file).name); // Nomes dos avatares existentes
    const randomUsernames = generateRandomUsernames(1000, existingAvatars); // Gera 1000 usernames aleatórios

    const validUsernames = await validateUsernames(randomUsernames); // Valida os usernames e filtra com skins

    fs.writeFileSync(jsonPath, JSON.stringify(validUsernames, null, 2)); // Salva no JSON
    console.log('200 usernames válidos salvos em usernames.json!');

    await downloadAvatars(validUsernames); // Baixa os avatares automaticamente
    console.log('Todos os avatares foram baixados e salvos na pasta avatars!');
})();
