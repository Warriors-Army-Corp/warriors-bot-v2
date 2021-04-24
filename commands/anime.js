// Importation des modules requis
const {
    MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch');

// Requête d'informations des animes
exports.cmd = async (client, msg, args) => {
    var resp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${args}`, {
        method: 'get',
        headers: {
            'If-None-Match': 'ETag'
        },
    }).then(res => res.json()).catch();

    // Fonction de classification des limites d'âges
    function Genre() {
        if (resp.results[0].rated === "Rx") {
            return ("18+")
        } else if (resp.results[0].rated === "R") {
            return ("17+")
        } else if (resp.results[0].rated === "R17") {
            return ("17+")
        } else if (resp.results[0].rated === "PG13") {
            return ("13+")
        } else if (resp.results[0].rated === "PG") {
            return ("11+")
        } else {
            return ("10+")
        }
    }

    // Fonction d'avertissement NSFW
    function NSFWContent() {
        if (resp.results[0].rated === "Rx") {
            return ("Oui")
        } else if (resp.results[0].rated === "R") {
            return ("Non")
        } else {
            return ("Non")
        }
    }
    // Si la commande a un argument (anime)
    if (resp.results) {
        // Notre embed
        let AnimeEmbed = new MessageEmbed({
            "title": `**ANIME**`,
            "description": `
    Nom : ${resp.results[0].title}
    Type : ${resp.results[0].type} (Age : ${Genre()} NSFW : ${NSFWContent()})\n
    Nombre d'épisodes : ${resp.results[0].episodes}
    Score : ${resp.results[0].score}/10\n
    Synopsis : ${resp.results[0].synopsis}
    Plus d'informations sur cet anime [ici](${resp.results[0].url})\n
    *L'anime n'est pas celui que vous cherchez ? Recherchez-le [ici](https://jikan.moe/?ref=apilist.fun)*`,
            "thumbnail": {
                "url": `${resp.results[0].image_url}`
            },
            "footer": {
                "text": `Co-développée avec Osiris`
            }

        });
        msg.channel.send(AnimeEmbed)
    // Si la commande n'a pas d'argument
    } else {
        msg.channel.send("Le nom de l'anime n'est pas valide, n'est pas spécifié, ou n'est pas inclus dans la base de données. Vérifiez son orthographe et réessayez.")
    }
}

exports.help = {
    perm: "SEND_MESSAGES",
    cmd: "anime",
    args: "[Nom d'anime]",
    desc: "Affiche les informations sur un anime specifié, ou de celui dont le nom se rapproche le plus.",
    categ: "UTILITY",
    author: "Mizari & Osiris"
}
