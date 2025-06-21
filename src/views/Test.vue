<template>
  <ContentLayout :title="layout.title">
    <template #body>
      <div class="flex flex-col gap-[20px]">
        <p>Personnel Information System</p>
        <pre>{{ data }}</pre>
      </div>
    </template>
  </ContentLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const layout = ref({
  title: [
    {
      name: 'Dashboard',
    },
  ],
});

const data = ref('');
</script>
