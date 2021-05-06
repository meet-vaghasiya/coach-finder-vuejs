<template>
  <div>
    <base-card>
      <form action="" @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" name="" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          please enter valid email and password(password must be atleast 6
          character)
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="swithAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
        <!-- <base-button>sfdas</base-button>
        <base-button type="button" mode="flat" @click="swithAuthMode"
          >dfdfsdf</base-button
        > -->
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login'
    };
  },
  methods: {
    swithAuthMode() {
      if (this.mode == 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },

    submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      if (this.mode == 'login') {
        console.log('hello world');
      } else {
        this.$store.dispatch('signup', {
          email: this.email,
          password: this.password
        });
      }
    }
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup Instead';
      } else {
        return 'Login Instead';
      }
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
