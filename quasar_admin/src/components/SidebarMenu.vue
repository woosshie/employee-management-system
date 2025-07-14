<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    class="bg-primary text-white"
  >
    <q-list>
      <q-item to="dashboard2/" active-class="q-item-no-link-highlighting">
        <q-item-section avatar >
          <q-icon name="dashboard2"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
      </q-item>

      <q-expansion-item
        icon="settings"
        label="Setting"
      >
        <q-list class="q-pl-lg">
          <q-item to="/Login" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="email"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Login</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/Lock" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="lock"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Lock Screen</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/Lock-2" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="lock"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Lock Screen - 2</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/Branches" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="card_giftcard"/>
            </q-item-section>
          <q-item-section>
            <q-item-label>Branches</q-item-label>
          </q-item-section>
          </q-item>

          <q-item to="/Departments" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="group"/>
            </q-item-section>
          <q-item-section>
            <q-item-label>Departments</q-item-label>
          </q-item-section>
          </q-item>

          <q-item to="/Desks" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="group"/>
            </q-item-section>
          <q-item-section>
            <q-item-label>Desks</q-item-label>
          </q-item-section>
          </q-item>

          <q-item to="/Purchase" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="shopping_cart"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Purchase</q-item-label>
            </q-item-section>
          </q-item>

          <q-item to="/Setting" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Settings</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Generic -->
          <q-item-label header class="text-weight-bolder text-white">User General</q-item-label>
          <q-item to="/Profile" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="person"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>User Profile</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-expansion-item>

      <!-- 다른 메뉴들... -->

        <q-item to="/directory" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="card_giftcard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Directory</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/TreeTable" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Devices</q-item-label>
          </q-item-section>
        </q-item>


        <q-item to="/EMPTable" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="table_chart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Employees</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Contact" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Contact</q-item-label>
          </q-item-section>
        </q-item>

        <!--not completed-->
        <q-item to="/Calendar" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Calendar</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Checkout" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="check_circle_outline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>To Do</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Reports" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="insert_drive_file"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Documents</q-item-label>
          </q-item-section>
        </q-item>

    </q-list>
  </q-drawer>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>