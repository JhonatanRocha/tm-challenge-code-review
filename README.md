Teste Code review e Funcional:

Um desenvolvedor com pouca experiência começou a criar a API, porém não seguiu boas práticas de design de código e arquitetura.

Usando sua experiência em desenvolvimento de software, patterns de code design, faça um Code Review completo. Leve em conta que essa API irá crescer bastante, terá muitos contribuidores e precisa ter uma boa manutenibilidade. Sinta-se à vontade para criticar, modificar e melhorar o código.

Realize um Fork do projeto e abra uma PR própria em seu fork com a review.


# Weather API

Esta API fornece informações meteorológicas com base em nomes de cidades. 

NotEla utiliza um serviço de geocodificação para obter as coordenadas geográficas da cidade e, em seguida, consulta uma API de clima para obter os dados meteorológicos.

###### Observações durante o desenvolvimento:
* Ao ajustar os erros iniciais de compilação, reparei que a
[API meteorológica](https://www.api-ninjas.com/api/weather)
que é consumida pelo serviço, o metodo de consulta por nome de cidade é só pra quem é **premium**.
Talvez eles tenham atualizado isso recentemente sem o conhecimento de vocês, porém vi que a consulta por **Latitude** e **Longitude** continua **gratuito**. Dando uma navegada nas APIs que eles fornecem, achei uma API de Geolocalização que devolve o Latitude e Longitude com base no nome da cidade (também gratuito). Resolvi criar uma segunda integração, para conseguir consultar a previsão do tempo, com base na latitude e longitude.
Não sei se esse era o intuito do desafio, mas ainda assim. Foi possível contornar esse problema da licensa não ser premium.

* Eu tomei a liberdade de adicionar no projeto o modulo ```nestjs/config``` e criei um arquivo ```.env``` para colocar a chave da API lá.(O ideal seria colocar em uma **Secret Manager**). Já pensando em suportar configurações de ambiente de Prod , dev e local.

* Tentei evitar adicionar uma Lib de Logs, ou de criar um logger na mão, optei por usar o ```console.log``` mesmo

* Tomei a liberdade de adicionar uma collection do Postman no projeto. (Sei que isso não é uma boa pratica e muito menos pensando na parte de segurança, mas é só pra deixar mais fácil caso precise testar.) 


* Não fiz teste unitários e integrado. (Acredito que ia levar mais tempo, não sei se essa seria a proposta do desafio também) 


### Por nome da cidade:

Obtém informações meteorológicas para uma única cidade.

**Exemplo de uso com `cUrl`:**
```
curl --location 'http://localhost:3001/weather/city/São Paulo' \
--header 'Content-Type: application/json'
```

**Exemplo de uso de uma cidade inexistente com `cUrl`:**
```
curl --location 'http://localhost:3001/weather/city/Orgrimmar' \
--header 'Content-Type: application/json'
```

### Média da temperatura da cidade (Em graus Celcius ºC):

Obtém a média da temperatura (min e max) da cidade.

**Exemplo de uso com `cUrl`:**
```
curl --location 'http://localhost:3001/weather/average/São Paulo' \
--header 'Content-Type: application/json'
```

### Por nome de várias cidades:

Obtém informações meteorológicas para várias cidades.

**Exemplo de uso com `cUrl`:**
```
curl --location 'http://localhost:3001/weather/cities/' \
--header 'Content-Type: application/json' \
--data '[ "Sao Paulo", "Orgrimmar", "Londres", "Boston" ]'
```
**OBS:** *Note há uma cidade no payload que não existe. A API deve retornar os 3 resultados apenas.*   
