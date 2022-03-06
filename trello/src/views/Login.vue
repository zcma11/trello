<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>登录到 Trello</h1>
        <form id="register-form" method="POST">
          <div>
            <label>
              <input
                v-model="username"
                class="form-field"
                autofocus="autofocus"
                placeholder="输入用户名"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                v-model="password"
                type="password"
                class="form-field"
                placeholder="输入密码"
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              class="btn btn-success"
              value="登录"
              @click.prevent="submit"
            />
            <span class="signin-signup-separator">或者</span>
            <input
              type="button"
              class="btn"
              value="注册"
              @click="switchRegister"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async submit() {
      if (!this.username.trim() || !this.password.trim()) {
        return this.$message.error('用户名或密码不能为空')
      }

      try {
        await this.$store.dispatch('user/login', {
          name: this.username,
          password: this.password
        })
        this.$router.push({ name: 'Home' })
      } catch (e) {
        console.log(e)
      }
    },
    switchRegister() {
      this.$router.replace('/register')
    }
  }
}
</script>
