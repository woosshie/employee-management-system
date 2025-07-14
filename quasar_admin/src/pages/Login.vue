<template>
  <q-layout>
    <q-page-container>
    <q-page class="flex flex-center">
      <q-card class="q-pa-xl" style="max-width: 400px;">
        <div class="text-h6 q-mb-md">Welcome Back</div>
        <!-- <q-form @submit="onSubmit" @reset="onReset"> -->
          <q-form @submit="onSubmit">
        <q-input
          v-model="email"
          label="Email"
          type="email"
          :rules="[val => !!val || 'Email is required']"
          class="q-mb-md"
          dense
          outlined
          autofocus
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          :rules="[val => !!val || 'Password is required']"
          class="q-mb-md"
          dense
          outlined
        />
        <q-btn
          label="Login"
          type="submit"
          color="primary"
          class="full-width q-mb-sm"
        />
        <!-- <q-btn
          label="Reset"
          type="reset"
          flat
          color="primary"
          class="full-width"
        /> -->
      </q-form>

      <!-- 회원가입 버튼 -->
      <q-btn
        label="Sign Up"
        flat
        color="secondary"
        class="full-width "
        @click="openSignUpModal"
      />
    </q-card>

    <!-- Sign Up 모달 -->
    <q-dialog v-model="showSignUpModal">
      <q-card style="min-width: 350px;">
        <q-card-section>
          <div class="text-h6 q-mb-md">Create Your Account</div>
          <q-form @submit="onRegister">
            <q-input
              v-model="newUser.email"
              label="Email"
              type="email"
              :rules="[val => !!val || 'Email is required']"
              class="q-mb-md"
              dense
              outlined
            />
            <q-input
              v-model="newUser.username"
              label="Username"
              type="text"
              :rules="[val => !!val || 'Username is required']"
              class="q-mb-md"
              dense
              outlined
            />
            <q-input
              v-model="newUser.password"
              label="Password"
              type="password"
              :rules="[val => !!val || 'Password is required']"
              class="q-mb-md"
              dense
              outlined
            />
            <q-input
              v-model="newUser.confirmPassword"
              label="Confirm Password"
              type="password"
              :rules="[val => val === newUser.password || 'Passwords do not match']"
              class="q-mb-md"
              dense
              outlined
            />
            <q-btn
              label="Register"
              type="submit"
              color="primary"
              class="full-width q-mb-sm"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="closeSignUpModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import { ref, onMounted  } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { apiMethods } from 'boot/axios' // API 메서드 임포트
import { useAuthStore } from 'stores/auth'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter() // 라우터 사용
    const $q = useQuasar() // Quasar 인스턴스 사용
    const authStore = useAuthStore() // Pinia 스토어 사용
    const showSignUpModal = ref(false) // 회원가입 모드인지 여부를 관리
    const newUser = ref({
      email: '',
      password: '',
      username: '',
      confirmPassword: ''
    })


    onMounted(() => {
      // 이미 로그인된 상태라면 대시보드로 리디렉션
      if (authStore.isAuthenticated) {
        router.push('/')
      }
    })

    const onSubmit = async () => {
      try {
        const credentials = {
          email: email.value.trim(),
          password: password.value.trim()
        }
        const response = await apiMethods.login(credentials)
        // Pinia 스토어에 로그인 상태 저장
        authStore.login(response.data.user, response.data.token)

        // 로그인 성공 시, 사용자 정보를 로컬 스토리지에 저장하고 대시보드로 리디렉션
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token) // 토큰 저장
        router.push('/') // 대시보드로 리디렉션
      } catch (error) {
        console.error('Login failed:', error)
        // 오류 처리 로직 추가 (예: 사용자에게 오류 메시지 표시)
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Login failed: Invalid email or password please check the user information and try it again',
          icon: 'warning'
        })
      }
    }

    const onRegister = async () => {
      // 회원가입 처리 로직 ()
      console.log('Registering new user:', newUser.value)
      if (newUser.value.password !== newUser.value.confirmPassword) {
        alert('Passwords do not match')
        return
      }

      try {
        const response = await apiMethods.register({
          email: newUser.value.email,
          username: newUser.value.username,
          password: newUser.value.password
        })

        alert(response.data.message)
                // 회원가입 후 자동 로그인 처리
          const loginResponse = await apiMethods.login({
          email: newUser.value.email,
          password: newUser.value.password
        })

        authStore.login(loginResponse.data.user, loginResponse.data.token)

        router.push('/') // 메인 페이지로 리디렉션

        closeSignUpModal()
      } catch (error) {
        console.error('Registration failed:', error)
        if (error.response) {
          console.error('Server responded with:', error.response.data.message)
        }
      }
    }

    const openSignUpModal = () => {
      showSignUpModal.value = true
    }

    const closeSignUpModal = () => {
      showSignUpModal.value = false
      newUser.value = { email: '', username: '', password: '', confirmPassword: '' }
    }

    // const onReset = () => {
    //   email.value = ''
    //   password.value = ''
    // }

    return {
      email,
      password,
      showSignUpModal,
      newUser,
      onSubmit,
      onRegister,
      openSignUpModal,
      closeSignUpModal
    }
  }
}
</script>

<style scoped>
.q-page {
  background-color: #f5f5f5;
}
</style>