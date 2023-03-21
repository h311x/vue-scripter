<template>
    <div class="p-4">
        <h1 class="text-5xl mb-10">Scripts</h1>

        <Button class="mb-10" @click="createNewScript">Create new script</Button>

        <div class="flex flex-col gap-10">
            <RouterLink :to="`/editor/${id}`" v-for="script, id in scripts" :key="id"
                class="border border-slate-200 p-4 rounded">
                <h3 class="text-xl">{{ script.name }}</h3>
                <div v-if="script.description" class="text-sm mt-2">{{ script.description }}</div>
            </RouterLink>
        </div>

    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import Button from '../../shared/ui/Button.vue';
import { useScriptsStore } from '../../store/scripts';
import { FileSystemTree, WebContainer } from "@webcontainer/api"
import { onMounted } from "vue";

const files = {
    "index.js": {
        file: {
            contents: "console.log(123)",
        },
    },
} satisfies FileSystemTree

let webcontainerInstance: WebContainer | undefined

onMounted(async () => {

    if (!webcontainerInstance) {
        webcontainerInstance = await WebContainer.boot()
    }
    console.log(webcontainerInstance)
    await webcontainerInstance.mount(files)
    const t = await webcontainerInstance.fs.readFile("index.js", "utf-8")
    console.log(t)
})

const [scripts, { createNewScript }] = useScriptsStore()

watch(scripts, v => console.log(v))
</script>