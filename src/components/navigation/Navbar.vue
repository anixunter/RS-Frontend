<template>
  <nav class="header-container">
    <div class="px-[15px] flex justify-between w-full">
      <div>
        <img src="/img/portaltech.png" alt="" class="w-32 my-auto" />
      </div>

      <div class="relative select-none" id="modal-div-nav-profile">
        <div
          class="w-[32px] rounded-full text-white h-[32px] flex justify-center bg-primary cursor-pointer"
          @click="isUserMenuOpen = !isUserMenuOpen"
        >
          <span v-if="user.avatar" class="h-fit my-auto text-[16px]">
            <img :src="user.avatar" alt="Profile photo" class="w-[32px] h-[32px] object-cover rounded-full" />
          </span>
        </div>
        <div
          v-if="isUserMenuOpen"
          class="absolute bg-white right-0 w-[200px] border shadow-sm"
          tabindex="0"
          ref="userProfileMenu"
        >
          <div>
            <div class="px-[15px] py-[5px] border-b">
              <div class="text-[12px] font-bold">Account</div>
              <div class="flex gap-[5px]">
                <div class="text-white w-[32px] h-[32px] rounded-full flex justify-center item-center text-[24px]">
                  <span v-if="user.avatar" class="h-fit my-auto text-[16px]">
                    <img :src="user.avatar" alt="Profile photo" class="w-[32px] h-[32px] object-cover rounded-full" />
                  </span>
                </div>
                <div>
                  <div>{{ user.full_name }}</div>
                  <div class="text-[12px] text-secondary-foreground">{{ user.email }}</div>
                </div>
              </div>
            </div>
            <div class="border-b px-[15px] py-[5px] hover:bg-secondary cursor-pointer" @click="action('profile')">
              Profile
            </div>
            <div class="px-[15px] py-[5px] hover:bg-secondary cursor-pointer text-red-500" @click="action('logout')">
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuth } from '@/stores/User/Auth';
import { useUser } from '@/stores/User/User';
import router from '@/router';

const isUserMenuOpen = ref(false);

const authStore = useAuth();
const { user } = useUser();

function handleDocumentClick(event: any) {
  const element = document.getElementById('modal-div-nav-profile');
  if (isUserMenuOpen.value && !(event.target == element || element?.contains(event.target))) {
    isUserMenuOpen.value = false;
  }
}
onMounted(async () => {
  document.addEventListener('click', handleDocumentClick);
});
onUnmounted(async () => {
  document.removeEventListener('click', handleDocumentClick);
});

const r = router;

const action = (type: String) => {
  switch (type) {
    case 'profile':
      r.push('/profile');
      break;
    case 'logout':
      authStore.logout();
      break;
  }

  isUserMenuOpen.value = false;
};
</script>
