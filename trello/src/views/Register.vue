<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>注册 Trello</h1>
        <form id="login-form" method="POST">
          <div>
            <label>
              <input
                v-model="user.name"
                class="form-field"
                autofocus="autofocus"
                placeholder="输入用户名"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                v-model="user.password"
                type="password"
                class="form-field"
                placeholder="输入密码"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                v-model="user.rePassword"
                type="password"
                class="form-field"
                placeholder="再次确认密码"
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              class="btn btn-success"
              value="注册"
              @click.prevent="submit"
            />
            <span class="signin-signup-separator">或者</span>
            <router-link
              v-slot="{ navigate }"
              custom
              :to="{ name: 'Login' }"
              replace
            >
              <input type="button" class="btn" value="登录" @click="navigate" />
            </router-link>
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
      user: {
        name: '',
        password: '',
        rePassword: ''
      }
    }
  },
  methods: {
    async submit() {
      const { name, password, rePassword } = this.user
      if (!name.trim() || !password.trim() || !rePassword.trim()) {
        return this.$message.error('用户名或密码不能为空')
      }

      if (password !== rePassword) {
        return this.$message.error('密码与确认密码不一致')
      }

      try {
        await this.$store.dispatch('user/register', { ...this.user })
        this.$router.push('/login')
      } catch {}
    }
  }
}
</script>
