import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import theme from '../utils/editorTheme.json'
import {FileExtensions} from "./fileExtensions";

self.MonacoEnvironment = {
	getWorker(workerId, label): Promise<Worker> | Worker {
		switch (label) {
			case FileExtensions.JSON:
				return new jsonWorker();
			case FileExtensions.CSS:
				return new cssWorker();
			case FileExtensions.HTML:
				return new htmlWorker();
			case FileExtensions.TYPESCRIPT:
			case FileExtensions.JAVASCRIPT:
				return new tsWorker();
			default:
				return new editorWorker();
		}
	}
}

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
// @ts-ignore
monaco.editor.defineTheme('main', theme)
