<template>
  <div class="q-pa-md" style="max-width: 250px">
    <q-list bordered padding class="rounded-borders text-primary">
      <q-item
        clickable
        v-ripple
        v-for="item in items"
        :key="item.id"
        :active="link === item.id"
        @click="link = item.id"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon :name="item.iconName" />
        </q-item-section>

        <q-item-section>{{item.label}}</q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="link === 'settings'"
        @click="link = 'settings'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>

        <q-item-section>Settings</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      link: ref('inbox'),
      items: ref([
        {
          id: 'activities',
          iconName: 'space_dashboard',
          label: 'My Activities'
        },
        {
          id: 'sections',
          iconName: 'school',
          label: 'My Sections'
        }
      ])
    }
  }
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>
