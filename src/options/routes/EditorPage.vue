<template>
    <div v-if="currentScript" class="flex flex-col w-screen h-screen">
        <div class="mb-10 flex justify-between items-center p-4">
            <input class="text-5xl bg-transparent outline-none" type="text" :value="currentScript.name" @input="setName">

            <Button @click="handleDelete">Delete</Button>
        </div>

        <Editor class="flex-grow" :model-value="currentScript.contentScript" @update:model-value="setContentScript" />
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useScriptsStore } from '../../store/scripts';
import { computed } from 'vue';
import { z } from 'zod'
import Editor from '../components/Editor.vue';
import Button from '../../shared/ui/Button.vue';

const route = useRoute()
const router = useRouter()

const id = computed(() => z.coerce.string().parse(route.params.id))

const [scripts, { setScriptValue, deleteScript }] = useScriptsStore()

function setName(el: any) {
    setScriptValue(id.value, 'name', z.coerce.string().parse(el.target.value))
}

function setContentScript(v: string) {
    setScriptValue(id.value, 'contentScript', v)
}

const currentScript = computed(() => scripts.value[id.value])

function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this script?')) return
    deleteScript(id.value)
    router.replace('/')
}

</script>