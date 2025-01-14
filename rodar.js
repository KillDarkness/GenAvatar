const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Caminho da pasta onde as imagens estão
const pastaOriginal = './avatars';
const pastaGiradas = './Giradas';

// Cria a pasta "Giradas" se ela não existir
if (!fs.existsSync(pastaGiradas)) {
  fs.mkdirSync(pastaGiradas);
}

// Função para girar as imagens horizontalmente
function girarImagem(imagem) {
  const caminhoImagemOriginal = path.join(pastaOriginal, imagem);
  const caminhoImagemGirada = path.join(pastaGiradas, imagem);

  // Usando sharp para girar a imagem
  sharp(caminhoImagemOriginal)
    .flop() // Gira a imagem horizontalmente
    .toFile(caminhoImagemGirada, (err, info) => {
      if (err) {
        console.error('Erro ao processar a imagem', imagem, err);
      } else {
        console.log(`Imagem girada e salva: ${imagem}`);
      }
    });
}

// Lê todos os arquivos na pasta de imagens
fs.readdir(pastaOriginal, (err, files) => {
  if (err) {
    console.error('Erro ao ler a pasta de imagens', err);
    return;
  }

  // Filtra as imagens (por exemplo, jpg, png)
  files.filter(file => /\.(jpg|jpeg|png)$/i.test(file)).forEach(girarImagem);
});
