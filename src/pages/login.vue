<template>
  <h1>Sign In</h1>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="userForm.email"
        label="Email Id  *"
        hint="Email Id "
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        v-model="userForm.password"
        label="Password *"
        hint="Password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <div class="q-pa-md">
        <q-btn
          no-caps
          unelevated
          color="positive"
          @click="handleLogin"
          label="LOGIN"
        ></q-btn>
      </div>
      <!-- <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div> -->
    </q-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["doLogin"]),
    async handleLogin() {
      if (!this.userForm.email || !this.userForm.password) {
        console.log("yes");
      } else if (this.userForm.length < 6) {
        console.log("mo");
      } else {
        try {
          await this.doLogin(this.userForm);
          const toPath = this.$route.query.to || "/";
          this.$router.push(toPath);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
