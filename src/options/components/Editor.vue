<template>
	<div ref="monacoEl"></div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import { z } from 'zod';

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (event: 'update:modelValue', value: string): void }>()

const editorValue = useVModel(props, 'modelValue', emit)

const editor = shallowRef<monaco.editor.IStandaloneCodeEditor | null>(null)
const monacoEl = ref<HTMLDivElement | null>(null)

onMounted(() => {
	editor.value = monaco.editor.create(monacoEl.value!, {
		language: 'typescript',
		theme: 'main',
		automaticLayout: true,
	})

	editor.value.onDidChangeModelContent(() => {
		editorValue.value = z.coerce.string().parse(editor.value?.getValue())
	})
	setValue()
})

function setValue() {
	if (editorValue.value != editor.value?.getValue()) {
		editor.value?.setValue(editorValue.value)
	}
}

watch(editorValue, (v) => {
	setValue()
})

onUnmounted(() => {
	editor.value?.dispose()
	editor.value = null
})
</script>