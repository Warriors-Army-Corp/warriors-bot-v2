/*
 * author Mizari (Mizari-W)
 */

 // importation des packages dont on a besoin
 const tempy = require('tempy');
 const QrCode = require('qrcode-reader');
 const Jimp = require("jimp");
 const fetch = require('node-fetch');
 // importation des fonctions dont on a besoin
 const getLink = require('../../fonctions/getLink.js');
 const download = require('../../fonctions/download.js');

module.exports = {
  name: "qrcode",
  description: "Make or read a QR code",
  options: [
    {
      name: "create",
      description: "Make a QR code",
      type: "SUB_COMMAND",
      options: [
        {
          name: "message",
          description: "The message to put in QR code",
          type: "STRING",
          required: true
        }
      ]
    },
    {
      name: "read",
      description: "Read a QR code",
      type: "SUB_COMMAND",
      options: [
        {
          name: "url",
          description: "The URL of the QR code image",
          type: "STRING",
          required: true
        }
      ]
    }
  ],
  type: 'CHAT_INPUT',
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    // si la commande c'est "create"
    if (args[0] === "create"){
      // création du QR code (trop dur mdr)
      interaction.followUp({ content: "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl="+args[1].replace(/ +/g, "%20") });
    // sinon (du coup c'est "read")
    } else {
      // petite fonction des familles pour chopper une url
      args.shift();
      const link = getLink({attachments: []}, args);

      // si on a réussi à chopper l'url
      if (link !== null) {
        // on prépare un fichier dans le dossier tmp
        const output = await tempy.file({extension: 'png'});

        // on télécharge l'image de l'url qu'on a choppé
        const check = await download(link, output);
        // on vérifie que c t bien une image
        if (check) {
          // on lit le contenu de l'image
          Jimp.read(output, (err, img) => {
            // gestion d'erreur
            if (err) {
              interaction.followUp({ content: "Quelque chose s'est mal passé 🤔"});
              return;
            }

            // on prépare le scan
            const qr = new QrCode();
            // on dit ce qu'on doit faire quand on scan
            qr.callback = function(err, value){
              // gestion d'erreur
              if (err) {
                interaction.followUp({ content: "Je n'ai pas pu décoder votre image :/" });
                return;
              }

              // si le scan se passe bien on affiche le résultat tout simplement
              interaction.followUp({ content: value.result });
            }
            // gestion d'erreur
            try {
              // on scan l'image
              qr.decode(img.bitmap);
            } catch (e) {
              msg.channel.send("Le lien n'est pas une image.");
            }
          });
        // gestion des cas où l'utilisateur fait nimp'
        }else {
          interaction.followUp({ content: "Il me faut un lien valide svp." });
        }
      }else {
        interaction.followUp({ content: "Il me faut le lien d'une image svp." });
      }
    }
  }
}
