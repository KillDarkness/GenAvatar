# Avatar Downloader & Rotator

Este projeto contém um conjunto de scripts em **Node.js** para gerar usernames aleatórios para o Minecraft, validar esses usernames com skins, baixar os avatares 3D e girá-los horizontalmente. As imagens geradas são armazenadas na pasta `avatars` e as versões giradas são salvas na pasta `Giradas`.

## Funcionalidade

- **Gerar usernames aleatórios** para o Minecraft.
- **Validar usernames** para verificar se possuem uma skin associada.
- **Baixar avatares 3D** de usuários válidos com skins.
- **Girar as imagens** de avatares horizontalmente e armazenar as versões giradas em uma subpasta `Giradas`.

## Pré-requisitos

Antes de rodar os scripts, você precisa garantir que tenha o **Node.js** instalado. Se ainda não tiver o Node.js, você pode instalá-lo [aqui](https://nodejs.org/).

Além disso, os seguintes pacotes são necessários:

- **axios**: Para fazer requisições HTTP.
- **sharp**: Para manipulação de imagens.

## Como usar

### 1. Clonar o Repositório

Clone este repositório para o seu computador:

```bash
git clone https://github.com/seu-usuario/avatar-downloader-rotator.git
```

### 2. Instalar Dependências

Acesse o diretório do projeto e instale as dependências com o seguinte comando:

```bash
npm install
```

### 3. Rodar o Script

Para gerar usernames aleatórios, validar os usernames com skins e baixar os avatares, basta rodar o script `script.js`:

```bash
node script.js
```

Após isso, o script irá:
- Gerar 1000 usernames aleatórios.
- Validar cada username verificando se possui uma skin.
- Baixar os avatares dos usuários válidos para a pasta `avatars`.
- Salvar os avatares girados na pasta `Giradas`.

### 4. Gerar as Imagens Giradas

Após os avatares serem baixados, você pode usar o script `rodar.js` para girar todas as imagens da pasta `avatars` e salvá-las na pasta `Giradas`.

Execute o script com o seguinte comando:

```bash
node rodar.js
```

### 5. Visualizar os Resultados

- Os avatares serão salvos na pasta `avatars`.
- As imagens giradas serão salvas na pasta `Giradas`.

## Estrutura de Diretórios

```
avatar-downloader-rotator/
├── avatars/         # Pasta onde os avatares baixados são armazenados
├── Giradas/         # Pasta onde as imagens giradas são salvas
├── usernames.json   # Contém a lista dos 200 usernames válidos com skins
├── script.js        # Script para gerar, validar usernames e baixar avatares
└── rodar.js         # Script para girar as imagens dos avatares
└── package.json     # Dependências do projeto
```

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

### Explicação dos Scripts

#### `script.js`
1. **Gerar Usernames**: O script gera usernames aleatórios usando listas de palavras e sufixos, criando combinações como `DragonX`, `KnightPro`, etc.
2. **Validar Usernames**: Ele faz uma requisição à API da Mojang para verificar se o username existe e possui uma skin associada.
3. **Baixar Avatares**: Para cada username válido, o script baixa o avatar 3D da URL `https://crafatar.com/renders/body/${user.uuid}?overlay&scale=10&rotation=-35`, que já inclui a rotação da imagem.
4. **Salvar em JSON**: Os usernames válidos são salvos em `usernames.json`.

#### `rodar.js`
1. **Girar Imagens**: O script percorre as imagens na pasta `avatars`, gira cada uma horizontalmente e as salva na pasta `Giradas`.