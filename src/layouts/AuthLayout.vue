<template>
  <div class="app-container" :class="isSidebarOpen ? 'sidebar-open' : 'sidebar-close'">
    <Navbar></Navbar>
    <div class="body-container">
      <Sidebar
        :sidebarItems="SidebarItems"
        @notVisible="sidebarVisible = false"
        @visible="sidebarVisible = true"
      ></Sidebar>
      <div class="main-container" :class="sidebarVisible ? '' : 'pl-0'">
        <div class="relative">
          <RouterView />
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/navigation/Sidebar.vue';
import Navbar from '@/components/navigation/Navbar.vue';
import Footer from '@/components/navigation/Footer.vue';
import { useSidebarItems } from '@/utils/setup/SidebarItems';
import { useSidebar } from '@/stores/App/App';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

const SidebarItems = computed(() => useSidebarItems());
const sidebarStore = useSidebar();
const { isSidebarOpen } = storeToRefs(sidebarStore);
const sidebarVisible = ref(true);
</script>
