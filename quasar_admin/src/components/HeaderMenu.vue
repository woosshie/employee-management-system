<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      round
      @click="toggleLeftDrawer"
      icon="menu"
      aria-label="Menu"
    />
    <q-toolbar-title>
      IT Inventory Management System
    </q-toolbar-title>
    <q-space/>
    <div class="q-gutter-sm row items-center no-wrap">
      <q-btn round dense flat color="white" :icon="quasarInstance.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
             @click="quasarInstance.fullscreen.toggle()"
             v-if="$q.screen.gt.sm">
      </q-btn>

      <q-btn round dense flat color="white" icon="notifications">
        <q-badge color="red" text-color="white" floating>
          5
        </q-badge>
        <q-menu>
          <q-list style="min-width: 100px">
            <messages></messages>
            <q-card class="text-center no-shadow no-border">
              <q-btn label="View All" style="max-width: 120px !important;" flat dense
                     class="text-indigo-8"></q-btn>
            </q-card>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn round flat  v-if="authStore.isAuthenticated">
        <q-avatar size="26px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </q-btn>

      <!-- 아바타 메뉴 -->
      <q-menu v-model="menu" anchor="top right" self="top right">
        <q-list style="min-width: 150px">
          <q-item clickable @click="goToProfile">
            <q-item-section>
              <q-item-label>User: {{ authStore.user?.username }}</q-item-label>
              <q-item-label caption>{{ authStore.user?.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple @click="logout">
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>

    </div>
  </q-toolbar>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import Messages from "../layouts/Messages.vue";

export default {
  props: {
    toggleLeftDrawer: {
      type: Function,
      required: true
    }
  },
  components: {
    Messages
  },
  setup(props) {
    const menu = ref(false) // 메뉴의 열림/닫힘 상태를 관리하는 변수
    const authStore = useAuthStore()
    const router = useRouter()
    const quasarInstance = useQuasar()

    const toggleMenu = () => {
      menu.value = !menu.value // 아바타 클릭 시 메뉴를 토글
    }

    const logout = () => {
      authStore.logout()
      router.push('/login')
    }

    const goToProfile = () => {
      menu.value = false // 메뉴 닫기
      router.push('/Profile') // Profile 페이지로 이동
    }

    return {
      menu,
      authStore,
      toggleMenu,
      logout,
      goToProfile,
      quasarInstance
    }
  },

  props: {
    toggleLeftDrawer: Function
  }
}
</script>