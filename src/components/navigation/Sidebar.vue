<template>
  <div class="sidebar-container" v-hide-scrollbar :class="hasVisibleItems ? '' : 'w-[0px]'">
    <div class="sidebar-items">
      <div v-for="(item, index) in sidebarItems">
        <div
          class="sidebar-header"
          v-if="!item.to && !item.children && (item.isVisible != undefined ? item.isVisible : true)"
        >
          {{ item.label }}
        </div>
        <RouterLink
          :to="item.to"
          v-if="item.to && !item.children && (item.isVisible != undefined ? item.isVisible : true)"
          class="sidebar-default"
          :class="isActive(item) ? 'sidebar-item-active' : ''"
          @click="isActive(item) ? toggleDropdown(-1) : null"
        >
          <div>
            <Icons :name="item.icon" size="20" />
          </div>
          <span>{{ item.label }}</span>
        </RouterLink>
        <div
          v-if="item.children && !item.to && (item.isVisible != undefined ? item.isVisible : true)"
          class="sidebar-dropdown"
          :class="activeDropdown == index ? 'sidebar-item-open' : ''"
        >
          <div class="sidebar-dropdown-header" @click="toggleDropdown(index)">
            <div>
              <Icons :name="item.icon" size="20" />
            </div>
            <span>{{ item.label }}</span>
            <div class="sidebar-chevron">
              <Icons name="ChevronRight" size="14" />
            </div>
          </div>

          <div class="sidebar-dropdown-items" v-animate-dropdown>
            <div class="sidebar-dropdown-item" v-for="(childitem, _) in item.children">
              <RouterLink
                :to="childitem.to"
                :class="isActive(childitem) ? 'sidebar-item-active' : ''"
                v-if="childitem.isVisible != undefined ? childitem.isVisible : true"
              >
                <span>{{ childitem.label }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, type PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { SidebarItem } from '@/dtos/common/Sidebar';

const router = useRouter();

const emit = defineEmits(['toggleSideBar', 'notVisible', 'visible']);

const props = defineProps({
  sidebarItems: {
    type: Array as PropType<SidebarItem[]>,
    required: true,
  },
});

const activeDropdown = ref(-1);

const toggleDropdown = (val: number) => {
  if (activeDropdown.value == val) {
    activeDropdown.value = -1;
  } else {
    activeDropdown.value = val;
  }
};

const isActive = (item: SidebarItem) => {
  if (item.to == router.currentRoute.value.path) {
    return true;
  }
};

const hasVisibleItems = computed(() => {
  const isVisible = props.sidebarItems.some((item) => {
    // check permission for item
    const itemVisible = item.isVisible != undefined ? item.isVisible : true;

    if (!itemVisible) return false;

    // if no children: it is visible
    if (!item.children) return true;

    // if children: check if any child is visible
    return item.children.some((child: any) => (child.isVisible != undefined ? child.isVisible : true));
  });
  if (!isVisible) emit('notVisible');
  else emit('visible');
  return isVisible;
});

onMounted(() => {
  checkDropDown();
});

const checkDropDown = () => {
  if (props.sidebarItems) {
    props.sidebarItems.forEach((item) => {
      if (item.children && !item.to && (item.isVisible != undefined ? item.isVisible : true)) {
        item.children.forEach((child: any) => {
          if (child.to == router.currentRoute.value.path && (child.isVisible != undefined ? child.isVisible : true)) {
            toggleDropdown(props.sidebarItems.indexOf(item));
          }
        });
      }
    });
  }
};
</script>
