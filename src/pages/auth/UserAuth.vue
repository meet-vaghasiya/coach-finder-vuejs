<template>
  <div>
    <base-dialog :show="!!error" title="An erorr occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating" fixed>
      <base-spinner></base-spinner>
    </base-dialog>

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
      BaseSpinneremail: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: '',
      email: ''
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

    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;

      // const actionPayload = {
      //   email: this.email,
      //   password: this.password
      // };
      // you can use payload  to dispatch loagin and signup method to remove duplication of code

      try {
        if (this.mode == 'login') {
          console.log('hello world');
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          });
        } else {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password
          });
        }
const redirectUrl =  '/'+( this.$route.query.redirect || 'coaches')

        // this.$router.replace('/coaches')
        this.$router.replace(redirectUrl) // we have to login button , and we want seprate redirection so we added query params in one and make dynamic redirection 
      } catch (error) {
        this.error = error || 'Failed to auth,try later';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
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
