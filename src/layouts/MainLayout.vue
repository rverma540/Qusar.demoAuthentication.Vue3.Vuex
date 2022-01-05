<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> DASHBOARD </q-toolbar-title>
        <!-- <q-btn to="/login" v-if="!isAuthenticated">Login</q-btn> -->

        <q-icon name="logout" @click="toggleLogout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 100px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-item clickable v-ripple to="/main">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section> Dashboard </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/student">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>

          <q-item-section> Student </q-item-section>
        </q-item>

        <q-item active clickable v-ripple to="/subject">
          <q-item-section avatar>
            <q-icon name="subject" />
          </q-item-section>

          <q-item-section> Subject List </q-item-section>
        </q-item>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Rahul Kumar Verma</div>
          <div>@rverma540</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "MainLayout",

  components: {},
  methods: {
    toggleLogout() {
      alert("--------hey rahul");
      this.$store.dispatch("auth/signOut");
      localStorage.removeItem("token");
      this.$router.push("/LoginIn?login");
      setTimeout(function () {
                location.reload(true);
              }, 1);
     

    },
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
