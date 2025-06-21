<template>
  <section
    class="flex items-center p-16 text-gray-700 h-screen"
    style="background-image: url(/svg/large-triangles.svg)"
  >
    <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl">
          <span class="sr-only">Error</span>
          404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
        <p class="mt-4 mb-8">Click on go back to go to previous page</p>
        <a
          rel="noopener noreferrer"
          href="#"
          class="px-8 py-3 font-semibold rounded-sm bg-violet-600 text-gray-50"
          @click="onGoback()"
        >
          Go Back
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const onGoback = () => {
  router.go(-1);
};
</script>
