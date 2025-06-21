<template>
  <div style="height: 100vh; background-image: url(/svg/large-triangles.svg); background-size: cover">
    <div class="w-[400px] mx-auto">
      <div class="flex justify-center">
        <img src="/img/portaltech.png" class="w-36 my-5" />
      </div>
      <div class="border border-secondary-100 rounded-xs px-10 py-10 bg-white select-none">
        <div class="text-center" :class="getLoginError ? '' : 'mb-[10px]'">
          <p class="text-[30px] text-semibold">Sign In</p>
          <div class="text-sm font-normal">Fill your detail to sign in to Review Scrapper.</div>
        </div>

        <div class="mt-[12px] mb-[-19px]" v-if="getLoginError">
          <div class="text-sm text-red-700 font-semibold text-center flex gap-[15px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 -mr-3">
              <path
                fill-rule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                clip-rule="evenodd"
              />
            </svg>
            The username or password you entered is incorrect.
          </div>
        </div>

        <form @submit.prevent="onLogin" class="pt-10">
          <div class="">
            <label for="username">Username</label>
            <div class="my-1">
              <input
                v-model="getLoginDetail.username"
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                required
                class="p-[10px] max-h-[40px]! h-[40px]! text-[14px] w-full"
              />
            </div>
          </div>
          <div class="my-[15px]">
            <label for="username">Password</label>
            <div class="my-1 flex">
              <!--When show password is false-->
              <input
                v-model="getLoginDetail.password"
                id="password"
                name="password"
                type="password"
                v-if="!showPassword"
                autocomplete="current-password"
                required
                class="p-[10px] max-h-[40px]! h-[40px]! text-[14px] w-full"
              />
              <!--When show password is true-->
              <input
                v-model="getLoginDetail.password"
                id="password"
                name="password"
                type="text"
                v-else
                autocomplete="current-password"
                required
                class="p-[10px] max-h-[40px]! h-[40px]! text-[14px] w-full"
              />
              <span
                class="bg-gray-100 flex w-[50px] border-r border-t border-b border-gray-300 hover:bg-gray-200 cursor-pointer transition-all"
                @click="showPassword = !showPassword"
              >
                <div class="m-auto">
                  <Icons name="EyeOff" size="20" class="text-lg text-gray-900 mt-1 mr-[-1px]" v-if="!showPassword" />
                  <Icons name="Eye" class="text-lg text-gray-900 mt-1" size="20" v-else />
                </div>
              </span>
            </div>
          </div>
          <button type="submit" class="btn w-full max-h-[40px]! h-[40px]! text-lg!">Sign In</button>
        </form>
      </div>

      <div class="text-xs text-center my-5 select-none">
        <div>
          © 2025
          <a href="https://mavorion.com" class="text-[#224CAD] underline">Portal Tech</a>
          . All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuth } from '@/stores/User/Auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { Icons } from 'dolphin-components';

const authStore = useAuth();

const showPassword = ref(false);

const { getLoginDetail, getLoginError } = storeToRefs(authStore);

const onLogin = () => {
  authStore.login();
};

onMounted(() => {
  authStore.csrfGenerate();
});
</script>
