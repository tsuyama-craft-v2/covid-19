<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">CRAFT</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item me-auto">
            <a
            class="nav-link active"
            @click="switchPage('Mainpage')"
            v-bind:class="{ active: current == 'mainpage' }"
            aria-current="page"
            href="#"
            >新型コロナウイルス情報</a
          >
          </li>
          <li class="nav-item me-auto">
            <a
            class="nav-link"
            @click="switchPage('Shisetupage')"
            v-bind:class="{ active: current == 'shisetupage' }"
            >施設情報</a
          >
          </li>
          <li class="nav-item me-auto">
            <a
            class="nav-link"
            @click="switchPage('Helppage')"
            v-bind:class="{ active: current == 'helppage' }"
            >感染の疑いがある方</a
          >
          </li>
        </ul>
        <span class="navbar-text me-2 pe-2">
        Tiếng Việt
      </span>
      </div>
    </div>
  </nav>
  <!--<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">CRAFT</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a
            class="nav-link active me-auto"
            @click="switchPage('Mainpage')"
            v-bind:class="{ active: current == 'mainpage' }"
            aria-current="page"
            href="#"
            >新型コロナウイルス情報</a
          >
          <a
            class="nav-link me-auto"
            @click="switchPage('Shisetupage')"
            v-bind:class="{ active: current == 'shisetupage' }"
            >施設情報</a
          >
          <a
            class="nav-link me-auto"
            @click="switchPage('Helppage')"
            v-bind:class="{ active: current == 'helppage' }"
            >感染の疑いがある方</a
          >
          <a class="nav-link ms-auto" href="#">Tiếng Việt</a>
        </div>
      </div>
    </div>
  </nav>-->
  <!--<nav>
    <ul v-if="judge == 0">
      <li class="main">
        <router-link to="/">新型コロナウイルス最新情報</router-link>
      </li>
      <li><router-link to="/Shisetupage">施設情報</router-link></li>
      <li><router-link to="/Helppage">感染の疑いがある方</router-link></li>
    </ul>
    <ul v-if="judge == 1">
      <li><router-link to="/">新型コロナウイルス最新情報</router-link></li>
      <li class="main">
        <router-link to="/Shisetupage">施設情報</router-link>
      </li>
      <li><router-link to="/Helppage">感染の疑いがある方</router-link></li>
    </ul>
    <ul v-if="judge == 2">
      <li><router-link to="/">新型コロナウイルス最新情報</router-link></li>
      <li><router-link to="/Shisetupage">施設情報</router-link></li>
      <li class="main">
        <router-link to="/Helppage">感染の疑いがある方</router-link>
      </li>
    </ul>
    <router-view />
  </nav>-->
</template>

<script>
export default {
  name: "MainMenu",
  props: {
    judge: {
      type: String,
    },
  },
  methods: {
    switchPage(pageName) {
      this.$router.push({ name: pageName });
    },
  },
};
</script>

<style>
/*

nav {
  border-bottom: 1px solid #ccc;
}
nav ul {
  display: table;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  text-align: center;
}
nav ul li {
  display: table-cell;
  min-width: 50px;
  width: 100px;
  border-right: 1px solid #ccc;
}
@media screen and (min-width: 480px) {
  nav ul li {
    font-size: 1.5rem;
  }
}
nav ul li:first-child {
  border-left: 1px solid #ccc;
}
nav ul li a {
  display: block;
  width: 100%;
  padding: 10px 0;
  text-decoration: none;
  color: #aaa;
}
nav ul li a:hover {
  background-color: #f8e750;
  border-bottom: 5px solid #f8e750;
}
nav ul li.main {
  font-weight: bold;
}
nav ul li.main a {
  border-bottom: 5px solid #00b0f0;
  color: #00b0f0;
}*/
</style>
