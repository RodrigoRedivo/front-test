<template>
  <div class="container">
    <h1>Consultar CNPJ</h1>

    <input
      v-model="cnpj"
      type="text"
      placeholder="Consulte seu CNPJ"
      v-mask="'##.###.###/####-##'"
    />

    <button @click="buscar(cnpj)" class="bd">Buscar</button>

    <div v-if="error" class="error">
      <h3>
        Infelizmente não foi possível realizar a sua consulta, tente novamente
        com um <strong>CNPJ</strong> válido!
      </h3>
    </div>

    <div v-if="carregando" id="load"></div>

    <div v-if="pesquisas" class="bd search">
      <h3>Ultimas Buscas</h3>
      <nav>
        <a
          href="javascript:void(0);"
          v-for="_cnpj in Array.from(pesquisas)"
          :key="_cnpj"
          @click="buscar(_cnpj)"
        >
          {{ _cnpj }}
        </a>
      </nav>
    </div>

    <div v-if="empresa" class="dados">
      <h4>Dados do CNPJ</h4>
      <table>
        <tbody>
          <tr v-for="campo in Object.keys(empresa)" :key="campo">
            <th>{{ campo }}</th>
            <td>{{ empresa[campo] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LocalStorageHelper from "../helpers/index.js";

const PESQUISA_KEY = "resultados_busca";

export default {
  name: "Page",
  props: {},
  data() {
    const pesquisas_salvas = LocalStorageHelper.getItem(PESQUISA_KEY);
    const pesquisas = pesquisas_salvas ? new Set(pesquisas_salvas) : new Set();
    const cnpj = "";
    const empresa = null;
    const carregando = false;
    const error = false;

    /* DADOS MOCKADOS
    const pesquisas_salvas = [
      "127.783.117/0001-02",
      "127.783.117/0001-22",
      "127.783.117/0011-02",
    ];
    const pesquisas = pesquisas_salvas ? new Set(pesquisas_salvas) : new Set();
    const cnpj = "";
    const empresa = { "Razão Social": "Linkedin", Endereço: "rua do senado" };
    const carregando = true;
    const error = true;
    */

    return {
      cnpj,
      empresa,
      carregando,
      pesquisas,
      pesquisas_salvas,
      error,
    };
  },
  methods: {
    salvarBusca() {
      this.pesquisas.add(this.cnpj);
      LocalStorageHelper.setItem(PESQUISA_KEY, Array.from(this.pesquisas));
    },

    async buscar(cnpj) {
      if (cnpj) {
        this.carregando = true;
        this.empresa = null;
        this.error = false;

        try {
          const cnpj_limpo = cnpj.replace(/(\.|\/|\-)+/g, "");
          const result = await fetch(
            `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj_limpo}`
          );
          const json = await result.json();

          if (json.error) {
            this.error = true;
            return;
          }

          if (json) {
            this.empresa = json;
            this.salvarBusca();
          }
        } catch (e) {
          this.error = true;
          throw e;
        } finally {
          this.carregando = false;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding: 2rem;
  height: 100vh;
  width: 100%;

  h1 {
    font-size: 72px;
    padding: 2rem;
    color: #f9f9f9;
  }

  input {
    width: 500px;
    padding: 1px 16px;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    letter-spacing: 1.4px;
    font-size: 24px;
    border-radius: 4px 0px 0px 4px;
    text-align: center;
  }

  input:focus {
    border: 0 none;
    outline: 0;
  }

  button {
    position: relative;
    display: inline-block;
    padding: 1px 16px;
    background: #ff2562;
    color: #f1f1ff;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 1.4px;
    border-radius: 0px 4px 4px 0px;
  }

  button:hover {
    transition-delay: 0.5s;
    color: #fff;
    box-shadow: 0 0 10px #ff2562, 0 0 10px #ff2562, 0 0 20px #ff2562,
      0 0 40px #ff2562, 0 0 80px #ff2562;
  }

  .error {
    margin: 20px;
    color: #ff2562;

    h3 {
      font-size: 24px;
      margin: 40px 0 0;
      font-weight: 400;

      strong {
        color: #a9a9a9;
      }
    }
  }

  #load {
    width: 60px;
    height: 60px;

    margin: 40px auto;

    border: rgba(0, 0, 0, 0.18) solid;
    border-left-color: #ff2562;
    border-radius: 50%;

    animation: loading 1.2s linear infinite;

    @keyframes loading {
      to {
        transform: rotate(360deg);
      }
    }
  }

  .dados {
    width: 50vw;
    margin: 50px auto;

    h4 {
      font-size: 36px;
      margin: 10px 0 30px;
      color: #f9f9f9;
    }

    table {
      border-collapse: collapse;
      margin: 0px auto;

      th,
      td {
        color: #f9f9f9;
        padding: 15px;
      }

      th {
        background-color: #111111;
        color: #ff2562;
        font-size: 24px;
        font-weight: 700;
      }

      td {
        font-size: 16px;
        color: #c9c9c9;
      }
    }
  }

  .search {
    border: 1px solid #f9f9f9;
    width: 50%;
    margin: 20px auto;

    h3 {
      font-size: 36px;
      margin: 30px 0 30px;
      color: #f9f9f9;
    }

    nav {
      margin: 10px;

      a {
        color: #ff2562;
        display: block;
        text-decoration: none;
        padding: 10px;
      }
    }
  }
}

@media only screen and (max-width: 500px) {
  .container {
    h1 {
      font-size: 48px;
      padding: 2rem;
      color: #f9f9f9;
    }

    input {
      width: 250px;
      font-size: 16px;
    }

    button {
      margin: 10px;
    }

    .dados {
      width: 50vw;
      margin: 0 auto;

      h4 {
        font-size: 36px;
        margin: 10px 0 30px;
      }

      table,
      th,
      tr,
      td {
        width: 50vw;
        display: flex;
        flex-direction: column;
        font-size: 16px;
        text-align: center;
      }
    }
  }
}
</style>
