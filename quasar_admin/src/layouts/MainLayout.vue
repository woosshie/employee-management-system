<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <HeaderMenu :toggleLeftDrawer="toggleLeftDrawer" />
    </q-header>

    <SidebarMenu />

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import HeaderMenu from 'components/HeaderMenu.vue'
import SidebarMenu from 'components/SidebarMenu.vue'

import {ref} from 'vue'

export default {
  components: {
    HeaderMenu,
    SidebarMenu
  },

  setup() {
    const leftDrawerOpen  = ref(false)

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    return {
      toggleLeftDrawer,
      leftDrawerOpen
    }
  }
}
</script>