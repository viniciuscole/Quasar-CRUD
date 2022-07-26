<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> UFES - CURSOS </q-toolbar-title>

        <div><img src="../assets/logo.png" alt="UFES-LOGO"></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="drawer">
      <q-list>
        <q-item-label header> Menus </q-item-label>

        <EssentialLink 
          style="color: whitesmoke"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="footer">
      <q-toolbar>
        <span class="title">
            Universidade Federal do Espírito Santo
            <span class="sub-title">
                <span>
                    <img class="f-icon" src="../assets/fonte-de-icone-de-marker-gratis.png" alt="icone-localização">
                    Av. Fernando Ferrari, 514 - Goiabeiras, Vitória - ES, 29075-910
                </span>
            </span>
        </span>
        <q-space/>
        <span class="title">
            Contatos
            <span class="sub-title">
                <span>
                    <img class="f-icon" src="../assets/fonte-de-icone-de-phone-call-gratis.png" alt="icone-telefone">
                    (27) 4009-2222
                </span>
                <span>
                    <img class="f-icon" src="../assets/fonte-de-icone-de-facebook-gratis.png" alt="icone-facebook">
                    <a href="https://pt-br.facebook.com/ufesoficial/" target="_blank">  facebook.com/ufesoficial</a>
                </span>
                <span>
                    <img class="f-icon" src="../assets/fonte-de-icone-de-youtube-gratis.png" alt="icone-youtube">
                    <a href="https://www.youtube.com/ufesoficial" target="_blank">  youtube.com/ufesoficial</a>
                </span>
            </span>
        </span>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",
    caption: "",
    icon: "home",
    route: { name: "home" },
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style>
  .header, .menu{
    background-color: rgba(0, 0, 46, 0.979);
  }
  .drawer{
    background-color: rgb(0, 0, 29);
  }
  .header img{
    height: 40px;
  }
  .footer{
    padding: 25px 0px;
    background-color: rgba(0, 0, 46, 0.979);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 100px;
    color: whitesmoke;
    align-items: center;
  }
  .title{
    display: block;
    font-size: 16px;
    text-align: center;
  }
  a{
    text-decoration: none;
    color: whitesmoke;
  }
  .sub-title{
    text-align: left;
    display: flex;
    flex-direction: column;
  }
  .f-icon{
    height: 15px;
  }
</style>
